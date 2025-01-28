import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    // for (const chat of chats) {
    //   console.log("chat");
    //   console.log(chat.userIDs);
    //   const receiverId = chat.userIDs.find((id) => id !== tokenUserId);
    //   console.log(receiverId);
    //   const receiver = await prisma.user.findUnique({
    //     where: {
    //       id: receiverId,
    //     },
    //     select: {
    //       id: true,
    //       username: true,
    //       avatar: true,
    //     },
    //   });
    //   console.log(receiver);
    //   //   chat.receiver = receiver;
    // }
    const chatsWithReceivers = await Promise.all(
      chats.map(async (chat) => {
        // Identify the receiver (exclude the tokenUserId from userIDs)
        const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

        // Fetch receiver details
        const receiver = receiverId
          ? await prisma.user.findUnique({
              where: { id: receiverId },
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            })
          : null;

        return {
          ...chat,
          receiver, // Attach the receiver details to the chat
        };
      })
    );
    console.log(chatsWithReceivers);
    res.status(200).json(chatsWithReceivers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
