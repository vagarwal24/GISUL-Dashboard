import React from 'react';
import { Link } from 'react-router-dom';



const Dashboard = () => {
  const [categories, setCategories] = React.useState([
    { name: 'Blog', count: 0 },
    { name: 'Courses', count: 0 },
    { name: 'FAQ', count: 0 },
    { name: 'Job', count: 0 },
  ]);

  // Function to find the category with the highest count
  const getHighestCategory = () => {
    let highestCategory = categories[0];
    categories.forEach((category) => {
      if (category.count > highestCategory.count) {
        highestCategory = category;
      }
    });
    return highestCategory;
  };

  // Update category count
  const updateCategoryCount = (categoryName) => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.name === categoryName) {
          return {
            ...category,
            count: category.count + 1,
          };
        }
        return category;
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 gap-10">
        <Link to="/blogTable">
          <div
            className="bg-blue-500 hover:bg-blue-600 rounded-lg p-4"
            // onClick={() => updateCategoryCount('Blog')}
          >
            <h2 className="text-white text-4xl font-semibold mb-2 text-center">Blog</h2>
            <p className="text-white text-xl text-center">See your blog posts here</p>
          </div>
        </Link>
        <Link to="/course-table">
          <div
            className="bg-green-500 hover:bg-green-600 rounded-lg p-4"
            // onClick={() => updateCategoryCount('Courses')}
          >
            <h2 className="text-white text-4xl font-semibold mb-2 text-center">Courses</h2>
            <p className="text-white text-xl text-center">See your courses here</p>
          </div>
        </Link>
        <Link to="/faqTable">
          <div
            className="bg-yellow-500 hover:bg-yellow-600 rounded-lg p-4"
            // onClick={() => updateCategoryCount('FAQ')}
          >
            <h2 className="text-white text-4xl font-semibold mb-2 text-center">FAQ</h2>
            <p className="text-white text-xl text-center">See your faq here</p>
          </div>
        </Link>
        <Link to="/job-list">
          <div
            className="bg-purple-500 hover:bg-purple-600 rounded-lg p-4"
            // onClick={() => updateCategoryCount('Job')}
          >
            <h2 className="text-white text-4xl font-semibold mb-2 text-center">Job</h2>
            <p className="text-white text-xl text-center">See your job postings here</p>
          </div>
        </Link>
        <Link to="/company-list">
          <div
            className="bg-red-500 hover:bg-purple-600 rounded-lg p-4"
            // onClick={() => updateCategoryCount('Job')}
          >
            <h2 className="text-white text-4xl font-semibold mb-2 text-center">Company</h2>
            <p className="text-white text-xl text-center">See your company logo here</p>
          </div>
        </Link>
        <Link to="/webinar-list">
          <div
            className="bg-orange-500 hover:bg-purple-600 rounded-lg p-4"
            // onClick={() => updateCategoryCount('Job')}
          >
            <h2 className="text-white text-4xl font-semibold mb-2 text-center">Webinar</h2>
            <p className="text-white text-xl text-center">See your webinar here</p>
          </div>
        </Link>
        <Link to="/testimonial-list">
          <div
            className="bg-blue-500 hover:bg-purple-600 rounded-lg p-4"
            // onClick={() => updateCategoryCount('Job')}
          >
            <h2 className="text-white text-4xl font-semibold mb-2 text-center">Testimonial</h2>
            <p className="text-white text-xl text-center">See your testimonial here</p>
          </div>
        </Link>
        <Link to="/category-list">
          <div
            className="bg-green-500 hover:bg-purple-600 rounded-lg p-4"
            // onClick={() => updateCategoryCount('Job')}
          >
            <h2 className="text-white text-4xl font-semibold mb-2 text-center">Category</h2>
            <p className="text-white text-xl text-center">See your category here</p>
          </div>
        </Link>
      </div>
      
    </div>
  );
};

export default Dashboard;
