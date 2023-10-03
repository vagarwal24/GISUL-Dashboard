import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_GET_CATEGORY_DATA, API_UPDATE_COURSE_DATA } from "../../api";

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

  duration: Yup.array().of(
    Yup.object().shape({
      months: Yup.string().required("Months is required"),
      hoursPerDay: Yup.string().required("Hours Per Day is required"),
    })
  ),

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

  course_module: Yup.array().of(
    Yup.object().shape({
      title: Yup.string()
        .required("Module Title is required")
        .test('capitalized', 'Module Title must start with a capital letter', (value) => {
          if (value) {
            return value[0] === value[0].toUpperCase();
          }
          return true;
        }),

      description: Yup.string().required("Module Description is required"),
    })
  ),

  instructor: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Instructor Name is required")
        .test('capitalized', 'Instructor Name must start with a capital letter', (value) => {
          if (value) {
            return value[0] === value[0].toUpperCase();
          }
          return true;
        }),

      description: Yup.string().required("Instructor Description is required"),
    })
  ),
});


const EditCourse = ({ courseId, course }) => {
  // console.log('----->',)
  const [showModal, setShowModal] = useState({});
  const [categories, setCategories] = useState([]);
  const [syllabusLinks, setSyllabusLinks] = useState({});
  const [video, setVideo] = useState({});
  const [courseImages, setCourseImages] = useState({});
  const [instructor_image, setInstructorImage] = useState({});

  

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

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("course_name", values.course_name);
    formData.append("details", values.details);
    formData.append("skill_covered", values.skill_covered);
    // Append other form fields to the formData

    formData.append("program_description", values.program_description);

    formData.append("category", values.category);
    formData.append("professional", values.professional);

    if (syllabusLinks) {
      formData.append("syllabus_links", syllabusLinks);
    }

    if (video) {
      formData.append("video", video);
    }

    if (courseImages) {
      formData.append("course_images", courseImages);
    }

    // Append duration
    values.duration.forEach((duration, index) => {
      formData.append(`duration[${index}].months`, duration.months);
      formData.append(`duration[${index}].hoursPerDay`, duration.hoursPerDay);
    });

    // Append pre_requisite
    
      values.pre_requisite.forEach((prerequisite, index) => {
        formData.append(`pre_requisite[${index}]`, prerequisite);
      });
  
      // Append program_highlights
      values.program_highlights.forEach((program_highlights, index) => {
        formData.append(`program_highlights[${index}]`, program_highlights);
      });
  
      // Append skill_level
      values.skill_level.forEach((skillLevel, index) => {
        formData.append(`skill_level[${index}]`, skillLevel);
      });


    // Append course_module
    values.course_module.forEach((module, index) => {
      formData.append(`course_module[${index}].title`, module.title);
      formData.append(
        `course_module[${index}].description`,
        module.description
      );
    });

    // Append instructor
    values.instructor.forEach((instructor, index) => {
      formData.append(`instructor[${index}].name`, instructor.name);
      formData.append(
        `instructor[${index}].description`,
        instructor.description
      );
      if (instructor_image) {
        // Use instructor_images instead of instructor_image
        formData.append(`instructor_image`, instructor_image); // Use instructor_images[index] to access the image for the specific instructor
      }
    });
    try {
      const response = await axios.put(
        `${API_UPDATE_COURSE_DATA}/${courseId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const initialValues = {
    course_name: course.course_name || "",
    details: course.details || "",
    duration: course.duration || [{ months: "", hoursPerDay: "" }],
    professional: course.professional || "",
    pre_requisite: course.pre_requisite || [],
    program_highlights: course.program_highlights || [],
    skill_covered: course.skill_covered || [],
    category: course.category || "",
    skill_level: course.skill_level || [],
    course_module: course.course_module || [{ title: "", description: "" }],
    instructor: course.instructor || [
      { name: "", description: "", image: null },
    ],
    program_description: course.program_description || "",
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
          <Form className="space-y-4 bg-gray-300 rounded-lg p-6 pt-[1700px]">
          <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
            {/* Course Name */}
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

            {/* Duration */}
            <div className="flex flex-col mb-4">
              <label htmlFor="duration" className="font-bold mb-1">
                Duration
              </label>
              <FieldArray name="duration">
                {(arrayHelpers) => (
                  <>
                    {arrayHelpers.form.values.duration.map(
                      (duration, index) => (
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
                      )
                    )}
                  </>
                )}
              </FieldArray>
            </div>

            {/* Professional */}
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

            {/* Pre Requisite */}
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

            {/* Program Highlights */}
            <div className="flex flex-col mb-4">
            <label htmlFor="program_highlights" className="font-bold mb-1">
              Program Highlights
            </label>
            <FieldArray name="program_highlights">
              {(arrayHelpers) => (
                <>
                  {arrayHelpers.form.values.program_highlights.map(
                    (program_highlights, index) => (
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

            {/* Skill Level */}
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

            {/* Category */}
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

            

            {/* Course Modules */}
            <div className="flex flex-col mb-4">
              <label htmlFor="course_module" className="font-bold mb-1">
                Module
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

            {/* Instructors */}
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
                            <div className="w-1/3 ml-4">
                              <label
                                htmlFor={`instructor[${index}].description`}
                              >
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
                                onChange={(e) => {
                                  const updatedImage = e.target.files[0];
                                  setInstructorImage(updatedImage); // Update instructor_image directly with the image file
                                }}
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

            {/* Program Description */}
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

            {/* Syllabus Links */}
            <div className="flex flex-col mb-4">
              <label htmlFor="syllabus_links" className="font-bold mb-1">
                Syllabus Link
              </label>
              <input
                type="file"
                onChange={(e) => setSyllabusLinks(e.target.files[0])}
              />
              <ErrorMessage
                name="syllabus_links"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Video */}
            <div className="flex flex-col mb-4">
              <label htmlFor="video" className="font-bold mb-1">
                Video
              </label>
              <input
                type="file"
                onChange={(e) => setVideo(e.target.files[0])}
              />
              <ErrorMessage
                name="video"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Course Images */}
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

            {/* Submit Button */}
            <div>
            <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
            </div>
          </Form>
      
      </Formik>
      </div>
      </div>
    </div>
  );
};

export default EditCourse;
