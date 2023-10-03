import React, { useState } from "react";
import axios from "axios";
import { API_UPDATE_CATEGORY_DATA } from "../../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditCategory = ({ categoryId, category }) => {
  const [showModal, setShowModal] = useState(false);

  const validationSchema = Yup.object().shape({
    // type: Yup.string()
    // .required('Type is required')
    // .test('capitalized', 'Type must start with a capital letter', (value) => {
    //   if (value) {
    //     return value[0] === value[0].toUpperCase();
    //   }
    //   return true; // Allow empty values
    // }),
  name: Yup.string()
    .required('Name is required')
    .test('capitalized', 'Name must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true; // Allow empty values
    }),
});

  const handleCategory = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("type", values.type);
      formData.append("name", values.name);
      if (values.type === "course") {
        formData.append("description", values.description);
        if (values.image) {
          formData.append("image", values.image);
        }if (values.video) {
          formData.append("video", values.video);
        }
      }

      await axios.put(`${API_UPDATE_CATEGORY_DATA}/${categoryId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // console.log(response);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[1500px] mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray outline-none focus:outline-none ">
            <Formik
              initialValues={{
                type: category.type,
                name: category.name,
                description: category.description || "",
                image: null,
              }}
              validationSchema={validationSchema}
              onSubmit={handleCategory}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-4 bg-gray-300 rounded-lg p-5 pt-10">
                  <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
                  {/* Type Select */}
                  <div className="mb-4">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Type
                    </label>
                    <Field
                      as="select"
                      id="type"
                      name="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="blog">Blog</option>
                      <option value="course">Course</option>
                      <option value="faq">FAQ</option>
                    </Field>
                    <ErrorMessage name="type" component="div" className="text-red-500" />
                  </div>

                  {/* Name Input */}
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Category Name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500" />
                  </div>

                  {/* Description Textarea */}
                  {values.type === "course" && (
                    <div className="mb-4">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Category Description
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>
                  )}

                  {/* Image Input */}
                  {values.type === "course" && (
                    <div className="mb-4">
                      <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Category Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                      />
                      <ErrorMessage name="image" component="div" className="text-red-500" />
                    </div>
                  )}

                  {/* Video Input */}
                  {values.type === "course" && (
                    <div className="mb-4">
                      <label htmlFor="video" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Category Video
                      </label>
                      <input
                        type="file"
                        id="video"
                        name="video"
                        onChange={(event) => setFieldValue("video", event.currentTarget.files[0])}
                      />
                      <ErrorMessage name="video" component="div" className="text-red-500" />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default EditCategory;
