import React, { useEffect, useState } from "react";
import { API_GET_ENQUIRY_DATA } from "../../api";
import axios from 'axios';
import * as XLSX from "xlsx";

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState(""); 
  // const [showEditModal, setShowEditModal]=useState(false)
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(API_GET_ENQUIRY_DATA);
      setEnquiries(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData(); // Invoke the fetchData function to make the API call
}, []);

// const handleEdit = (id, faq) => {
//   setSelectedFaqId(id);
//   setSelectedFaq(faq);
//   setShowEditModal(true)
//   console.log("hello",id)
// };

// const handleRemove = (id) => {
//   const enquiryId = id;
//   axios
//     .delete(`${API_DELETE_CONTACT_DATA}/${enquiryId}`)
//     .then((response) => {
//       console.log("Blog removed successfully");
//       const updatedEnquiries = enquiries.filter((enquiry) => enquiry._id !== enquiryId);
//     setContacts(updatedEnquiries);
//     })
//     .catch((error) => {
//       console.error("Error removing blog:", error);
//     });
// };


const handleExport = () => {
  const worksheet = XLSX.utils.json_to_sheet(enquiries);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
  XLSX.writeFile(workbook, "enquiries.xlsx");
};

  return (
  <>
  
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg pt-12 bg-gray-100">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-100">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" class="sr-only">
                    checkbox
                  </label>
                </div>
              </th> */}
              
              <th scope="col" class="px-6 py-3">
                First Name
              </th>
              <th scope="col" class="px-6 py-3">
                Last Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              {/* <th scope="col" class="px-6 py-3">
                    
                </th> */}
              <th scope="col" class="px-6 py-3">
                Mobile No.
              </th>
              <th scope="col" class="px-6 py-3">
              Organization
              </th>
              
              {/* <th scope="col" class="px-6 py-3">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {enquiries &&
              enquiries.map((enquiry) => (
                <tr
                  key={enquiry._id}
                  className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300"
                >
                  {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${contact.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`checkbox-table-search-${contact.id}`}
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
                    {enquiry.first_name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {enquiry.last_name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {enquiry.email_id}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {enquiry.contact_num}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {enquiry.organization}
                  </th>
                  {/* <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td> */}

                  
                  {/* <td className="flex items-center px-6 py-4 space-x-3">
                    {/* <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEdit(faq._id,faq)}
                    >
                      Edit
                    </a> */}
                    {/* <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleRemove(contact._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </a> */}
                  {/* </td>  */}
                </tr>
              ))}
          </tbody>
        </table>

        {/* {showEditModal && <EditFaq faqId={selectedFaqId} faq={selectedFaq} />} */}
        
        <button
        
        className="absolute top-0 mt-2 mb-2 right-0 bg-blue-500 bg-gray-700 text-white  rounded focus:outline-none focus:shadow-outline mr-1 mb-2"
        onClick={handleExport}
        style={{ width: "70px", height: "35px" }}
      
      >
        Export
      </button>
      </div>

      


  </>
  )
};
export default Enquiry;
