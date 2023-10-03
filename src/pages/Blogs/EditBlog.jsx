import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API_GET_CATEGORY_DATA, API_UPDATE_BLOG_DATA } from "../../api";
import axios from "axios";
import JoditEditor, { Jodit } from "jodit-react";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .test("capitalized", "Title must start with a capital letter", (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  sub_title: Yup.string()
    .required("Sub Title is required")
    .test(
      "capitalized",
      "Sub Title must start with a capital letter",
      (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }
    ),

  // tags: Yup.array()
  //   .of(
  //     Yup.string()
  //       .required("Tag is required")
  //       .test(
  //         "capitalized",
  //         "Tag must start with a capital letter",
  //         (value) => {
  //           if (value) {
  //             return value[0] === value[0].toUpperCase();
  //           }
  //           return true;
  //         }
  //       )
  //   )
  //   .min(1, "At least one tag is required"),

  description: Yup.string()
    .required("Description is required")
    .test("wordLimit", "Description should not exceed 2000 words", (value) => {
      if (value) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= 1500;
      }
      return true;
    }),
  left_description: Yup.string()
    .required("Description is required")
    .test("wordLimit", "Description should not exceed 2000 words", (value) => {
      if (value) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= 800;
      }
      return true;
    }),

  name: Yup.string()
    .required("Name is required")
    .test("capitalized", "Name must start with a capital letter", (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  person_position: Yup.string()
    .required("Person Position is required")
    .test(
      "capitalized",
      "Person Position must start with a capital letter",
      (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }
    ),
  category: Yup.string().required("Category is required"),
});

const EditBlog = ({ blogId, blog }) => {
  console.log("----->", blog);
  console.log("----->", blogId);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [featuredImageFile, setFeaturedImageFile] = useState({});
  const [imagesFile, setImagesFile] = useState({});
  const editor = useRef(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_GET_CATEGORY_DATA);
        setCategories(
          response.data.filter((category) => category.type === "blog")
        );
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  // const handleFeaturedImageChange = (e) => {
  //   setFeaturedImageFile(e.target.files[0]);
  // };

  // const handleImagesChange = (e) => {
  //   setImagesFile(e.target.files[0]);
  // };

  function preparePaste(jodit) {
    jodit.e.on(
      "paste",
      (e) => {
        jodit.e.stopPropagation("paste");

        // Get the pasted content as plain text
        const pastedText = (e.clipboardData || window.clipboardData).getData(
          "text/plain"
        );

        // Insert the plain text without HTML tags
        jodit.s.insertHTML(pastedText.replace(/(<([^>]+)>)/gi, ""));

        return false;
      },
      { top: true }
    );
  }

  Jodit.plugins.add("preparePaste", preparePaste);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("sub_title", values.sub_title);
    formData.append("featured_image", featuredImageFile); // Assuming you have the image file in featuredImageFile state
    formData.append("description", values.description);
    formData.append("left_description", values.left_description);
    formData.append("images", imagesFile); // Assuming you have the images file(s) in imagesFile state
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("name", values.name);
    formData.append("person_position", values.person_position);

    try {
      const response = await axios.put(
        `${API_UPDATE_BLOG_DATA}/${blogId}`,
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
    title: blog.title,
    sub_title: blog.sub_title,
    tags: blog.tags.join(","),
    description: blog.description,
    left_description: blog.left_description,
    name: blog.name,
    person_position: blog.person_position,
    category: blog.category,
  };

  return (
    // <div>
    //   <button
    //     className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    //     type="button"
    //     onClick={() => setShowModal(true)}
    //   >
    //     Open Form
    //   </button>

    //   {showModal && (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-[1500px] mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray outline-none focus:outline-none m-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4 bg-gray-300 rounded-lg pt-[950px] p-5 pt-10">
              <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
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
                    htmlFor="sub_title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Sub Title
                  </label>
                  <Field
                    type="text"
                    id="sub_title"
                    name="sub_title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="sub_title"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tags"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Tags
                  </label>
                  <Field
                    type="text"
                    id="tags"
                    name="tags"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="tags"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="person_position"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Person Position
                  </label>
                  <Field
                    type="text"
                    id="person_position"
                    name="person_position"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="person_position"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="w-full px-3 mb-6 mt-5 md:mb-0">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Category
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="w-full px-3 mb-6 mt-5 md:mb-0">
                  <label
                    htmlFor="featured_image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Featured Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFeaturedImageFile(e.target.files[0])}
                  />
                  {/* {blog.featured_image && <img src={blog.featured_image} alt="Featured" />} */}
                  <ErrorMessage
                    name="featured_image"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="w-full px-3 mb-6 mt-5 md:mb-0">
                  <label
                    htmlFor="images"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Images
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImagesFile(e.target.files[0])}
                  />
                  {/* {blog.images && <img src={blog.images} alt="Images" />} */}
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block  mb-1">
                  Description
                </label>
                <Field name="description">
                  {({ field }) => (
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      onChange={(value) => {
                        // Set the value of the field whenever the JoditEditor content changes
                        field.onChange({
                          target: { name: "description", value },
                        });
                      }}
                      plugins={["preparePaste"]} // Add the custom plugin here
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>


              <div>
                <label htmlFor="left_description" className="block  mb-1">
                 Left Description
                </label>
                <Field name="left_description">
                  {({ field }) => (
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      onChange={(value) => {
                        // Set the value of the field whenever the JoditEditor content changes
                        field.onChange({
                          target: { name: "left_description", value },
                        });
                      }}
                      plugins={["preparePaste"]} // Add the custom plugin here
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="left_description"
                  component="div"
                  className="text-red-500"
                />
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
    //   )}
    //   {showModal && (
    //     <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    //   )}
    // </div>
  );
};

export default EditBlog;
