import React, { useEffect, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { API_GET_DEPARTMENT_DATA, API_INSERT_JOB_DATA } from "../../api";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import stateData from "../Job/states.json";

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


const Jobs = () => {
  const initialValues = {
    job_title: "",
    job_type: "",
    experience: "",
    location: {
      state: "",
      city: "",
    },
    job_profile: "",
    job_responsibilities: "",
    posted_date: null,
    job_code: "",
    requirements: "",
    department: "",
  };

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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(API_INSERT_JOB_DATA, values);
      console.log(response.data);
  
      // Show a success message when the form is submitted
      window.alert("Form submitted successfully!");
  
      // Refresh the page
      resetForm();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  console.log("stateData:", stateData);
  // const stateOptions = stateData.map((state) => ({
  //   value: state.state,
  //   label: state.state,
  // }));
  // const stateOptions = stateData
  // console.log(stateData.states)
  const [selectedState, setSelectedState] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  console.log('check', cityOptions)
  // console.log('check', cityOptions)
  // stateData.forEach((state) => {
  //   cityOptions[state.state] = state.cities.map((city) => ({
  //     value: city,
  //     label: city,
  //   }));
  // });

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
  if (props.name === "location.state") {
    setFieldValue(props.name, selectedOption.value);

    // Call the handleStateChange function with setCityOptions
    handleStateChange(selectedOption, setCityOptions);
  } else if (props.name === "location.city") {
    // Update the city value in the form values
    setFieldValue(props.name, selectedOption.value);
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
    <div className="w-full pl-2 pr-4">
      <h1 className="text-2xl font-bold mb-4">Create Job</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4 bg-gray-100 p-6">
          <div>
            <label htmlFor="job_title" className="block font-bold mb-1">
              Title
            </label>
            <Field
              type="text"
              id="job_title"
              name="job_title"
              className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="job_title"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
        <label htmlFor="job_type" className="block font-bold mb-1">
          Job-Type
        </label>
        {/* Pass jobTypeOptions as a prop */}
        <SelectField
          id="job_type"
          name="job_type"
          options={jobTypeOptions}  // Pass the jobTypeOptions array
          className="w-[300px] px-4 py-2  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
        <ErrorMessage
          name="job_type"
          component="div"
          className="text-red-500"
        />
      </div>
          <div>
            <label htmlFor="experience" className="block font-bold mb-1">
              Experience
            </label>
            <Field
              type="text"
              id="experience"
              name="experience"
              className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="experience"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="block font-bold mb-1">
              State
            </label>
            <SelectField
              id="state"
              name="location.state"
              options={stateData.states.map((state) => ({
                value: state.state,
                label: state.state,
              }))}
              className="w-[300px] px-4 py-2 border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              
            />
            <ErrorMessage
              name="location.state"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="city" className="block font-bold mb-1">
              City
            </label>
            <SelectField
              id="city"
              name="location.city"
              options={cityOptions.map((city) => ({
                value: city.value,
                label: city.label,
              }
              ))}
              className="w-[300px] px-4 py-2 border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              onChange={(e)=> setCityOptions(  {value: e.target.value,
                label: e.target.value})}
            />
            <ErrorMessage
              name="location.city"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="job_profile" className="block font-bold mb-1">
              Profile
            </label>
            <Field
              type="text"
              id="job_profile"
              name="job_profile"
              className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="job_profile"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="job_responsibilities"
              className="block font-bold mb-1"
            >
              Responsibilities
            </label>
            <Field
              as="textarea"
              id="job_responsibilities"
              name="job_responsibilities"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="job_responsibilities"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="department" className="font-bold mb-1">
              Department
            </label>
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
            <ErrorMessage
              name="department"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="posted_date" className="block font-bold mb-1">
              Posted Date
            </label>
            <Field name="posted_date">
              {({ form, field }) => (
                <DatePicker
                  id="posted_date"
                  {...field}
                  selected={form.values.posted_date}
                  onChange={(date) => form.setFieldValue("posted_date", date)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
              )}
            </Field>
            <ErrorMessage
              name="posted_date"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="job_code" className="block font-bold mb-1">
              Job Code
            </label>
            <Field
              type="text"
              id="job_code"
              name="job_code"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="job_code"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="requirements" className="block font-bold mb-1">
              Requirements
            </label>
            <Field
              as="textarea"
              id="requirements"
              name="requirements"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="requirements"
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
      </Formik>
    </div>
  );
};

export default Jobs;
