import React from 'react'
import {  Routes, Route  } from 'react-router-dom'

// import Account from '../pages/AccountSetting/Account';
import Blogs from '../pages/Blogs/Blogs'; 
import Contact from '../pages/Contact us/Contact';
// import Content from '../pages/Category/Category';
import Dashboard from '../pages/Dashboard/Dashboard';
import Faq from '../pages/Faqs/Faq';
import Job from '../pages/Job/Job';
import BlogsTable from '../pages/Blogs/BlogsTable';
// import EditBlog from '../pages/Blogs/EditBlog';
import FaqTable from '../pages/Faqs/FaqTable';
import JobTable from '../pages/Job/JobTable';
import Courses from '../pages/Courses/Courses';
import CourseTable from '../pages/Courses/CourseTable';
import Category from '../pages/Category/Category';
import CategoryTable from '../pages/Category/Categorytable';
import Testimonial  from '../pages/Testimonial/Testimonial';
import Testimonialtable from '../pages/Testimonial/TestimonialTable';
import WebinarForm from '../pages/Webinar/Webinar';
import WebinarTable from '../pages/Webinar/WebinarTable';
import CompanyLogo from '../pages/Company/Company';
import CompanyList from '../pages/Company/CompanyList';
import Department from '../pages/Department/Department';
import DepartmentTable from '../pages/Department/DepartmentTable';
import Enquriy from '../pages/Enquiry/Enquiry';



 const Index=()=> {
  return (
      
          
          <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          {/* <Route exact path="/account" element={<Account/>}/> */}
          <Route exact path="/blog" element={<Blogs/>}/> 
          <Route exact path="/faq" element={<Faq/>}/>
          <Route exact path="/category" element={<Category/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/job" element={<Job/>}/>
          <Route exact path="/blogTable" element={<BlogsTable/>}/>
          {/* <Route exact path="/editBlog" element={<EditBlog/>}/> */}
          <Route exact path="/faqTable" element={<FaqTable/>}/>
          <Route exact path="/job-list" element={<JobTable/>}/>
          <Route exact path="/course" element={<Courses/>}/>
          <Route exact path="/course-table" element={<CourseTable/>}/>
          <Route exact path="/category-list" element={<CategoryTable/>}/>
          <Route exact path="/testimonial" element={<Testimonial/>}/>
          <Route exact path="/testimonial-list" element={<Testimonialtable/>}/>
          <Route exact path="/webinar" element={<WebinarForm/>}/>
          <Route exact path="/webinar-list" element={<WebinarTable/>}/>
          <Route exact path="/company-logo" element={<CompanyLogo/>}/>
          <Route exact path="/company-list" element={<CompanyList/>}/>
          <Route exact path="/department-list" element={<DepartmentTable/>}/>
          <Route exact path="/department" element={<Department/>}/>
          <Route exact path="/enquiry" element={<Enquriy/>}/>
          

         
        
          </Routes>

  
  )
}

export default Index