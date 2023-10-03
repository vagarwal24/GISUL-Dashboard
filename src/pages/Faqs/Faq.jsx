import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API_GET_CATEGORY_DATA, API_INSERT_FAQ_DATA } from "../../api";
import axios from "axios";

const validationSchema = Yup.object().shape({
  question: Yup.string()
    .required("Question is required")
    .test('capitalized', 'Question must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  answer: Yup.string()
    .required("Answer is required")
    .test('capitalized', 'Answer must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  category: Yup.string()
    .required("Category is required")
    .test('capitalized', 'Category must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),
});


const Faq = () => {
  const initialValues = {
    question: "",
    answer: "",
    category: "",
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_GET_CATEGORY_DATA);
        setCategories(
          response.data.filter((category) => category.type === "faq")
        );
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(API_INSERT_FAQ_DATA, values);
      console.log(response.data);
  
      // Reset form and show an alert when the form is submitted successfully
      resetForm();
      alert("FAQ created successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  return (
    <div className="w-full pl-2 pr-4">
      <h1 className="text-2xl font-bold mb-4">Create FAQ</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="space-y-4 bg-gray-100 p-6">
            <div>
              <label htmlFor="question" className="block font-bold mb-1">
                Question
              </label>
              <Field
                type="text"
                id="question"
                name="question"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
              <ErrorMessage
                name="question"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label htmlFor="answer" className="block font-bold mb-1">
                Answer
              </label>
              <Field
                as="textarea"
                id="answer"
                name="answer"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                style={{ height: "200px" }}
              />
              <ErrorMessage
                name="answer"
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
              <button
                type="submit"
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-400 focus:outline-none focus:shadow-outline"
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

export default Faq;
