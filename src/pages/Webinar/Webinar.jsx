import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_INSERT_WEBINAR_DATA } from '../../api';



const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .test('capitalized', 'Title must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  description: Yup.string()
    .required('Description is required'),

  date: Yup.date()
    .required('Date is required'),

  time: Yup.string()
    .required('Time is required')
    .test('capitalized', 'Time must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),
});


const WebinarForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('date', values.date);
      formData.append('time', values.time);
      formData.append('image', values.image);
  
      const response = await axios.post(API_INSERT_WEBINAR_DATA, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Server Response:', response.data);
  
      // Show an alert message when the form is submitted successfully
      window.alert('Form submitted successfully!');
  
      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        date: '',
        time: '',
        image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="w-full p-4 bg-gray-100 rounded shadow">
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              Title
            </label>
            <Field type="text" name="title" className="w-full px-3 py-2 border rounded" />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              rows="4"
              className="w-full px-3 py-2 border rounded"
            />
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </div>
          
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
            />
            <ErrorMessage name="image" component="div" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="block font-medium mb-1">
              Date
            </label>
            <Field type="date" name="date" className="w-full px-3 py-2 border rounded" />
            <ErrorMessage name="date" component="div" className="text-red-500" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="time" className="block font-medium mb-1">
              Time
            </label>
            <Field type="time" name="time" className="w-full px-3 py-2 border rounded" />
            <ErrorMessage name="time" component="div" className="text-red-500" />
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default WebinarForm;
