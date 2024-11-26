import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FileViewer() {
  const navigate = useNavigate();

  const [excelData, setExcelData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      setExcelData(JSON.parse(storedData));
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem("excelData");
    localStorage.removeItem("orderdata");
    setExcelData(null);
    setSearchTerm("");
    setFileName("");
    navigate("/");
  };

  const filteredData = excelData
    ? excelData.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  return (
    <div className="wrapper px-4 py-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        {excelData && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 text-sm sm:text-base"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

        <h3 className="text-xl sm:text-3xl font-semibold text-gray-800 text-center flex-grow">
          ORDEREASE
        </h3>

        {excelData && (
          <button
            className="p-2 sm:p-3 bg-green-700 rounded-full text-white hover:bg-green-800 transition duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {excelData && isMenuOpen && (
        <div
          className={`fixed top-16 right-4 z-50 transition-transform duration-300 ease-in-out`}
        >
          <div className="bg-white shadow-lg p-4 rounded-lg w-48 sm:w-56">
            <div className="flex flex-col gap-4">
              <button
                className="bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-800 transition duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                onClick={() => navigate("/addorder")}
              >
                Add Order
              </button>
              <button
                className="bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-800 transition duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                onClick={() => navigate("/vieworder")}
              >
                View Order
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6 mb-4">
        <input
          type="text"
          placeholder="Search Data..."
          className="border rounded-lg px-4 py-2 sm:py-3 w-full max-w-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {fileName && (
        <p className="text-center text-sm sm:text-lg text-gray-700 mb-4">
          File Uploaded: {fileName}
        </p>
      )}

      {excelData && (
        <div className="overflow-x-auto mt-4">
          {filteredData.length > 0 ? (
            <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
              <thead className="bg-green-100 text-left text-xs sm:text-sm text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2 border-b">Facts Code</th>
                  <th className="px-4 py-2 border-b">Code</th>
                  <th className="px-4 py-2 border-b">Description</th>
                  <th className="px-4 py-2 border-b">CTN Qty</th>
                  <th className="px-4 py-2 border-b">MSP</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-gray-600">
                {filteredData.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {Object.keys(row).map((key, idx) => (
                      <td key={idx} className="px-4 py-2">
                        {key === "MSP" ? row[key].toFixed(2) : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600 mt-4">
              No data found matching your search criteria.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FileViewer;
