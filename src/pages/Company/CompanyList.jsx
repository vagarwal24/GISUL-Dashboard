import React, { useEffect, useState } from "react";
import {
  API_DELETE_LOGO_DATA,
  API_GET_LOGO_DATA,
  IMAGE_URL
} from "../../api";
import axios from "axios";

const CompanyList = () => {
  const [logos, setLogos] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const logoResponse = await axios.get(API_GET_LOGO_DATA);
        setLogos(logoResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`${API_DELETE_LOGO_DATA}/${id}`)
      .then((response) => {
        console.log("Logo removed successfully");
        const updatedLogos = logos.filter(
          (logo) => logo._id !== id
        );
        setLogos(updatedLogos);
      })
      .catch((error) => {
        console.error("Error removing logo:", error);
      });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-8 bg-gray-100">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {logos.map((logo) => {
              const image = logo?.image?.split("\\")[3] || logo?.image?.split("/")[3];
              const imageUrl = `${IMAGE_URL}logo/${image}`;
              return (
                <tr
                  key={logo._id}
                  className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300"
                >
                  <td className="px-6 py-4">
                    <img
                      src={imageUrl}
                      alt="Logo Image"
                      className="w-16 h-16 dark:text-black"
                    />
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleRemove(logo._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompanyList;
