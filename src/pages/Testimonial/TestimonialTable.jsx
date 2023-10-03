import React, { useEffect, useState } from "react";
import {
  API_DELETE_TESTIMONIAL_DATA,
  API_GET_TESTIMONIAL_DATA,
  IMAGE_URL,
} from "../../api";
import axios from "axios";
import EditTestimonial from "./EditTestimonial";
// import EditBlog from "./EditBlog";

const Testimonialtable = () => {
  const [testimonials, setTestimonials] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const id = localStorage.getItem("id");
  console.log(id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog data
        const testimonialResponse = await axios.get(API_GET_TESTIMONIAL_DATA);
        setTestimonials(testimonialResponse.data);

        // Fetch category data
        // const categoryResponse = await axios.get(API_GET_CATEGORY_DATA);
        // setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the fetchData function to make the API call
  }, []);

  // const onClose=()=>{

  // }

  const handleEdit = (id, testimonial) => {
    setSelectedTestimonialId(id);
    setSelectedTestimonial(testimonial);
    setShowEditModal(true);
    console.log("hello", id);
  };

  const handleRemove = (id) => {
    const testimonialId = id;
    axios
      .delete(`${API_DELETE_TESTIMONIAL_DATA}/${testimonialId}`)
      .then((response) => {
        console.log("Blog removed successfully");
        const updatedTestimonials = testimonials.filter(
          (testimonial) => testimonial._id !== testimonialId
        );
        setTestimonials(updatedTestimonials);
      })
      .catch((error) => {
        console.error("Error removing testimonial:", error);
      });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleReadMore = (testimonialId) => {
    const updatedTestimonials = testimonials.map((testimonial) => {
      if (testimonial._id === testimonialId) {
        return { ...testimonial, expanded: !testimonial.expanded };
      }
      return testimonial;
    });

    setTestimonials(updatedTestimonials);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-8 bg-gray-100">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th> */}
              <th scope="col" class="px-6 py-3">
                Content
              </th>
              {/* <th scope="col" class="px-6 py-3">
                    
                </th> */}
              {/* <th scope="col" class="px-6 py-3">
                Category
              </th> */}
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              {/* <th scope="col" class="px-6 py-3">
                    
                </th> */}
              <th scope="col" class="px-6 py-3">
                Author
              </th>
              <th scope="col" class="px-6 py-4">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Display blog data with category names */}
            {testimonials &&
              testimonials.map((testimonial) => {
                // Find the category object with the corresponding ID
                // const category = categories.find((category) => category._id === blog.category);
                // console.log(testimonial?.images?.split("\\")[3]);
              const image = testimonial?.images?.split("\\")[3] || testimonial?.images?.split("/")[3];
              const imageUrl = `${IMAGE_URL}testimonial/${image}`;
                return (
                  <tr
                    key={testimonial._id}
                    className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300"
                  >
                    {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${blog.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`checkbox-table-search-${blog.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td> */}
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {testimonial.content.length > 30 && !testimonial.expanded
                      ? truncateText(testimonial.content, 30)
                      : testimonial.content}
                    {testimonial.content.length > 30 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleReadMore(testimonial._id)}
                      >
                        {testimonial.expanded ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </th>
                    {/* <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {/* Display the category name */}
                    {/* {category ? category.name : ""} */}
                    {/* </th> */}
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {testimonial.title}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {testimonial.author}
                    </th>
                    {/* <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td> */}

                    <td className="px-6 py-4">
                      <img
                        // src={testimonial.images}
                        src={imageUrl}
                        alt="Testimonial Image"
                        className="w-16 h-16 dark:text-black"
                      />
                    </td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEdit(testimonial._id, testimonial)}
                      >
                        <i class="fa fa-pencil-square" aria-hidden="true"></i>
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => handleRemove(testimonial._id)}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {showEditModal && (
          <EditTestimonial
            testimonialId={selectedTestimonialId}
            testimonial={selectedTestimonial}
          />
        )}
      </div>
    </>
  );
};

export default Testimonialtable;
