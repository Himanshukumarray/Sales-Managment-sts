import React, { useState } from "react";
import { dummyData } from "./item.js";

export default function CreateOffer() {
    const [category, setCategory] = useState("FMCG");
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState(null); // "discount" or "free"
    const [discountValue, setDiscountValue] = useState(0);
    const [offerName, setOfferName] = useState("");
    const [offerDate, setOfferDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ['FMCG', 'Furniture', 'Grocery', 'Electronics', 'Fashion'];

    // Filter by category and search query
    const filtered = dummyData.filter((item) => 
        item.category === category && 
        (searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const toggle = (id) => {
        setSelectedIds((ids) =>
            ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
        );
    };

    const toggleAll = () => {
        if (selectedIds.length === filtered.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filtered.map(item => item.id));
        }
    };

    const openModal = () => {
        if (selectedIds.length === 0) {
            return;
        }
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
        setMode(null);
        setDiscountValue(0);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
    
        setTimeout(() => {
            const offerData = {
                name: offerName,
                type: mode,
                value: mode === 'discount' ? discountValue : null,
                validUntil: offerDate,
                products: selectedIds,
                category: category
            };
    
            // 🔥 Save to localStorage
            const existingOffers = JSON.parse(localStorage.getItem("offers") || "[]");
            const updatedOffers = [...existingOffers, offerData];
            localStorage.setItem("offers", JSON.stringify(updatedOffers));
    
            // Reset
            setIsSubmitting(false);
            setSelectedIds([]);
            setOfferName("");
            setOfferDate("");
            setDiscountValue(0);
            closeModal();
            alert("Offer created successfully!");
        }, 800);
    };
    

    const selectedItemsCount = selectedIds.length;
    const totalItemsCount = filtered.length;
    const isAllSelected = selectedItemsCount === totalItemsCount && totalItemsCount > 0;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-800">
                    Create Offer
                </h2>

                {/* Offer Name Input */}
                <div className="mb-6">
                    <label htmlFor="offerName" className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Name
                    </label>
                    <input
                        type="text"
                        id="offerName"
                        value={offerName}
                        onChange={(e) => setOfferName(e.target.value)}
                        placeholder="Summer Sale, Diwali Special, etc."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Valid Until Date */}
                <div className="mb-6">
                    <label htmlFor="offerDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Valid Until
                    </label>
                    <input
                        type="date"
                        id="offerDate"
                        value={offerDate}
                        onChange={(e) => setOfferDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Category Tabs - Scrollable for mobile */}
                <div className="mb-6 overflow-x-auto pb-2">
                    <div className="flex space-x-2 min-w-max">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setCategory(cat);
                                    setSelectedIds([]);
                                }}
                                className={`px-4 py-2 rounded-full font-medium text-sm transition duration-200
                                    ${category === cat
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Select All Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search items..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={toggleAll}
                                disabled={totalItemsCount === 0}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Select All</span>
                        </label>
                        <span className="text-sm text-gray-500">
                            ({selectedItemsCount}/{totalItemsCount})
                        </span>
                    </div>
                </div>

                {/* Product List */}
                <div className="border border-gray-200 rounded-xl p-2 sm:p-4 max-h-80 overflow-y-auto mb-6">
                    {filtered.length > 0 ? (
                        filtered.map((item) => (
                            <label
                                key={item.id}
                                className="flex items-center justify-between p-3 mb-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            >
                                <div className="flex items-center flex-1 min-w-0">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => toggle(item.id)}
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500">ID: {item.id}</p>
                                    </div>
                                </div>
                                <span className="text-gray-600 font-semibold ml-2">₹{item.price}</span>
                            </label>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13h.01M12 18v-5"></path>
                            </svg>
                            <p className="text-gray-500">
                                {searchQuery ? "No matching items found" : `No items in ${category}`}
                            </p>
                        </div>
                    )}
                </div>

                {/* Selected Count & Action Button */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-600 mb-3 sm:mb-0">
                        {selectedItemsCount > 0 
                            ? `${selectedItemsCount} item${selectedItemsCount > 1 ? 's' : ''} selected` 
                            : "Select items to create an offer"}
                    </p>
                    <button
                        onClick={openModal}
                        disabled={selectedIds.length === 0 || !offerName.trim()}
                        className={`px-6 py-3 text-white font-bold rounded-full shadow-md transition w-full sm:w-auto
                            ${selectedIds.length === 0 || !offerName.trim() 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-green-500 hover:bg-green-600 hover:shadow-lg'}`}
                    >
                        Create Offer
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in">
                        {!mode && (
                            <>
                                <div className="text-center mb-6">
                                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                        Choose Offer Type
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Creating offer: <span className="font-semibold">{offerName}</span> for {selectedIds.length} products
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <button
                                        onClick={() => setMode('discount')}
                                        className="flex flex-col items-center p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all"
                                    >
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-800">Discount</span>
                                        <span className="text-xs text-gray-500 mt-1">Apply percentage discount</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => setMode('free')}
                                        className="flex flex-col items-center p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-all"
                                    >
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-800">Free Item</span>
                                        <span className="text-xs text-gray-500 mt-1">Buy one get one free</span>
                                    </button>
                                </div>
                                
                                <div className="flex justify-center">
                                    <button
                                        onClick={closeModal}
                                        className="px-5 py-2 text-gray-500 font-medium hover:bg-gray-100 rounded-lg transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}

                        {mode === 'discount' && (
                            <>
                                <div className="mb-6 text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-1 text-gray-800">
                                        Apply Discount
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Enter the discount percentage for "{offerName}"
                                    </p>
                                </div>
                                
                                <div className="mb-6">
                                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                                        Discount Percentage (%)
                                    </label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            id="discount"
                                            value={discountValue}
                                            onChange={(e) => setDiscountValue(Math.min(100, Math.max(0, e.target.value)))}
                                            min="0"
                                            max="100"
                                            className="block w-full pl-4 pr-12 py-3 text-lg font-medium border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="0"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <span className="text-gray-500 sm:text-lg">%</span>
                                        </div>
                                    </div>
                                    
                                    {/* Preset buttons */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {[5, 10, 15, 20, 25, 50].map(value => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() => setDiscountValue(value)}
                                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-full transition"
                                            >
                                                {value}%
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || discountValue <= 0}
                                        className={`px-4 py-2 text-white rounded-lg transition flex items-center
                                            ${isSubmitting 
                                                ? 'bg-blue-400 cursor-not-allowed' 
                                                : discountValue <= 0
                                                    ? 'bg-blue-300 cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </>
                                        ) : 'Create Offer'}
                                    </button>
                                </div>
                            </>
                        )}

                        {mode === 'free' && (
                            <>
                                <div className="mb-6 text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-1 text-gray-800">
                                        Free Item Offer
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        Create a "Buy One Get One Free" offer for "{offerName}"
                                    </p>
                                </div>
                                
                                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h4 className="text-sm font-medium text-purple-800">Free Item Details</h4>
                                            <p className="mt-1 text-sm text-purple-700">
                                                Customers will receive one free item of the same type for each item purchased.
                                                This offer will apply to {selectedIds.length} selected products.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className={`px-4 py-2 text-white rounded-lg transition flex items-center
                                            ${isSubmitting 
                                                ? 'bg-purple-400 cursor-not-allowed' 
                                                : 'bg-purple-600 hover:bg-purple-700'}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </>  
                                        ) : 'Create Offer'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}