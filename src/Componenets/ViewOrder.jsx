import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

  // Load data from local storage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orderdata")) || [];
    setOrders(storedOrders);
  }, []);

  // Function to export the table data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Orders List", 14, 20);

    // Prepare data for the table
    const tableData = [];
    orders.forEach((order) => {
      order.items.forEach((item, index) => {
        tableData.push([index === 0 ? order.shopName : "", item.itemName, item.quantity]);
      });
    });

    // Add table to PDF
    doc.autoTable({
      head: [["Shop Name", "Item Name", "Quantity"]],
      body: tableData,
      startY: 30,
    });

    // Save the PDF
    doc.save("orders.pdf");
  };

  // Function to reset data
  const resetOrders = () => {
    localStorage.removeItem("orderdata");
    setOrders([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">View Orders</h2>
      {orders.length > 0 ? (
        <>
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-r border-gray-200">Shop Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-r border-gray-200">Item Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <React.Fragment key={index}>
                  {order.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="border-t border-gray-200">
                      {itemIndex === 0 && (
                        <td rowSpan={order.items.length} className="py-3 px-4 text-center font-semibold text-gray-700 border-r border-gray-200">
                          {order.shopName}
                        </td>
                      )}
                      <td className="py-3 px-4 text-gray-700 border-r border-gray-200">{item.itemName}</td>
                      <td className="py-3 px-4 text-gray-700">{item.quantity}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-6">
            <button
              onClick={resetOrders}
              className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Reset Orders
            </button>
            <button
              onClick={exportToPDF}
              className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Export to PDF
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 mt-6">No orders found!</p>
      )}
    </div>
  );
};

export default ViewOrder;
