import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API_UPDATE_TESTIMONIAL_DATA, API_GET_CATEGORY_DATA } from "../../api";
import axios from "axios";

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


const EditTestimonial = ({ testimonialId, testimonial }) => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imagesFile, setImagesFile] = useState({});

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(API_GET_CATEGORY_DATA);
  //       setCategories(
  //         response.data.filter((category) => category.type === "testimonial")
  //       );
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("author", values.author);
    formData.append("images", imagesFile); // Assuming you have the images file(s) in imagesFile state

    try {
      const response = await axios.put(
        `${API_UPDATE_TESTIMONIAL_DATA}/${testimonialId}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );

      console.log(response);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const initialValues = {
    title: testimonial.title,
    content: testimonial.content,
    author: testimonial.author,
  };

  return (
    
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[1500px] mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray outline-none focus:outline-none m-2">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-4 bg-gray-300 rounded-lg p-5 pt-10">
                <h1 className="text-2xl font-bold mb-4">Edit Testimonial</h1>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                      >
                        Title
                      </label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="content"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                      >
                        Content
                      </label>
                      <Field
                        as="textarea"
                        id="content"
                        name="content"
                        rows="4"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="content"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="author"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                      >
                        Author
                      </label>
                      <Field
                        type="text"
                        id="author"
                        name="author"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="author"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div className="w-full px-3 mb-6 mt-5 md:mb-0">
                      <label
                        htmlFor="images"
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      >
                        Images
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setImagesFile(e.target.files[0])}
                      />
                      
                      <ErrorMessage
                        name="images"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
     
  );
};

export default EditTestimonial;
