import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Componenets/Home';
import AddOrder from './Componenets/AddOrder';
import ViewOrder from './Componenets/ViewOrder';
import FileUpload from './Componenets/FileUpload';

const App = () => {
  // Check if "exceldata" exists in local storage
  const isExcelDataPresent = !!localStorage.getItem('excelData');

  return (
    <div>
      <Routes>
        {/* Redirect to Home if exceldata is in local storage, otherwise FileUpload */}
        <Route path="/" element={isExcelDataPresent ? <Home /> : <FileUpload />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addorder" element={<AddOrder />} />
        <Route path="/vieworder" element={<ViewOrder />} />
        {/* Redirect any unknown path to "/" */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
