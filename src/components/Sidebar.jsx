import React, { useEffect } from "react";
// import Search from './Search'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { API_LOGOUT_ADMIN_DATA } from "../api";
import logimg from "../res/AppImages/Logo.png";

const Sidebar = ({ currentPath }) => {
  const [open, setOpen] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000); // Adjust the breakpoint if needed
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = async () => {
    try {
      const adminToken = localStorage.getItem("token");

      const response = await axios.post(API_LOGOUT_ADMIN_DATA, null, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.status === 200) {
        console.log("Logout successful");
      } else if (response.status === 404) {
        console.log("Admin not found");
      } else {
        console.log("Server error");
      }

      localStorage.removeItem("token");
      console.log("Logout is id");

      // Redirect to the login page
      window.location.replace("/");
    } catch (error) {
      console.error("Error:", error);
      localStorage.removeItem("token");
      console.log("Logout is id");

      // Redirect to the login page
      window.location.replace("/");
    }
  };

  if (isMobile) {
    return <p>Please access this page on a laptop or desktop.</p>;
  }

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden flex-grow bg-gray-100 hide-scrollbar">
        <div className="min-h-screen m-4 flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
          <div className="fixed flex flex-col top-0 left-1 w-64 bg-white h-full border-r">
            <div className="flex items-center justify-center h-14 border-b bg-gray-100">
              <img
                src={logimg}
                alt="Logo"
                className="gisul "
                style={{ width: "180px", height: "auto" }}
              />
            </div>

            <div className="overflow-y-auto overflow-x-hidden flex-grow bg-gray-200">
              <ul className="flex flex-col py-4 space-y-1">
                <li>
                  <Link
                    to="/"
                    className="relative flex flex-row items-center font-bold h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> */}
                      <i className="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Dashboard
                    </span>
                  </Link>
                </li>

                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(1)}
                  >
                    Blogs
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/blog"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Create
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/blogTable"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      BlogList
                    </Link>
                  </AccordionBody>
                </Accordion>

                
                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(2)}
                  >
                    FAQS
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/faq"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Create
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/faqTable"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Faq&nbsp;List
                    </Link>
                  </AccordionBody>
                </Accordion>

                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(3)}
                  >
                    Courses
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/course"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Create
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/course-table"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Course-List
                    </Link>
                  </AccordionBody>
                </Accordion>

                <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(4)}
                  >
                    Jobs
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/job"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Create
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/job-list"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Job List
                    </Link>
                  </AccordionBody>
                </Accordion>

                <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(5)}
                  >
                    Category
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/category"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Create
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/category-list"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Category List
                    </Link>
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(6)}
                  >
                    Testimonial
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/testimonial"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Create
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/testimonial-list"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Testimonial List
                    </Link>
                  </AccordionBody>
                </Accordion>

                <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(7)}
                  >
                    Webinar
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/webinar"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Create
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/webinar-list"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Webinar List
                    </Link>
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(8)}
                  >
                    Department
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/department"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Create
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/department-list"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Department List
                    </Link>
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 9} icon={<Icon id={9} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(9)}
                  >
                    Company-Logo
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/company-logo"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Add&nbsp;Logo
                    </Link>
                  </AccordionBody>
                  <AccordionBody>
                    <Link
                      to="/company-list"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Logo&nbsp;List
                    </Link>
                  </AccordionBody>
                </Accordion>

                <Accordion open={open === 10} icon={<Icon id={10} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(10)}
                  >
                    Contact&nbsp;us
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/contact"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      User List
                    </Link>
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 11} icon={<Icon id={11} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(11)}
                  >
                    Enquiry&nbsp;Form
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/enquiry"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      User List
                    </Link>
                  </AccordionBody>
                </Accordion>

                {/* <li>
                  <a
                    href="#"
                    className="relative flex flex-row items-center font-bold h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                      <i class="fa fa-home" aria-hidden="true"></i>
                      <i className="fa fa-cog" aria-hidden="true"></i>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Settings
                    </span>
                  </a>
                </li> */}

                {/* <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
                  <AccordionHeader
                    className="w-60 p-2 text-sm truncate"
                    onClick={() => handleOpen(7)}
                  >
                    Account Settings
                  </AccordionHeader>
                  <AccordionBody>
                    <Link
                      to="/account"
                      className="text-black-900 font-bold-600 pl-5"
                    >
                      Account
                    </Link>
                  </AccordionBody>
                </Accordion> */}

                
                <li>
                  <a
                    href="#"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    onClick={handleLogout}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Logout
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
