import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_INSERT_CATEGORY_DATA } from '../../api';

const FormCategory = () => {
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

  // Submit handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('type', values.type);
      formData.append('name', values.name);
      if (values.type === 'course') {
        formData.append('description', values.description);
        if (values.image) {
          formData.append('image', values.image);
        }
        if (values.video) {
          formData.append('video', values.video);
        }
      }

      await axios.post(API_INSERT_CATEGORY_DATA, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log(response.data);

      // Refresh the page
      resetForm();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 pl-12 pt-9 ml-10">Create Category</h1>
      <Formik
        initialValues={{ type: '', name: '', image: null, description: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="max-w-sm pl-12 pt-9 ml-10">
            <div className="mb-4">
              <label htmlFor="type" className="block mb-1 font-bold">
                Type of Category
              </label>
              <Field
                as="select"
                id="type"
                name="type"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select an option</option>
                <option value="blog">Blog</option>
                <option value="course">Course</option>
                <option value="faq">FAQ</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-bold">
                Name of Category
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>

            {values.type === 'course' && (
              <div>
                <label htmlFor="description">Category Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="description" />
              </div>
            )}

            {values.type === 'course' && (
              <div className='pt-5'>
                <label htmlFor="image">Category Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                />
                <ErrorMessage name="image" />
              </div>
            )}
            {values.type === 'course' && (
              <div className='pt-5'>
                <label htmlFor="video">Category Video</label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  onChange={(event) => setFieldValue('video', event.currentTarget.files[0])}
                />
                <ErrorMessage name="video" />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 mt-4 py-2 bg-blue-500 text-white rounded"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCategory;
