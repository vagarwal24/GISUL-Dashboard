import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_PASSWORDRESET_DATA } from '../../api';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const PasswordResetForm = () => {
  const { adminId, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Perform any necessary initialization logic here
    // For example, you can check the validity of the token
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Perform the password reset process
      // Send the values.password and values.password_confirmation to the server
      const response = await axios.post(API_PASSWORDRESET_DATA, {
        adminId,
        token,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });

      if (response.status === 200) {
        // Password reset successful
        // Reset the form fields
        setPassword('');
        setConfirmPassword('');
      } else {
        // Handle error response from the server
        setErrors({ password_confirmation: response.data.message });
      }
    } catch (error) {
      // Handle any network or server errors
      console.error(error);
    }

    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <Card>
      <CardContent>
        <h2>Password Reset</h2>
        <Formik
          initialValues={{ password: '', password_confirmation: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <Field
                as={TextField}
                type="password"
                name="password"
                label="New Password"
                fullWidth
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <Field
                as={TextField}
                type="password"
                name="password_confirmation"
                label="Confirm Password"
                fullWidth
              />
              <ErrorMessage name="password_confirmation" component="div" />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default PasswordResetForm;
