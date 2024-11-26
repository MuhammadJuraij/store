import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShopForm = () => {
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [excelData, setExcelData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      setExcelData(JSON.parse(storedData));
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredOptions([]);
      return;
    }

    if (excelData) {
      const filtered = excelData.filter((item) =>
        Object.values(item).some((v) =>
          v.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleSelectOption = (option) => {
    const selectedValue = Object.values(option).join(", ");
    setSearchTerm(selectedValue);
    setFilteredOptions([]);
    setItem(selectedValue);
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!item || !quantity) {
      alert("Please fill in both item name and quantity.");
      return;
    }

    const newItem = { itemName: item, quantity };
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setItem("");
    setQuantity("");
    setSearchTerm("");
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index) => {
    const itemToEdit = items[index];
    setItem(itemToEdit.itemName);
    setQuantity(itemToEdit.quantity);
    setEditIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shopName || items.length === 0) {
      alert("Please fill in the shop name and add at least one item.");
      return;
    }

    const storeData = {
      shopName,
      items,
    };

    const existingData = JSON.parse(localStorage.getItem("orderdata")) || [];
    localStorage.setItem("orderdata", JSON.stringify([...existingData, storeData]));

    alert("Store data saved successfully!");

    setShopName("");
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-white py-16">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Shop Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Shop Name</label>
            <input
              type="text"
              placeholder="Enter shop name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Search Item, Quantity, and Add Button in a Row */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Item */}
            <div className="w-full md:w-1/2 relative">
              <label className="block text-lg font-semibold text-gray-700">Search Item</label>
              <input
                type="text"
                placeholder="Search or select an item..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              {filteredOptions.length > 0 && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectOption(option)}
                    >
                      {Object.values(option).join(", ")}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="w-full md:w-1/4">
              <label className="block text-lg font-semibold text-gray-700">Quantity</label>
              <input
                type="text"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Add Item Button */}
            <div className="w-full md:w-1/4">
              <button
                type="button"
                onClick={handleAddItem}
                className="mt-7 px-6 py-2 w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transform transition-all"
              >
                {editIndex !== null ? "Save Item" : "Add Item +"}
              </button>
            </div>
          </div>
        </form>

        {/* Items Table */}
        {items.length > 0 && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 border-b">Item Name</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 border-b">Quantity</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-6 py-3 text-gray-700">{item.itemName}</td>
                    <td className="px-6 py-3 text-gray-700">{item.quantity}</td>
                    <td className="px-6 py-3 space-x-3">
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="text-red-600 hover:text-red-800 font-semibold transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-6 w-full px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transform transition-all"
        >
          Submit
        </button>

        {/* View Order Button */}
        <button
          onClick={() => navigate("/vieworder")}
          className="mt-6 px-6 py-2 w-full text-green-600 hover:text-green-800 font-semibold transition-all transform hover:scale-105"
        >
          View Order
        </button>
      </div>
    </div>
  );
};

export default ShopForm;
