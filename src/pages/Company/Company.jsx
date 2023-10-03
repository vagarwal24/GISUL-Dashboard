import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_INSERT_LOGO_DATA, API_INSERT_WEBINAR_DATA } from '../../api';



const validationSchema = Yup.object().shape({
  image: Yup.mixed().required('Image is required'),
});

const CompanyLogo = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('image', values.image);
  
      const response = await axios.post(API_INSERT_LOGO_DATA, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Server Response:', response.data);
  
      // Reset the form after successful submission
      resetForm();
  
      // Show an alert when the form is submitted successfully
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <Formik
      initialValues={{
        image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="w-full p-4 bg-gray-100 rounded shadow">   
          
          <div className='p-6 m-5'>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              className='p-5 m-5'
              onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
            />
            <ErrorMessage name="image" component="div" />
          </div>        
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ml-5">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyLogo;
