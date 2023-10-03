import React, { useEffect, useState } from "react";
import {
  API_DELETE_BLOG_DATA,
  API_GET_BLOG_DATA,
  API_GET_CATEGORY_DATA,
  IMAGE_URL,
} from "../../api";
import axios from "axios";
import EditBlog from "./EditBlog";

const BlogsTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get(API_GET_BLOG_DATA);
        setBlogs(blogResponse.data);

        const categoryResponse = await axios.get(API_GET_CATEGORY_DATA);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id, blog) => {
    setSelectedBlogId(id);
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  const handleRemove = (id) => {
    const blogId = id;
    axios
      .delete(`${API_DELETE_BLOG_DATA}/${blogId}`)
      .then((response) => {
        console.log("Blog removed successfully");
        const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
        setBlogs(updatedBlogs);
      })
      .catch((error) => {
        console.error("Error removing blog:", error);
      });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleReadMore = (blogId) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog._id === blogId) {
        return { ...blog, expanded: !blog.expanded };
      }
      return blog;
    });

    setBlogs(updatedBlogs);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-8 bg-gray-100">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-4">
                Image
              </th>
              <th scope="col" className="px-6 py-4">
                Featured Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => {
              const category = categories.find(
                (category) => category._id === blog.category
              );
              const image = blog.images && blog.images.length > 0
                ? (blog.images[0].split("\\")[3] || blog.images[0].split("/")[3])
                : null;
              const imageUrl = image
                ? `${IMAGE_URL}blogs/${image}`
                : "fallback-image-url.png";
              const featuredImage = blog?.featured_image
                ? (blog.featured_image.split("\\")[3] || blog.featured_image.split("/")[3])
                : null;
              const featuredImageUrl = featuredImage
                ? `${IMAGE_URL}blogs/${featuredImage}`
                : "fallback-image-url.png";
                console.log("Image URL:", imageUrl); 
              return (
                <tr key={blog._id} className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {blog.title.length > 30 && !blog.expanded
                      ? truncateText(blog.title, 30)
                      : blog.title}
                    {blog.title.length > 30 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleReadMore(blog._id)}
                      >
                        {blog.expanded ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    {category ? category.name : ""}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    {blog.tags}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    {blog.name}
                  </td>
                  <td>
                    {blog.images && blog.images.length > 0 ? (
                      <img
                        src={imageUrl}
                        alt={`Image for ${blog.title}`}
                        className="w-16 h-16"
                      />
                    ) : (
                      <img
                        src="fallback-image-url.png"
                        alt="Fallback Image"
                        className="w-16 h-16"
                      />
                    )}
                  </td>
                  <td>
                    {blog?.featured_image ? (
                      <img
                        src={featuredImageUrl}
                        alt={`Featured Image for ${blog.title}`}
                        className="w-16 h-16"
                      />
                    ) : (
                      <img
                        src="fallback-image-url.png"
                        alt="Fallback Image"
                        className="w-16 h-16"
                      />
                    )}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEdit(blog._id, blog)}
                    >
                      <i className="fa fa-pencil-square" aria-hidden="true"></i>
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleRemove(blog._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {showEditModal && (
          <EditBlog blogId={selectedBlogId} blog={selectedBlog} />
        )}
      </div>
    </>
  );
};

export default BlogsTable;
