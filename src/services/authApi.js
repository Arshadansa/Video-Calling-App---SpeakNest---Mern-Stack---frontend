import api from "../services/axois.js";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    return null;
    console.log(error);
  }
};

export const signupUser = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const onboardUser = async (data) => {
  const response = await api.post("/auth/onboard", data);
  return response.data;
};

export const getUserFriends = async (data) => {
  const response = await api.get("user/friends");
  return response?.data;
};

export const getRecommededUsers = async (data) => {
  const response = await api.get("user/");
  return response?.data;
};

export const outGoingFriendReqs = async () => {
  const response = await api.get("user/outgoing-friend-requests");
  return response?.data;
};

export const sendFriendRequest = async (userId) => {
  const response = await api.post(`/user/friends-request/${userId}`);
  return response?.data;
};

export const getFriendRequest = async () => {
  const response = await api.get("/user/friends-requests");
  return response?.data;
};

export const acceptFriendRequest = async (id) => {
  
  const response = await api.put(`/user/friends-request/${id}/accept`);
  return response?.data;
};

export const getStreamToken = async ()=>{
  const response = await api.get("/chat/token");
  return response?.data;
}