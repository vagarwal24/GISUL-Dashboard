import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_INSERT_TESTIMONIAL_DATA } from "../../api";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .test('capitalized', 'Title must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  content: Yup.string()
    .required("Content is required"),

  author: Yup.string()
    .required("Author name is required")
    .test('capitalized', 'Author name must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),
});


const Testimonial = () => {
  const [image, setImage] = useState(null); // Use null instead of {} for initial state
  const initialValues = {
    title: "",
    images: null, // Initialize images as null
    content: "",
    author: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("images", image);
      formData.append("content", values.content);
      formData.append("author", values.author);
  
      const response = await axios.post(API_INSERT_TESTIMONIAL_DATA, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Server Response:", response.data);
  
      // Show an alert message when the form is submitted successfully
      window.alert("Form submitted successfully!");
  
      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  return (
    <div className="w-full bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create Testimonial</h1>
      <Formik
        initialValues={{ ...initialValues, images: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 font-bold mb-2"
              >
                Images
              </label>
              <input
                type="file"
                name="images"
                onChange={(e) => setImage(e.target.files[0])} // Set the selected image file to the 'image' state
              />
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-gray-700 font-bold mb-2"
              >
                Content
              </label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={4}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-gray-700 font-bold mb-2"
              >
                Author Name
              </label>
              <Field
                type="text"
                id="author"
                name="author"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Testimonial;
