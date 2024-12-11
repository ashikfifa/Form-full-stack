import { ApiRoutes } from "../routes";
import axios from "axios";

export const CreateBlog = async (title: string, content: string) => {
  try {
    const data = await axios.post(ApiRoutes.BLOGS, {
      title,
      content,
    });
    return data;
  } catch (error: any) {
    console.log(error);
  }
};
