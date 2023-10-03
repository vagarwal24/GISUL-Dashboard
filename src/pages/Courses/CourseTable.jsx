import React, { useEffect, useState } from "react";
import {
  API_DELETE_COURSE_DATA,
  API_GET_CATEGORY_DATA,
  API_GET_COURSE_DATA,
} from "../../api";
import axios from "axios";
import EditCourse from "./EditCourse";

const CourseTable = () => {
  const [courses, setCourses] = useState("");
  const [categories, setCategories] = useState([]); // Add categories state
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(API_GET_COURSE_DATA);
        setCourses(courseResponse.data);

        // Fetch category data
        const categoryResponse = await axios.get(API_GET_CATEGORY_DATA);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the fetchData function to make the API calls
  }, []);

  // const onClose=()=>{

  // }

  const handleEdit = (id, course) => {
    setSelectedCourseId(id);
    setSelectedCourse(course);
    setShowEditModal(true);
    console.log("hello", id);
  };

  const handleRemove = (id) => {
    const courseId = id; // Fix: Assign the 'id' parameter to 'courseId' variable
    axios
      .delete(`${API_DELETE_COURSE_DATA}/${courseId}`)
      .then((response) => {
        console.log("Course removed successfully");
        const updatedCourses = courses.filter(
          (course) => course._id !== courseId
        );
        setCourses(updatedCourses);
      })
      .catch((error) => {
        console.error("Error removing course:", error);
      });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleReadMore = (courseId) => {
    const updatedCourses = courses.map((course) => {
      if (course._id === courseId) {
        return { ...course, expanded: !course.expanded };
      }
      return course;
    });

    setCourses(updatedCourses);
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
                  <label for="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th> */}
              <th scope="col" className="px-6 py-3">
                Course Name
              </th>
              {/* <th scope="col" className="px-6 py-3">
                    
                </th> */}
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Duration
              </th> */}
              {/* <th scope="col" className="px-6 py-3">
                    
                </th> */}
              <th scope="col" className="px-6 py-3">
                Professional
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              {/* <th scope="col" className="px-6 py-4">
                Image
              </th> */}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course) => {
                // Find the category object with the corresponding ID
                const category = categories.find(
                  (cat) => cat._id === course.category
                );
                
                return (
                  <tr
                    key={course._id}
                    className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300"
                  >
                    {/* <td classNameclassName="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${course.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${course.id}`}
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
                      {course.course_name}
                    </th>
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {course.details.length > 30 && !course.expanded
                      ? truncateText(course.details, 30)
                      : course.details}
                    {course.details.length > 30 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleReadMore(course._id)}
                      >
                        {course.expanded ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </th>
                    {/* <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {course.duration}
                    </th> */}
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {course.professional}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {/* Display the category name */}
                      {category ? category.name : ""}
                    </th>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEdit(course._id, course)}
                      >
                        <i class="fa fa-pencil-square" aria-hidden="true"></i>
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => handleRemove(course._id)}
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
          <EditCourse courseId={selectedCourseId} course={selectedCourse} />
        )}
      </div>
    </>
  );
};

export default CourseTable;
