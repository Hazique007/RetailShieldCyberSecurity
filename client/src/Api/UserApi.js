import axios from "axios";

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`https://retailshieldcybersecurity-1.onrender.com/api/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};