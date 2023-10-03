import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_UPDATE_FAQ_DATA, API_GET_CATEGORY_DATA } from "../../api";

const validationSchema = Yup.object().shape({
  question: Yup.string()
    .required("Question is required")
    .test(
      "capitalized",
      "Question must start with a capital letter",
      (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }
    ),

  answer: Yup.string()
    .required("Answer is required")
    .test("capitalized", "Answer must start with a capital letter", (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  category: Yup.string()
    .required("Category is required")
    .test(
      "capitalized",
      "Category must start with a capital letter",
      (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }
    ),
});

const EditFaq = ({ faqId, faq }) => {
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

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `${API_UPDATE_FAQ_DATA}/${faqId}`,
        values
      );
      console.log(response.data);

      // Refresh the page or handle success in your preferred way
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const initialValues = {
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-2">
      <div className="relative w-[1500px] mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray outline-none focus:outline-none">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4 bg-gray-300 rounded-lg p-5 pt-10">
              <h1 className="text-2xl font-bold mb-4">Edit FAQ</h1>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="question"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Question
                  </label>
                  <Field
                    type="text"
                    id="question"
                    name="question"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="answer"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Answer
                  </label>
                  <Field
                    type="text"
                    id="answer"
                    name="answer"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="answer"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

export default EditFaq;
