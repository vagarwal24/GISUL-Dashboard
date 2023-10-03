import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_UPDATE_DEPARTMENT_DATA } from '../../api'; // Assuming you have an update API endpoint

const validationSchema = Yup.object({
  type: Yup.string().required('Type is required'),
  name: Yup.string().required('Name is required'),
  // Add more validation for other fields if needed
});

const EditDepartment = ({ departmentId, department }) => {
    const initialValues = {
        type: department.type,
        name: department.name
      };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `${API_UPDATE_DEPARTMENT_DATA}/${departmentId}`, // Assuming the API endpoint for updating
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  
    setSubmitting(false);
  };
  

  return (
    <div className="justify-center items-center flex fixed inset-0 z-50">
      <div className="relative w-full mx-auto max-w-md p-5 bg-gray-300 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Edit Department</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="type" className="block font-medium">
                  Type
                </label>
                <Field
                  type="text"
                  id="type"
                  name="type"
                  className="mt-1 p-2 border rounded w-full"
                />
                <ErrorMessage name="type" component="div" className="text-red-500" />
              </div>

              <div>
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 border rounded w-full"
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>

              {/* Add more fields here */}
              
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditDepartment;
