import { ApiRoutes } from "../routes";
import axios from "axios";

export const CreateBlog = async (formData: FormData) => {
  try {
    const response = await axios.post(ApiRoutes.BLOGS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating blog:", error);
    throw error; // Re-throw error for better error handling in the calling function
  }
};
