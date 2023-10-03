import React, { useEffect, useState } from 'react'
import { API_DELETE_JOB_DATA, API_GET_JOB_DATA } from '../../api';
import EditJob from './EditJob';
import axios from 'axios'

export default function JobTable() {
    const [jobs, setJobs] = useState(""); 
  const [showEditModal, setShowEditModal]=useState(false)
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_GET_JOB_DATA);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the fetchData function to make the API call
  }, []);

// const onClose=()=>{
  
// }


  const handleEdit = (id, job) => {
    setSelectedJobId(id);
    setSelectedJob(job);
    setShowEditModal(true)
    console.log("hello",id)
  };

  const handleRemove = (id) => {
    const jobId = id;
    axios
      .delete(`${API_DELETE_JOB_DATA}/${jobId}`)
      .then((response) => {
        console.log("Blog removed successfully");
        const updatedJobs = jobs.filter((job) => job._id !== jobId);
      setJobs(updatedJobs);
      })
      .catch((error) => {
        console.error("Error removing blog:", error);
      });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleReadMore = (jobId) => {
    const updatedJobs = jobs.map((job) => {
      if (job._id === jobId) {
        return { ...job, expanded: !job.expanded };
      }
      return job;
    });

    setJobs(updatedJobs);
  };
  

  return (
    <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-5 bg-gray-100">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>

              <th scope="col" className="px-6 py-3">
                Experience
              </th>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              
              <th scope="col" className="px-6 py-3">
                Job-Type
              </th>

              <th scope="col" className="px-6 py-4">
                Responsibilites
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs &&
              jobs.map((job) => (
                <tr
                  key={job._id}
                  className="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-50 bg-gray-100"
                >
                  
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {job.job_title}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {job.experience}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {job.job_profile.length > 30 && !job.expanded
                      ? truncateText(job.job_profile, 30)
                      : job.job_profile}
                    {job.job_profile.length > 30 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleReadMore(job._id)}
                      >
                        {job.expanded ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </th>
                  
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {job.job_type}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {job.job_responsibilities.length > 30 && !job.expanded
                      ? truncateText(job.job_responsibilities, 30)
                      : job.job_responsibilities}
                    {job.job_responsibilities.length > 30 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleReadMore(job._id)}
                      >
                        {job.expanded ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </th>
                  {/* <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {job.job_responsibilities}
                  </th> */}
                  {/* <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td> */}

                  
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEdit(job._id,job)}
                    >
                      <i className="fa fa-pencil-square" aria-hidden="true"></i>
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleRemove(job._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {showEditModal && <EditJob jobId={selectedJobId} job={selectedJob} />}
      </div>
    
    </>
  )
}
