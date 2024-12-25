import { ApiRoutes } from "../routes";
import axios from "axios";

export const CreateBlog = async (title: string, content: string) => {
  try {
    const response = await axios.post(ApiRoutes.BLOGS, { title, content });
    return response.data;
  } catch (error: any) {
    console.error("Error creating blog:", error);
    throw error; // Re-throw error for better error handling in the calling function
  }
};
