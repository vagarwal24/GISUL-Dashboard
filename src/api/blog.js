import axios from "axios"; 
import { API_GET_BLOG_DATA, API_INSERT_BLOG_DATA, API_UPDATE_BLOG_DATA } from ".";


export const getAllBlogs = async () => {
  try {
    const response = await axios.get(API_GET_BLOG_DATA);
    return response.data.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
export const insertBlog = async (params) => {
    try {
      const response = await axios.post(API_INSERT_BLOG_DATA, params,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
};

  export const updateBlog = async (blogId, params) => {
    try {
      const response = await axios.put(`${API_UPDATE_BLOG_DATA}/${blogId}`, params);
      return response.data.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };