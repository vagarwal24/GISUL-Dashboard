import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_GET_DEPARTMENT_DATA, API_UPDATE_JOB_DATA } from "../../api";
import stateData from "../Job/states.json";
import Select from "react-select";

const handleStateChange = (selectedOption, setCityOptions) => {
  console.log("----->", setCityOptions);
  const selectedStateData = stateData.states.find(
    (state) => state.state === selectedOption.value
  );

  if (selectedStateData) {
    const cities = selectedStateData.city ;
    console.log("----->", cities);
    
    setCityOptions(cities.map((city) => ({
        value: city,
        label: city,
      }))
    );
  } else {
    setCityOptions([]);
    // console.log('check', setCityOption)
  }
};

const validationSchema = Yup.object().shape({
  job_title: Yup.string()
    .required("Title is required")
    .test('capitalized', 'Title must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  // job_type: Yup.string()
  //   .required("Job-Type is required"),

  experience: Yup.string()
    .required("Experience is required")
    .test('capitalized', 'Experience must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  location: Yup.object().shape({
    state: Yup.string().required("State is required")
      .test('capitalized', 'State must start with a capital letter', (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }),

    city: Yup.string().required("City is required")
      .test('capitalized', 'City must start with a capital letter', (value) => {
        if (value) {
          return value[0] === value[0].toUpperCase();
        }
        return true;
      }),
  }),

  job_profile: Yup.string()
    .required("Job-Profile is required")
    .test('capitalized', 'Job-Profile must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  posted_date: Yup.date().nullable()
    .required("Posted Date is required"),


  job_responsibilities: Yup.string()
    .required("Responsibilities are required")
    .test(
      "wordLimit",
      "Responsibilities should not exceed 1000 words",
      (value) => {
        if (value) {
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount <= 1000;
        }
        return true;
      }
    ),

});


const EditJob = ({ jobId, job }) => {
  const [departments, setDepartments] = useState([]);
  
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(API_GET_DEPARTMENT_DATA);
        setDepartments(response.data);
      } catch (error) {
        console.log("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `${API_UPDATE_JOB_DATA}/${jobId}`,
        values
      );
  
      console.log(response);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const initialValues = {
    job_title: job.job_title,
    job_type: job.job_type,
    experience: job.experience,
    state: "",
    city: "",
    job_profile: job.job_profile,
    job_responsibilities: job.job_responsibilities,
    requirements: job.requirements,
    job_code: job.job_code,
    posted_date: "",
    department: "",
  };

  const [cityOptions, setCityOptions] = useState([]);

  const jobTypeOptions = [
    { value: "fresher", label: "Fresher" },
    { value: "part-time", label: "Part-Time" },
    { value: "freelancer", label: "Freelancer" },
    { value: "full-time", label: "Full-time" },
  ];

  const SelectField = ({ options, ...props }) => {
    const [field, meta] = useField(props.name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (selectedOption) => {
      setFieldValue(props.name, selectedOption.value);
      if (props.name === "state") {
        setFieldValue("state", selectedOption.value);
        handleStateChange(selectedOption, setCityOptions);
      } else if (props.name === "city") {
        setFieldValue("city", selectedOption.value);
      }
    };

    const selectedOption = options.find(
      (option) => option.value === field.value
    );

    return (
      <>
        <Select
          {...props}
          options={options}
          onChange={handleChange}
          value={selectedOption}
        />
        {meta.touched && meta.error && (
          <div className="text-red-500">{meta.error}</div>
        )}
      </>
    );
  };

  return (
    <div className="justify-center items-center flex rounded-lg overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-2 pt-5">
      <div className="relative w-[1500px] mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none m-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4 bg-gray-300 rounded-lg p-6 pt-[600px]">
            <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
              <div className="flex flex-col mb-4">
                <label htmlFor="job_title" className="font-bold mb-1">Job Title</label>
                <Field
                  type="text"
                  id="job_title"
                  name="job_title"
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="job_title" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="job_type" className="font-bold mb-1">Job Type</label>
                <SelectField
                  id="job_type"
                  name="job_type"
                  options={jobTypeOptions}
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="job_type" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="experience" className="font-bold mb-1">Experience</label>
                <Field
                  type="text"
                  id="experience"
                  name="experience"
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="experience" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="state" className="font-bold mb-1">State</label>
                <SelectField
                  id="state"
                  name="state"
                  options={stateData.states.map((state) => ({
                    value: state.state,
                    label: state.state,
                  }))}
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="state" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="city" className="font-bold mb-1">City</label>
                <SelectField
                  id="city"
                  name="city"
                  options={cityOptions.map((city) => ({
                    value: city.value,
                    label: city.label,
                  }))}
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="city" component="div"/>
              </div>

              {/* Add more fields here */}
              
              <div className="flex flex-col mb-4">
                <label htmlFor="job_profile" className="font-bold mb-1">Job Profile</label>
                <Field
                  type="text"
                  id="job_profile"
                  name="job_profile"
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="job_profile" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="job_responsibilities" className="font-bold mb-1">Job Responsibilities</label>
                <Field
                  as="textarea"
                  id="job_responsibilities"
                  name="job_responsibilities"
                  className="w-[300px] h-24 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="job_responsibilities" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="requirements" className="font-bold mb-1">Requirements</label>
                <Field
                  as="textarea"
                  id="requirements"
                  name="requirements"
                  className="w-[300px] h-24 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="requirements" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="job_code" className="font-bold mb-1">Job Code</label>
                <Field
                  type="text"
                  id="job_code"
                  name="job_code"
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="job_code" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="posted_date" className="font-bold mb-1">Posted Date</label>
                <Field
                  type="date"
                  id="posted_date"
                  name="posted_date"
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <ErrorMessage className="text-red-500" name="posted_date" component="div"/>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="department" className="font-bold mb-1">Department</label>
                <Field
                  as="select"
                  id="department"
                  name="department"
                  className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select a department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className="text-red-500" name="department" component="div"/>
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

export default EditJob;
