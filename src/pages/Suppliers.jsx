import React, { useState } from 'react';
import SupplierList from '../Components/SupplierList';
import SupplierForm from '../Components/SupplierForm';

const Suppliers = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddNew = () => {
    setSelectedSupplier(null);
    setShowForm(true);
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedSupplier(null);
    setRefreshKey(prev => prev + 1); // Trigger list refresh
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedSupplier(null);
  };

  return (
    <div className="pb-16">
      {showForm ? (
        <SupplierForm 
          supplier={selectedSupplier} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      ) : (
        <>
          <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center shadow-sm">
            <h1 className="text-xl font-bold">Suppliers</h1>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              + Add New
            </button>
          </div>
          
          <SupplierList 
            key={refreshKey}
            onSelectSupplier={handleSelectSupplier} 
          />
        </>
      )}
    </div>
  );
};

export default Suppliers;