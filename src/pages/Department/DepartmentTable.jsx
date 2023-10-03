import React, { useEffect, useState } from "react";
import axios from "axios";
import EditDepartment from "./EditDepartment";
import { API_DELETE_DEPARTMENT_DATA, API_GET_DEPARTMENT_DATA } from "../../api";

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_GET_DEPARTMENT_DATA);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id, department) => {
    setSelectedDepartmentId(id);
    setSelectedDepartment(department);
    setShowEditModal(true);
  };

  const handleRemove = async (id) => {
    const departmentId = id;

    try {
      await axios.delete(`${API_DELETE_DEPARTMENT_DATA}/${departmentId}`);
      console.log("Department removed successfully");
      const updatedDepartments = departments.filter(
        (department) => department._id !== departmentId
      );
      setDepartments(updatedDepartments);
    } catch (error) {
      console.error("Error removing department:", error);
    }
  };

  const filteredDepartments = filterType
    ? departments.filter((department) => department.type === filterType)
    : departments;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 bg-gray-100">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>
                
            </th>
            <th scope="col" className="px-6 py-3">
              Type of Department
            </th>
            <th scope="col" className="px-6 py-3">
              Name of Department
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((department) => (
            <tr
              key={department._id}
              className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300"
            >
              <td className="w-4 p-4"></td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                {department.type}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                {department.name}
              </td>
              <td className="flex items-center px-6 py-4 space-x-3">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleEdit(department._id, department)}
                >
                  <i className="fa fa-pencil-square" aria-hidden="true"></i>
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  onClick={() => handleRemove(department._id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <EditDepartment
          departmentId={selectedDepartmentId}
          department={selectedDepartment}
        />
      )}
    </div>
  );
};

export default DepartmentTable;
