import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_INSERT_DEPARTMENT_DATA } from "../../api";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Type is required")
    .test("capitalized", "Type must start with a capital letter", (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true; // Allow empty values
    }),
  name: Yup.string()
    .required("Name is required")
    .test("capitalized", "Name must start with a capital letter", (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true; // Allow empty values
    }),
});

const Department = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(API_INSERT_DEPARTMENT_DATA, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log(response.data);
  
      // Reset the form and show an alert when the form is submitted successfully
      resetForm();
      alert("Department created successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  
    setSubmitting(false);
  };
  

  return (
    <div className="w-full pl-2 pr-4">
      <h1 className="text-2xl font-bold mb-4">Create Department</h1>
      <Formik
        initialValues={{ type: "Job", name: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="type" className="block font-medium">
              Type
            </label>
            <Field
              type="text"
              id="type"
              name="type"
              className="mt-1 p-2 border rounded w-36"
            />
            <ErrorMessage
              name="type"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 border rounded w-60"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Department
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Department;
