import React, { useState } from "react";
import { dummyData } from "./item.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [view, setView] = useState("create");

  return (
    <div className="max-w-5xl mx-auto mt-4 p-3 md:p-6 bg-gradient-to-b from-gray-50 to-gray-100 shadow-xl rounded-xl border border-gray-200">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-2 text-gray-800 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Offers Dashboard
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Create and manage special offers and discounts for your products
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Link to="/create-offer"
          className={`px-4 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${
            view === "create"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-blue-200"
              : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:shadow"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Offers
        </Link>
        <Link to="/my-offers"
          className={`px-4 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${
            view === "my"
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-green-200"
              : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 hover:shadow"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          My Offers
        </Link>
      </div>

      {view === "create" && (
        <TableView title="Available Items" data={dummyData} itemsPerPage={10} />
      )}
      {view === "my" && (
        <TableView title="My Offered Items" data={dummyData} itemsPerPage={10} />
      )}
    </div>
  );
}

function TableView({ title, data, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const isSelected = (id) => selectedRows.includes(id);

  return (
    <div className="bg-white rounded-xl shadow-md p-3 md:p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Select items to create offers</p>
        </div>
        
        {selectedRows.length > 0 && (
          <div className="flex space-x-2">
            <span className="bg-blue-100 text-blue-800 py-1 px-2 md:px-3 rounded-full text-xs md:text-sm font-medium">
              {selectedRows.length} item{selectedRows.length !== 1 ? 's' : ''} selected
            </span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Offer
            </button>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="py-2 px-2 md:py-3 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">ID</th>
              <th className="py-2 px-2 md:py-3 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">Name</th>
              <th className="py-2 px-2 md:py-3 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">Category</th>
              <th className="py-2 px-2 md:py-3 md:px-4 text-right text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">Price (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((item, idx) => (
              <tr
                key={item.id}
                className={`
                  ${isSelected(item.id) ? 'bg-blue-50' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                  hover:bg-blue-50 transition-colors duration-150
                `}
                onClick={() => toggleRowSelection(item.id)}
              >
                <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-800">{item.id}</td>
                <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm text-gray-800 font-medium">{item.name}</td>
                <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm text-gray-600">
                  <span className="px-1 py-0.5 md:px-2 md:py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                    {item.category}
                  </span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-800 text-right">
                  {item.discount ? (
                    <div>
                      <span className="line-through text-gray-500 mr-1 md:mr-2">₹{item.price}</span>
                      <span className="text-green-600">₹{(item.price * (1 - item.discount/100)).toFixed(2)}</span>
                    </div>
                  ) : (
                    <span>₹{item.price}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 md:mt-6 gap-3">
        <div className="text-xs md:text-sm text-gray-500 order-2 sm:order-1">
          Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, data.length)} of {data.length} items
        </div>
        
        <div className="flex items-center space-x-1 order-1 sm:order-2">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-1 md:px-2 py-1 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-1 md:px-2 py-1 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Only show current page number on mobile */}
          <div className="sm:hidden">
            <button className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md font-medium bg-blue-600 text-white shadow text-xs">
              {currentPage}
            </button>
          </div>

          {/* Show pagination on larger screens */}
          <div className="hidden sm:flex">
            {totalPages <= 3 ? (
              // Show all pages if total pages are 5 or less
              [...Array(totalPages)].map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md font-medium transition text-xs md:text-sm ${
                      page === currentPage
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-white text-gray-600 border hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              })
            ) : (
              // Show limited pages with ellipsis for many pages
              <>
                {currentPage > 2 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md font-medium bg-white text-gray-600 border hover:bg-gray-100 transition text-xs md:text-sm"
                    >
                      1
                    </button>
                    {currentPage > 3 && (
                      <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-500 text-xs md:text-sm">
                        ...
                      </span>
                    )}
                  </>
                )}
                
                {currentPage > 1 && (
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md font-medium bg-white text-gray-600 border hover:bg-gray-100 transition text-xs md:text-sm"
                  >
                    {currentPage - 1}
                  </button>
                )}
                
                <button
                  className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md font-medium bg-blue-600 text-white shadow text-xs md:text-sm"
                >
                  {currentPage}
                </button>
                
                {currentPage < totalPages && (
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md font-medium bg-white text-gray-600 border hover:bg-gray-100 transition text-xs md:text-sm"
                  >
                    {currentPage + 1}
                  </button>
                )}
                
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && (
                      <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-500 text-xs md:text-sm">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md font-medium bg-white text-gray-600 border hover:bg-gray-100 transition text-xs md:text-sm"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-1 md:px-2 py-1 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-1 md:px-2 py-1 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}