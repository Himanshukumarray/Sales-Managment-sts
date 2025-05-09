import React, { useState, useEffect } from 'react';
import { getSuppliersList } from '../api/SupplierApi';
import { Mail, PackageCheck, CircleCheck } from 'lucide-react'; // Lucide icons

const SupplierList = ({ onSelectSupplier }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliersList();
        setSuppliers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-4 text-center text-sm text-gray-500">Loading suppliers...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white z-10">
        <input
          type="text"
          placeholder="🔍 Search suppliers..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Supplier List */}
      {filteredSuppliers.length === 0 ? (
        <div className="text-center text-gray-400">No suppliers found</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSuppliers.map((supplier) => (
            <li
              key={supplier.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-4 cursor-pointer"
              onClick={() => onSelectSupplier(supplier)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{supplier.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Mail className="w-4 h-4 mr-1" />
                    <span>{supplier.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <PackageCheck className="w-4 h-4 mr-1" />
                    <span>{supplier.products} products</span>
                  </div>
                </div>

                <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap mt-1 ${
                  supplier.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  <CircleCheck className="inline w-3 h-3 mr-1" />
                  {supplier.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupplierList;
