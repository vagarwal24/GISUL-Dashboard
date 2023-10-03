import React, { useEffect, useState } from "react";
import {
  API_DELETE_CATEGORY_DATA,
  API_GET_CATEGORY_DATA,
  IMAGE_URL,
} from "../../api";
import axios from "axios";
import EditCategory from "./EditCategory";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_GET_CATEGORY_DATA);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id, category) => {
    setSelectedCategoryId(id);
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleRemove = (id) => {
    const categoryId = id;

    axios
      .delete(`${API_DELETE_CATEGORY_DATA}/${categoryId}`)
      .then((response) => {
        console.log("Category removed successfully");
        const updatedCategories = categories.filter(
          (category) => category._id !== categoryId
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error removing category:", error);
      });
  };

  const filteredCategories = filterType
    ? categories.filter((category) => category.type === filterType)
    : categories;

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 bg-gray-100">
        <div className="mb-4">
          <label htmlFor="filterType" className="block mb-1 font-bold">
            Filter by Category Type
          </label>
          <select
            id="filterType"
            name="filterType"
            className="w-40 p-2 border border-gray-300 rounded"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value="blog">Blog</option>
            <option value="course">Course</option>
            <option value="faq">FAQ</option>
          </select>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                {/* Checkbox column */}
              </th>
              <th scope="col" className="px-6 py-3">
                Type of Category
              </th>
              <th scope="col" className="px-6 py-3">
                Name of Category
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => {
              console.log("Category Image:", category.image);

              const image =
                category?.image?.split("\\")[3] ||
                category?.image?.split("/")[3];
              const imageUrl = `${IMAGE_URL}category/${image}`;

              console.log("Image URL:", image); // Debugging line
              // console.log("Category Image:", category.image);
              return (
                <tr
                  key={category._id}
                  className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300"
                >
                  <td className="w-4 p-4">{/* Checkbox input */}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    {category.type}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                    {category.name}
                  </td>
                  <td className="px-6 py-4">
                    {category.type === "course" && category.image && (
                      <img
                        src={imageUrl}
                        alt={`Image for ${category.type}`}
                        className="w-16 h-16 dark:text-black"
                      />
                    )}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEdit(category._id, category)}
                    >
                      <i className="fa fa-pencil-square" aria-hidden="true"></i>
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleRemove(category._id)}
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
          <EditCategory
            categoryId={selectedCategoryId}
            category={selectedCategory}
          />
        )}
      </div>
    </>
  );
};

export default CategoryTable;
