import React, { useState, useEffect, useCallback } from 'react';
import { dummyData as productsData } from './item.js';

const MyOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);
  // Remove "isCreating" state as we no longer need it
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);

  // Default offers to seed on first load
  const defaultOffers = [
    {
      name: 'Welcome Discount',
      type: 'discount',
      value: 10,
      validUntil: '2025-12-31',
      products: [1, 2, 3]
    },
    {
      name: 'Freebie BOGO',
      type: 'free',
      value: null,
      validUntil: '2025-12-31',
      products: [4, 5]
    }
  ];

  // Function to load offers from localStorage and merge with product data
  const loadOffers = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem('offers') || '[]');
    const merged = stored.map((offer, index) => ({
      id: index + 1,
      name: offer.name,
      discount: offer.type === 'discount' ? offer.value : 100,
      products: offer.products
        .map(pid => productsData.find(p => p.id === pid))
        .filter(Boolean),
      validUntil: offer.validUntil,
      type: offer.type
    }));
    setOffers(merged);
  }, []);

  // Initialize and load on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('offers') || '[]');
    if (stored.length === 0) {
      localStorage.setItem('offers', JSON.stringify(defaultOffers));
    }
    loadOffers();
  }, [loadOffers]);

  // Reload when localStorage changes or window refocuses
  useEffect(() => {
    window.addEventListener('storage', loadOffers);
    window.addEventListener('focus', loadOffers);
    return () => {
      window.removeEventListener('storage', loadOffers);
      window.removeEventListener('focus', loadOffers);
    };
  }, [loadOffers]);

  const openModal = (offer) => {
    setCurrentOffer(offer);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOffer(null);
    setIsEditing(false);
  };

  const startEditing = () => {
    // Create a deep copy of the current offer to edit
    setEditedOffer({
      ...currentOffer,
      products: [...currentOffer.products], // Ensure we copy the products array
      validUntil: currentOffer.validUntil || new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle different input types appropriately
    if (name === 'discount') {
      // Ensure discount is a number
      const numValue = Number(value);
      setEditedOffer(prev => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue
      }));
    } else {
      // For other fields like name, validUntil, etc.
      setEditedOffer(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    // Ensure we have valid data
    const validDiscount = !isNaN(editedOffer.discount) ? editedOffer.discount : currentOffer.discount;
    const validName = editedOffer.name?.trim() || currentOffer.name;
    const validDate = editedOffer.validUntil || currentOffer.validUntil || new Date().toISOString().split('T')[0];
    
    // Create a clean edited object with valid data
    const cleanEditedOffer = {
      ...editedOffer,
      discount: validDiscount,
      name: validName,
      validUntil: validDate
    };
    
    // Update existing offer in the state
    const updatedOffers = offers.map(o =>
      o.id === cleanEditedOffer.id ? cleanEditedOffer : o
    );
    setOffers(updatedOffers);

    // Update in localStorage with appropriate properties
    const raw = JSON.parse(localStorage.getItem('offers') || '[]');
    if (raw[cleanEditedOffer.id - 1]) {
      raw[cleanEditedOffer.id - 1].value = cleanEditedOffer.discount;
      raw[cleanEditedOffer.id - 1].name = cleanEditedOffer.name;
      raw[cleanEditedOffer.id - 1].validUntil = cleanEditedOffer.validUntil;
      
      // Update products array if it was modified
      if (cleanEditedOffer.products && Array.isArray(cleanEditedOffer.products)) {
        raw[cleanEditedOffer.id - 1].products = cleanEditedOffer.products.map(p => p.id);
      }
      
      localStorage.setItem('offers', JSON.stringify(raw));
    }

    // Update the current viewed offer and exit edit mode
    setCurrentOffer(cleanEditedOffer);
    setIsEditing(false);
    
    // Optional: reload offers to ensure consistency
    loadOffers();
  };

  const openDeleteConfirmation = (offer, e) => {
    e.stopPropagation();
    setOfferToDelete(offer);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setOfferToDelete(null);
  };

  const confirmDelete = () => {
    // Delete from state
    const updatedOffers = offers.filter(o => o.id !== offerToDelete.id);
    setOffers(updatedOffers);

    // Delete from localStorage
    const raw = JSON.parse(localStorage.getItem('offers') || '[]');
    const updatedRaw = raw.filter((_, index) => index !== offerToDelete.id - 1);
    localStorage.setItem('offers', JSON.stringify(updatedRaw));

    // Close modals
    setIsDeleteModalOpen(false);
    if (currentOffer && currentOffer.id === offerToDelete.id) {
      closeModal();
    }
    
    // Reload to refresh IDs
    loadOffers();
  };

  // Remove openCreateModal function as we no longer need it

  const calculateDiscountedPrice = (price, discount) =>
    Math.round(price - (price * discount / 100));

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductSelection = (productId) => {
    const isProductSelected = editedOffer.products.some(p => p.id === productId);
    const product = productsData.find(p => p.id === productId);
    
    if (isProductSelected) {
      setEditedOffer(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== productId)
      }));
    } else if (product) {
      setEditedOffer(prev => ({
        ...prev,
        products: [...prev.products, product]
      }));
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Apply filtering and sorting
  const filteredOffers = offers.filter(offer => 
    offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'discount') {
      return sortDirection === 'asc'
        ? a.discount - b.discount
        : b.discount - a.discount;
    } else if (sortBy === 'products') {
      return sortDirection === 'asc'
        ? a.products.length - b.products.length
        : b.products.length - a.products.length;
    } else if (sortBy === 'validUntil') {
      return sortDirection === 'asc'
        ? new Date(a.validUntil) - new Date(b.validUntil)
        : new Date(b.validUntil) - new Date(a.validUntil);
    }
    return 0;
  });

  // Function to check if a date is valid
  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  // Function to format date for display
  const formatDate = (dateString) => {
    if (!dateString || !isValidDate(dateString)) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Function to get days remaining until expiry
  const getDaysRemaining = (validUntil) => {
    if (!validUntil || !isValidDate(validUntil)) return 0;
    
    const today = new Date();
    const expiryDate = new Date(validUntil);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">My Offers</h1>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search offers or products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort by:</span>
              <div className="flex space-x-1">
                <button 
                  onClick={() => toggleSort('name')}
                  className={`px-3 py-1 rounded ${sortBy === 'name' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button 
                  onClick={() => toggleSort('discount')}
                  className={`px-3 py-1 rounded ${sortBy === 'discount' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Discount {sortBy === 'discount' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button 
                  onClick={() => toggleSort('products')}
                  className={`px-3 py-1 rounded ${sortBy === 'products' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Products {sortBy === 'products' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedOffers.length > 0 ? (
            sortedOffers.map(offer => {
              const daysRemaining = getDaysRemaining(offer.validUntil);
              const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
              const isExpired = daysRemaining <= 0;
              
              return (
                <div
                  key={offer.id}
                  onClick={() => openModal(offer)}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 
                    ${isExpired ? 'border-red-500' : isExpiringSoon ? 'border-yellow-500' : 'border-blue-500'}`}
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{offer.name}</h3>
                    <button
                      onClick={(e) => openDeleteConfirmation(offer, e)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100 transition-colors"
                      title="Delete offer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold">{offer.discount}% OFF</span>
                    <span className="text-gray-500 text-sm">{offer.products.length} products</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {isExpired ? (
                      <span className="text-xs font-medium text-red-600">Expired</span>
                    ) : isExpiringSoon ? (
                      <span className="text-xs font-medium text-yellow-600">Expires in {daysRemaining} days</span>
                    ) : (
                      <span className="text-xs font-medium text-gray-500">Valid until {formatDate(offer.validUntil)}</span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full">
              <p className="text-center text-gray-600 py-16">
                {searchTerm ? 'No matching offers found.' : 'No offers available.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Details/Edit Modal */}
      {isModalOpen && currentOffer && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedOffer.name}
                  onChange={handleChange}
                  className="px-3 py-1 text-gray-800 rounded w-64"
                />
              ) : (
                <h2 className="text-xl font-bold">{currentOffer.name}</h2>
              )}
              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <div>
                      <span className="text-white mr-2">Discount:</span>
                      <input
                        type="number"
                        name="discount"
                        value={editedOffer.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="px-3 py-1 text-gray-800 rounded w-16"
                      />
                      <span className="text-white ml-1">%</span>
                    </div>
                    <div>
                      <span className="text-white mr-2">Valid until:</span>
                      <input
                        type="date"
                        name="validUntil"
                        value={editedOffer.validUntil}
                        onChange={handleChange}
                        className="px-3 py-1 text-gray-800 rounded"
                      />
                    </div>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedOffer(null);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-bold">{currentOffer.discount}% OFF</span>
                    <button
                      onClick={startEditing}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                  </>
                )}
                <button
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded ml-2"
                >
                  Close
                </button>
              </div>
            </div>
            
            {isEditing && (
              <div className="p-4 border-b">
                <h3 className="font-semibold mb-2">Products in this offer:</h3>
                <div className="flex flex-wrap gap-2">
                  {editedOffer.products.map(product => (
                    <span 
                      key={product.id}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                    >
                      {product.name}
                      <button 
                        onClick={() => handleProductSelection(product.id)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              {isEditing && (
                <div className="p-4 border-b">
                  <h3 className="font-semibold mb-2">Add products to this offer:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {productsData.filter(p => !editedOffer.products.some(ep => ep.id === p.id)).map(product => (
                      <div 
                        key={product.id}
                        onClick={() => handleProductSelection(product.id)}
                        className="p-2 border rounded hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                      >
                        <span>{product.name}</span>
                        <span className="text-gray-600">₹{product.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-right">Original Price</th>
                    <th className="py-3 px-4 text-right">Discounted Price</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOffer.products.length > 0 ? (
                    currentOffer.products.map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4 text-gray-600">{product.category}</td>
                        <td className="py-3 px-4 text-right">₹{product.price}</td>
                        <td className="py-3 px-4 text-right text-green-600 font-medium">
                          ₹{calculateDiscountedPrice(
                            product.price,
                            isEditing ? editedOffer.discount : currentOffer.discount
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-gray-500">
                        No products in this offer. Add some products to apply the discount.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && offerToDelete && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Delete Offer</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the offer "{offerToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOffers;