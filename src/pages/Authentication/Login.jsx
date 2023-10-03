import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_LOGIN_ADMIN_DATA } from "../../api";
import { Link, useLocation } from "react-router-dom"; // Import the useLocation hook
import logimg from "../../res/AppImages/Logo.png";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const AdminLogin = ({ handleLogin }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  const location = useLocation(); // Access the location object

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(API_LOGIN_ADMIN_DATA, values);
      var data = response.data.token;
      localStorage.setItem("token", data);
      window.location.reload();
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-2/5 ">
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full">
          <img
                src={logimg}
                alt="Logo"
                className="gisul "
                // style={{ width: "180px", height: "auto" }}
              />
          <h4 class="mb-2">Welcome to GISUL! 👋</h4>
              <p class="mb-4">Please sign-in to your account</p>
              
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                name="password"
                placeholder="******************"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              {!localStorage.getItem("token") && ( // Only show forgot password link when not logged in
                <Link
                  to="/forgot-password"
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;
