// import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";
import { redirect } from "react-router-dom";

export const propertyDetailsLoader = async ({ params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
// export const propertiesListLoader = async ({ request }) => {
//   const query = request.url.split("?")[1];
//   const postPromise = apiRequest("/posts?" + query);
//   return defer({
//     postResponse: postPromise,
//   });
// };

export const propertiesListLoader = async () => {
  try {
    // const query = request.url.split("?")[1];
    const postResponse = await apiRequest("/posts");
    return {
      postResponse,
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to load properties");
  }
};

export const profilePageLoader = async () => {
  try {
    const postResponse = await apiRequest.get("/users/profilePosts");
    const chatResponse = await apiRequest.get("/chats");
    const getUsersResponse = await apiRequest.get("/users");

    return {
      postResponse,
      chatResponse,
      getUsersResponse,
    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return redirect("/login");
    }
    throw error;
  }
};
