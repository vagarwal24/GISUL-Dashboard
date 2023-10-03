import React, { useEffect, useState } from "react";
import {
  API_DELETE_WEBINAR_DATA,
  API_GET_WEBINAR_DATA,
  IMAGE_URL
} from "../../api";
import axios from "axios";
import EditWebinar from "./EditWebinar";
// import EditBlog from "./EditBlog";

const WebinarTable = () => {
  const [webinars, setWebinars] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWebinarId, setSelectedWebinarId] = useState(null);
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  const id = localStorage.getItem("id");
  console.log(id);
//   const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog data
        const webinarResponse = await axios.get(API_GET_WEBINAR_DATA);
        setWebinars(webinarResponse.data);

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

  const handleEdit = (id, webinar) => {
    setSelectedWebinarId(id);
    setSelectedWebinar(webinar);
    setShowEditModal(true);
    console.log("hello", id);
  };

  const handleRemove = (id) => {
    const webinarId = id;
    axios
      .delete(`${API_DELETE_WEBINAR_DATA}/${webinarId}`)
      .then((response) => {
        console.log("Blog removed successfully");
        const updatedWebinars = webinars.filter(
          (webinar) => webinar._id !== webinarId
        );
        setWebinars(updatedWebinars);
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

  const handleReadMore = (webinarId) => {
    const updatedWebinars = webinars.map((webinar) => {
      if (webinar._id === webinarId) {
        return { ...webinar, expanded: !webinar.expanded };
      }
      return webinar;
    });

    setWebinars(updatedWebinars);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-8 bg-gray-100">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Time
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
            {webinars &&
              webinars.map((webinar) => {
                // Find the category object with the corresponding ID
                // const category = categories.find((category) => category._id === blog.category);
                // console.log(testimonial?.images?.split("\\")[3]);
              const image = webinar?.image?.split("\\")[3] || webinar?.image?.split("/")[3];
              const imageUrl = `${IMAGE_URL}webinar/${image}`;
              const formattedDate = new Date(webinar.date).toLocaleDateString();
                return (
                  <tr
                    key={webinar._id}
                    className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300"
                  >
                    
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {webinar.description.length > 30 && !webinar.expanded
                      ? truncateText(webinar.description, 30)
                      : webinar.description}
                    {webinar.description.length > 30 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleReadMore(webinar._id)}
                      >
                        {webinar.expanded ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {webinar.title}
                    </th>
                    <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                >
                  {formattedDate}
                </th>
                    
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {webinar.time}
                    </th>
                   
                    <td className="px-6 py-4">
                      <img
                        // src={testimonial.images}
                        src={imageUrl}
                        alt="Webinar Image"
                        className="w-16 h-16 dark:text-black"
                      />
                    </td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEdit(webinar._id, webinar)}
                      >
                        <i class="fa fa-pencil-square" aria-hidden="true"></i>
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => handleRemove(webinar._id)}
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
          <EditWebinar
            webinarId={selectedWebinarId}
            webinar={selectedWebinar}
          />
        )}
      </div>
    </>
  );
};

export default WebinarTable;
