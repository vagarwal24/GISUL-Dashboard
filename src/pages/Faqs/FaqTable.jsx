import React, { useEffect, useState } from 'react';
import { API_DELETE_FAQ_DATA, API_GET_CATEGORY_DATA, API_GET_FAQ_DATA } from '../../api';
import axios from 'axios';
import EditFaq from './EditFaq';

export default function FaqTable() {
  const [faqs, setFaqs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch FAQ data
        const faqResponse = await axios.get(API_GET_FAQ_DATA);
        setFaqs(faqResponse.data);

        // Fetch category data
        const categoryResponse = await axios.get(API_GET_CATEGORY_DATA);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id, faq) => {
    setSelectedFaqId(id);
    setSelectedFaq(faq);
    setShowEditModal(true);
    console.log("hello", id);
  };

  const handleRemove = (id) => {
    const faqId = id;
    axios
      .delete(`${API_DELETE_FAQ_DATA}/${faqId}`)
      .then((response) => {
        console.log("Faq removed successfully");
        const updatedFaqs = faqs.filter((faq) => faq._id !== faqId);
        setFaqs(updatedFaqs);
      })
      .catch((error) => {
        console.error("Error removing faq:", error);
      });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleReadMore = (faqId) => {
    const updatedFaqs = faqs.map((faq) => {
      if (faq._id === faqId) {
        return { ...faq, expanded: !faq.expanded };
      }
      return faq;
    });

    setFaqs(updatedFaqs);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-100 pt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Question
              </th>
              <th scope="col" className="px-6 py-3">
                Answer
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => {
              const category = categories.find((category) => category._id === faq.category);

              return (
                <tr
                  key={faq._id}
                  className="bg-white border-b bg-gray-300 border-gray-700 bg-gray-100 bg-gray-300"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {faq.question.length > 30 && !faq.expanded
                      ? truncateText(faq.question, 30)
                      : faq.question}
                    {faq.question.length > 30 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleReadMore(faq._id)}
                      >
                        {faq.expanded ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {faq.answer.length > 30 && !faq.expanded
                      ? truncateText(faq.answer, 30)
                      : faq.answer}
                    {faq.answer.length > 30 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleReadMore(faq._id)}
                      >
                        {faq.expanded ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {category ? category.name : ''}
                  </th>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEdit(faq._id, faq)}
                    >
                      <i class="fa fa-pencil-square" aria-hidden="true"></i>
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleRemove(faq._id)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {showEditModal && <EditFaq faqId={selectedFaqId} faq={selectedFaq} />}
      </div>
    </>
  );
}
