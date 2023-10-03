import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_GET_CATEGORY_DATA, API_INSERT_COURSE_DATA } from "../../api";

const validationSchema = Yup.object().shape({
  course_name: Yup.string()
    .required("Course Name is required")
    .test('capitalized', 'Course Name must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  details: Yup.string()
    .required("Details is required")
    .test("wordLimit", "Details should not exceed 1000 words", (value) => {
      if (value) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= 1000;
      }
      return true;
    }),

  professional: Yup.string()
    .required("Professional is required")
    .test('capitalized', 'Professional must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  pre_requisite: Yup.array()
    .of(Yup.string())
    .required("Pre Requisite is required"),

  program_highlights: Yup.array()
    .of(Yup.string())
    .required("Program Highlights is required"),

  category: Yup.string()
    .required("Category is required")
    .test('capitalized', 'Category must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),

  program_description: Yup.string()
    .required("Program Description is required")
    .test('capitalized', 'Program Description must start with a capital letter', (value) => {
      if (value) {
        return value[0] === value[0].toUpperCase();
      }
      return true;
    }),
});


const Courses = () => {
  const [syllabusLink, setSyllabusLink] = useState({});
  const [video, setVideo] = useState({});
  const [image, setImage] = useState({});
  const [courseImages, setCourseImages] = useState({});
  console.log(video);
  const initialValues = {
    course_name: "",
    details: "",
    duration: [
      {
        months: "",
        hoursPerDay: "",
      },
    ],
    professional: "",
    pre_requisite: [""],
    program_highlights: [""],
    skill_covered: [""],
    category: "",
    instructor: [
      {
        name: "",
        description: "",
        image: null,
      },
    ],
    program_description: "",
    skill_level: "",
    course_module: [{ title: "", description: "" }],
  };
  // console.log('---->', )
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_GET_CATEGORY_DATA);
        setCategories(
          response.data.filter((category) => category.type === "course")
        );
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        API_INSERT_COURSE_DATA,
        {
          ...values,
          video: video,
          syllabus_links: syllabusLink,
          instructor_image: image,
          course_images: courseImages,
        },
        { headers: { "Content-type": "multipart/form-data" } }
      );
      console.log(response);
  
      // Reset form
      resetForm();
  
      // Show an alert when the form is submitted successfully
      alert("Form submitted successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  return (
    <div className="w-full pl-2 pr-4">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4 bg-gray-100 p-6">
          <div className="flex flex-col mb-4">
            <label htmlFor="course_name" className="font-bold mb-1">
              Course Name
            </label>
            <Field
              type="text"
              id="course_name"
              name="course_name"
              className="w-[300px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="course_name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="details" className="font-bold mb-1">
              Details
            </label>
            <Field
              as="textarea" // Use textarea as the component
              id="details"
              name="details"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              style={{ height: "200px" }} // Set the desired height using inline style
            />
            <ErrorMessage
              name="details"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="duration" className="font-bold mb-1">
              Duration
            </label>
            <FieldArray name="duration">
              {(arrayHelpers) => (
                <>
                  {arrayHelpers.form.values.duration.map((duration, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <div className="w-1/3">
                        <label htmlFor={`duration[${index}].months`}>
                          Month
                        </label>
                        <Field
                          type="text"
                          id={`duration[${index}].months`}
                          name={`duration[${index}].months`}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="w-1/2 ml-4">
                        <label htmlFor={`duration[${index}].hoursPerDay`}>
                          Hours Per Day
                        </label>
                        <Field
                          as="textarea"
                          id={`duration[${index}].hoursPerDay`}
                          name={`duration[${index}].hoursPerDay`}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="professional" className="font-bold mb-1">
              Professional
            </label>
            <Field
              type="text"
              id="professional"
              name="professional"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage
              name="professional"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="pre_requisite" className="font-bold mb-1">
              Pre Requisite
            </label>
            <FieldArray name="pre_requisite">
              {(arrayHelpers) => (
                <>
                  {arrayHelpers.form.values.pre_requisite.map(
                    (prerequisite, index) => (
                      <div key={index}>
                        <div className="flex items-center">
                          <Field
                            type="text"
                            name={`pre_requisite[${index}]`}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="text-red-500 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                        <ErrorMessage
                          name={`pre_requisite[${index}]`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    )
                  )}
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
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="program_highlights" className="font-bold mb-1">
              Program Highlights
            </label>
            <FieldArray name="program_highlights">
              {(arrayHelpers) => (
                <>
                  {arrayHelpers.form.values.program_highlights.map(
                    (program, index) => (
                      <div key={index}>
                        <div className="flex items-center">
                          <Field
                            type="text"
                            name={`program_highlights[${index}]`}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="text-red-500 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                        <ErrorMessage
                          name={`program_highlights[${index}]`}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    )
                  )}
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
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-bold mb-1">Skill Level</label>
            <FieldArray name="skill_level">
              {(arrayHelpers) => (
                <div className="flex space-x-4">
                  <label>
                    <Field
                      type="checkbox"
                      name="skill_level"
                      value="Beginner"
                      className="mr-1"
                    />
                    Beginner
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="skill_level"
                      value="Intermediate"
                      className="mr-1"
                    />
                    Intermediate
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="skill_level"
                      value="Advanced"
                      className="mr-1"
                    />
                    Advanced
                  </label>
                </div>
              )}
            </FieldArray>
            <ErrorMessage
              name="skill_level"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="skill_covered" className="font-bold mb-1">
              Skill Covered
            </label>
            <Field
              as="textarea" // Use textarea as the component
              id="skill_covered"
              name="skill_covered"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              style={{ height: "200px" }} // Set the desired height using inline style
            />
            <ErrorMessage
              name="skill_covered"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="category" className="font-bold mb-1">
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
          <div className="flex flex-col mb-4">
            <label htmlFor="course_module" className="font-bold mb-1">
              Program Module
            </label>
            <FieldArray name="course_module">
              {(arrayHelpers) => (
                <>
                  {arrayHelpers.form.values.course_module.map(
                    (module, index) => (
                      <div key={index} className="flex items-center mb-4">
                        <div className="w-1/3">
                          <label htmlFor={`course_module[${index}].title`}>
                            Title
                          </label>
                          <Field
                            type="text"
                            id={`course_module[${index}].title`}
                            name={`course_module[${index}].title`}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="w-1/2 ml-4">
                          <label
                            htmlFor={`course_module[${index}].description`}
                          >
                            Description
                          </label>
                          <Field
                            as="textarea"
                            id={`course_module[${index}].description`}
                            name={`course_module[${index}].description`}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="text-red-500 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({ title: "", description: "" })
                    }
                    className="text-blue-500 mt-2"
                  >
                    + Add More
                  </button>
                </>
              )}
            </FieldArray>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="instructor" className="font-bold mb-1">
              Instructor
            </label>
            <FieldArray name="instructor">
              {(arrayHelpers) => (
                <>
                  {arrayHelpers.form.values.instructor.map(
                    (instructor, index) => (
                      <div key={index}>
                        <div className="flex items-center mb-4">
                          <div className="w-1/3">
                            <label htmlFor={`instructor[${index}].name`}>
                              Name
                            </label>
                            <Field
                              type="text"
                              id={`instructor[${index}].name`}
                              name={`instructor[${index}].name`}
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div className="w-1/2 ml-4">
                            <label htmlFor={`instructor[${index}].description`}>
                              Description
                            </label>
                            <Field
                              type="text"
                              id={`instructor[${index}].description`}
                              name={`instructor[${index}].description`}
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div className="w-1/3 ml-4">
                            <label htmlFor={`instructor[${index}].image`}>
                              Image
                            </label>
                            <input
                              type="file"
                              id={`instructor[${index}].image`}
                              name={`instructor[${index}].image`}
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="text-red-500 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                        {/* Add error messages for name, description, and image here if needed */}
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        name: "",
                        description: "",
                        image: null,
                      })
                    }
                    className="text-blue-500 mt-2"
                  >
                    + Add More
                  </button>
                </>
              )}
            </FieldArray>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="program_description" className="font-bold mb-1">
              Program Description
            </label>
            <Field
              as="textarea"
              id="program_description"
              name="program_description"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              style={{ height: "200px" }}
            />
            <ErrorMessage
              name="program_description"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="syllabus_links" className="font-bold mb-1">
              Syllabus Link
            </label>
            <input
              type="file"
              onChange={(e) => setSyllabusLink(e.target.files[0])}
            />
            <ErrorMessage
              name="syllabus_links"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="video" className="font-bold mb-1">
              Video
            </label>
            <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
            <ErrorMessage
              name="video"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="course_images" className="font-bold mb-1">
              Course Images
            </label>
            <input
              type="file"
              id="course_images"
              name="course_images"
              onChange={(e) => setCourseImages(e.target.files[0])}
            />
            <ErrorMessage
              name="course_images"
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

export default Courses;
