import api from "./axios";

export const loginApi = async (data) => {
  return api.post("/login/", data);
};