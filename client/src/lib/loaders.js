// import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

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

export const propertiesListLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  const postResponse = await apiRequest("/posts?" + query);
  return {
    postResponse,
  };
};

// export const profilePageLoader = async () => {
//   const postPromise = apiRequest("/users/profilePosts");
//   const chatPromise = apiRequest("/chats");
//   return defer({
//     postResponse: postPromise,
//     chatResponse: chatPromise,
//   });
// };

export const profilePageLoader = async () => {
  const postResponse = await apiRequest("/users/profilePosts");
  const chatResponse = await apiRequest("/chats");
  const getUsersResponse = await apiRequest("/users");
  return {
    postResponse,
    chatResponse,
    getUsersResponse,
  };
};
