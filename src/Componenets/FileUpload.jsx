import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function FileUpload() {
  const navigate = useNavigate();

  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [fileName, setFileName] = useState(""); // State to store file name

  // File upload handler
  const handleFile = (e) => {
    const allowedFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (allowedFileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        setExcelFile(selectedFile); // Store the file object
        setFileName(selectedFile.name); // Store the file name
      } else {
        setTypeError("Please select only Excel or CSV files.");
        setExcelFile(null);
        setFileName(""); // Clear file name on invalid file
      }
    }
  };

  // Submit Excel file for processing
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(excelFile);
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "buffer" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);

        // Store parsed data in localStorage
        localStorage.setItem("excelData", JSON.stringify(parsedData));

        // Redirect to the Home page after successful upload
        navigate("/home");
      };
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="wrapper px-4 py-6">
        <h3 className="text-2xl font-semibold text-center">Upload Excel Data!</h3>
        <form className="flex flex-col items-center justify-center" onSubmit={handleFileSubmit}>
          <label htmlFor="file-input" className="cursor-pointer">
            <img
              className="w-52 rounded-lg shadow-md"
              src="bdb6abe62ffe8ac78bff9ae3fb552b5e-removebg-preview.png"
              alt="Upload"
            />
          </label>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept=".xls,.xlsx,.csv"
            onChange={handleFile}
          />
          <button
            type="submit"
            className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Upload
          </button>
          {typeError && <p className="text-red-600 mt-2 text-sm">{typeError}</p>}
        </form>
        {fileName && <p className="text-center mt-2 text-gray-700">File Uploaded: {fileName}</p>}
      </div>
    </div>
  );
}

export default FileUpload;
