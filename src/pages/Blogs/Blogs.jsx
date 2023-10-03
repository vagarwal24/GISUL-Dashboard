import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { insertBlog } from "../../api/blog";
import { API_GET_CATEGORY_DATA } from "../../api";
import axios from "axios";
import JoditEditor, { Jodit } from "jodit-react";

const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .test('capitalized', 'Title must start with a capital letter', (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }),
  
    sub_title: Yup.string()
      .required("Sub Title is required")
      .test('capitalized', 'Sub Title must start with a capital letter', (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }),
  
    tags: Yup.array()
      .of(Yup.string()
        .required("Tag is required")
        .test('capitalized', 'Tag must start with a capital letter', (value) => {
          if (value) {
            return value[0] === value[0].toUpperCase();
          }
          return true;
        }))
      .min(1, "At least one tag is required"),
  
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
      .test('capitalized', 'Name must start with a capital letter', (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }),
  
    person_position: Yup.string()
      .required("Person Position is required")
      .test('capitalized', 'Person Position must start with a capital letter', (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }),
  category: Yup.string().required("Category is required"),
});


const Blogs = () => {
  const [image, setImage] = useState({});
  const [featuredImage, setFeaturedImage] = useState({});
  const editor = useRef(null);
  // console.log(featuredImage)
  // console.log(image.name)
  const initialValues = {
    title: "",
    sub_title: "",
    tags: [""],
    description: "",
    left_description: "",
    name: "",
    person_position: "",
    category: "",
  };
  console.log('---->', initialValues)
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_GET_CATEGORY_DATA); // Replace with your API endpoint for fetching categories
        setCategories(
          response.data.filter((category) => category.type === "blog")
        ); // Filter categories for blogs only
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  function preparePaste(jodit) {
    jodit.e.on('paste', (e) => {
      jodit.e.stopPropagation('paste');
  
      // Get the pasted content as plain text
      const pastedText = (e.clipboardData || window.clipboardData).getData('text/plain');
  
      // Insert the plain text without HTML tags
      jodit.s.insertHTML(pastedText.replace(/(<([^>]+)>)/gi, ''));
  
      return false;
    }, { top: true });
  }
  
  Jodit.plugins.add('preparePaste', preparePaste);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await insertBlog({
        ...values,
        images: image,
        featured_image: featuredImage,
      });
      console.log(response);
  
      // Reset Form
      resetForm();
  
      // Show an alert when the form is submitted successfully
      alert('Form submitted successfully!');
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  return (
    <div className="w-full pl-2 pr-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form
          className="space-y-4 bg-gray-100 p-6"
          enctype="multipart/form-data"
        >
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="title" className="block font-bold mb-1">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="sub_title" className="block font-bold mb-1">
                Sub Title
              </label>
              <Field
                type="text"
                id="sub_title"
                name="sub_title"
                className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
              <ErrorMessage
                name="sub_title"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="tags" className="block font-bold mb-1">
              Tags
            </label>
            <FieldArray name="tags">
              {(arrayHelpers) => (
                <>
                  {arrayHelpers.form.values.tags &&
                    arrayHelpers.form.values.tags.map((tag, index) => (
                      <div key={index} className="flex items-center">
                        <Field
                          type="text"
                          name={`tags[${index}]`}
                          className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="text-red-500 ml-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                    className="text-blue-500 mt-2"
                  >
                    + Add More
                  </button>
                </>
              )}
            </FieldArray>
            <ErrorMessage
              name="tags"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-bold mb-1">
              Description
            </label>
            <Field name="description">
              {({ field }) => (
                <JoditEditor
                  ref={editor}
                  value={field.value}
                  onChange={(value) => {
                    // Set the value of the field whenever the JoditEditor content changes
                    field.onChange({ target: { name: "description", value } });
                  }}
                  plugins={['preparePaste']} // Add the custom plugin here
                />
              )}
            </Field>
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="left_description" className="block font-bold mb-1">
              Left Description
            </label>
            <Field name="left_description">
              {({ field }) => (
                <JoditEditor
                  ref={editor}
                  value={field.value}
                  onChange={(value) => {
                    // Set the value of the field whenever the JoditEditor content changes
                    field.onChange({ target: { name: "left_description", value } });
                  }}
                  plugins={['preparePaste']} // Add the custom plugin here
                />
              )}
            </Field>
            <ErrorMessage name="left_description" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="name" className="block font-bold mb-1">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="person_position" className="block font-bold mb-1">
              Person Position
            </label>
            <Field
              type="text"
              id="person_position"
              name="person_position"
              className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="person_position"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-bold mb-1">
              Category
            </label>
            <Field
              as="select"
              id="category"
              name="category"
              className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
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
              className="text-red-500"
            />
          </div>

          <div>
            <label htmlFor="featured_image" className="block font-bold mb-1">
              Banner Image
            </label>
            <input
              type="file"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
            />
            {/* <Field
              type="file"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
            />
            <ErrorMessage
              name="featured_image"
              component="div"
              className="text-red-500"
            /> */}
          </div>
          <div>
            <label htmlFor="images" className="block font-bold mb-1">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {/* <Field type="file" id="images" name="images" className="w-full" />
            <ErrorMessage
              name="images"
              component="div"
              className="text-red-500"
            /> */}
          </div>
          <div>
            <button
              type="submit"
              className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-400 focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Blogs;
