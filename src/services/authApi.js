import api from "../services/axois.js";

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const signupUser = async (data) =>{
  const response = await api.post("/auth/signup", data);
  return response.data;
}

export const loginUser = async (data)=>{
  const response = await api.post("/auth/login",data);
  return response.data;
}

export const onboardUser = async (data)=>{
  const response = await api.post("/auth/onboard",data);
  return response.data;
}