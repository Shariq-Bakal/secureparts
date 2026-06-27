import api from "./api";

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    // If successful, return the data
    return response.data;
  } catch (error) {
    // If it fails, extract the error message from your backend
    const message = error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(message);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed.";
    throw new Error(message);
  }
};
export const logoutUser = async()=>{
  try{

  }
  catch(error){
    const message = error.response?.data?.message || "Logout failed.";
    throw new Error(message);

  }
}