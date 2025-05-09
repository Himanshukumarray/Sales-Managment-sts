import React, { useState } from 'react';
import {
    Search, Plus, Edit, Trash2, AlertCircle,
    Package, RefreshCw, ShoppingCart, ChevronDown, X
} from 'lucide-react';
import _ from 'lodash';
const inventoryData = [
    {
        id: 1, name: 'Laptop', type: 'Electronics', sku: 'ELE123', quantity: 10, price: 800, cost: 650, supplier: 'Croma',
        expiryDate: null, location: 'Godown A', lastUpdated: '2025-05-01', status: 'In Stock', description: 'Gaming Laptop with RTX 4070',
        imagePath: '/api/placeholder/200/150', barcodeNumber: '123456789012', minStockLevel: 5
    },
    {
        id: 2, name: 'Milk', type: 'Groceries', sku: 'GRO456', quantity: 4, price: 1.5, cost: 0.9, supplier: 'Amul',
        expiryDate: '2025-06-01', location: 'Cold Storage', lastUpdated: '2025-05-03', status: 'Low Stock', description: 'Full Cream Milk 1 Liter',
        imagePath: '/api/placeholder/200/150', barcodeNumber: '456789012345', minStockLevel: 10
    },
    {
        id: 3, name: 'T-Shirt', type: 'Clothing', sku: 'CLO789', quantity: 45, price: 19.99, cost: 8.50, supplier: 'Biba',
        expiryDate: null, location: 'Godown B', lastUpdated: '2025-05-02', status: 'In Stock', description: 'Cotton T-Shirt Size M',
        imagePath: '/api/placeholder/200/150', barcodeNumber: '789012345678', minStockLevel: 15
    },
    {
        id: 4, name: 'Coffee Beans', type: 'Groceries', sku: 'GRO789', quantity: 8, price: 12.99, cost: 7.25, supplier: 'Blue Tokai',
        expiryDate: '2025-09-15', location: 'Dry Storage', lastUpdated: '2025-04-28', status: 'In Stock', description: 'Premium Arabica Coffee Beans 500g',
        imagePath: '/api/placeholder/200/150', barcodeNumber: '901234567890', minStockLevel: 10
    },
    {
        id: 5, name: 'Wireless Mouse', type: 'Electronics', sku: 'ELE456', quantity: 2, price: 29.99, cost: 15.00, supplier: 'Intex',
        expiryDate: null, location: 'Godown A', lastUpdated: '2025-05-04', status: 'Low Stock', description: 'Bluetooth Wireless Mouse',
        imagePath: '/api/placeholder/200/150', barcodeNumber: '234567890123', minStockLevel: 8
    }
];

const categories = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Stationery', label: 'Stationery' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Household', label: 'Household' },
    { value: 'Sports', label: 'Sports' }
];



const suppliers = [
    { value: 'Croma', label: 'Croma' },
    { value: 'Amul', label: 'Amul' },
    { value: 'Biba', label: 'Biba' },
    { value: 'Blue Tokai', label: 'Blue Tokai' },
    { value: 'Intex', label: 'Intex' }
];

// Custom Select component using Tailwind
const CustomSelect = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(option => option.value === value);

    return (
        <div className="relative">
            <button
                type="button"
                className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1">
                        <li
                            className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onChange('');
                                setIsOpen(false);
                            }}
                        >
                            All
                        </li>
                        {options.map(option => (
                            <li
                                key={option.value}
                                className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${value === option.value ? 'bg-blue-50 text-blue-600' : ''}`}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// Custom Switch component
const CustomSwitch = ({ checked, onChange, id, label }) => {
    return (
        <div className="flex items-center">
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={() => onChange(!checked)}
                    className="opacity-0 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                    htmlFor={id}
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                    <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${checked ? 'translate-x-4' : 'translate-x-0'}`}
                    ></span>
                </label>
            </div>
            <label htmlFor={id} className="text-sm">{label}</label>
        </div>
    );
};

// Dialog component using Tailwind
const Dialog = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-xl z-50 w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-medium text-lg">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
                {footer && (
                    <div className="p-4 border-t flex justify-end gap-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};




const InventoryManagement = () => {
    const [inventory, setInventory] = useState(inventoryData);
    const [activeTab, setActiveTab] = useState('list');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showLowStockOnly, setShowLowStockOnly] = useState(false);


    const emptyFormData = {
        name: '',
        type: '',
        sku: '',
        quantity: '',
        price: '',
        cost: '',
        supplier: '',
        expiryDate: '',
        description: '',
        minStockLevel: '',
        barcode: '',
        status: 'In Stock',
    };


    const [formData, setFormData] = useState(emptyFormData);
    const [newItems, setNewItems] = useState([emptyFormData]);

    const [filters, setFilters] = useState({
        searchTerm: '',
        type: '',
        supplier: '',

        status: ''
    });

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;

        if (index !== null) {
            // Updating a dynamic item
            setNewItems((prevItems) => {
                const updatedItems = [...prevItems];

                if (!updatedItems[index]) {
                    return prevItems;
                }

                updatedItems[index] = {
                    ...updatedItems[index],
                    [name]: value,
                };
                return updatedItems;
            });
        } else {
            // Updating the main form
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };



    const handleSelectChange = (field, value, index = null) => {
        if (index !== null) {
            // Updating a new item
            const updatedNewItems = [...newItems];
            updatedNewItems[index] = {
                ...updatedNewItems[index],
                [field]: value
            };
            setNewItems(updatedNewItems);
        } else {
            // Updating the main item
            setFormData({
                ...formData,
                [field]: value
            });
        }
    };


    const handleAddNewItem = () => {
        setNewItems((prevItems) => [
            ...prevItems,
            {
                name: "",
                price: "",
                quantity: "",
                sku: "",
                cost: "",
                type: ""
            }
        ]);
    };


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilterSelectChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...newItems];
        updatedItems.splice(index, 1);
        setNewItems(updatedItems); // Assuming setNewItems is the function to update the state
    };

    const resetFilters = () => {
        setFilters({
            searchTerm: '',
            type: '',
            supplier: '',

            status: ''
        });
        setShowLowStockOnly(false);
    };

    const handleSubmit = () => {
        const newItem = {
            ...formData,
            id: Math.max(0, ...inventory.map(item => item.id)) + 1, // Generate a unique ID
            lastUpdated: new Date().toISOString().split('T')[0],
            status: parseInt(formData.quantity) < parseInt(formData.minStockLevel) ? 'Low Stock' : 'In Stock'
        };

        // If in edit mode, update the item
        if (editMode && selectedItem) {
            const updatedInventory = inventory.map(item =>
                item.id === selectedItem.id
                    ? { ...item, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
                    : item
            );

            setInventory(updatedInventory);
            setEditMode(false);
        } else {
            // Add the new main form item
            const updatedInventory = [...inventory, newItem];

            // Add dynamic items if present
            const newItemsWithIds = newItems.map((item, index) => ({
                ...item,
                id: Math.max(...updatedInventory.map(i => i.id)) + index + 1,
                lastUpdated: new Date().toISOString().split('T')[0],
                status: parseInt(item.quantity) < parseInt(item.minStockLevel) ? 'Low Stock' : 'In Stock'
            }));

            setInventory([...updatedInventory, ...newItemsWithIds]);
        }

        // Clear the form data and dynamic items
        setFormData({
            name: '',
            type: '',
            sku: '',
            quantity: '',
            price: '',
            cost: '',
            supplier: '',
            expiryDate: '',
            description: '',
            barcodeNumber: '',
            minStockLevel: ''
        });

        setNewItems([]); // Clear dynamic items
        setActiveTab('list'); // Switch to the list view
    };




    const handleEdit = (item) => {
        setSelectedItem(item);
        setFormData({
            name: item.name,
            type: item.type,
            sku: item.sku,
            quantity: item.quantity.toString(),
            price: item.price.toString(),
            cost: item.cost.toString(),
            supplier: item.supplier,
            expiryDate: item.expiryDate || '',

            description: item.description,
            minStockLevel: item.minStockLevel.toString(),
            barcode: item.barcodeNumber,
            status: item.status
        });
        setEditMode(true);
        setActiveTab('add');
    };



    const handleDelete = (item) => {
        setInventory(inventory.filter(invItem => invItem.id !== item.id));
        setShowDeleteDialog(false);
        setItemToDelete(null);
    };

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchesType = !filters.type || item.type === filters.type;
        const matchesSupplier = !filters.supplier || item.supplier === filters.supplier;

        const matchesStatus = !filters.status || item.status === filters.status;
        const matchesLowStock = !showLowStockOnly || item.status === 'Low Stock';

        return matchesSearch && matchesType && matchesSupplier && matchesStatus && matchesLowStock;
    });

    // Calculate summary statistics
    const totalItems = inventory.length;
    const totalValue = _.sumBy(inventory, item => Number(item.quantity) * Number(item.price)).toFixed(2);
    const totalCost = _.sumBy(inventory, item => Number(item.quantity) * Number(item.cost)).toFixed(2);
    const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
    const potentialProfit = (totalValue - totalCost).toFixed(2);


    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-4">
                <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventory Management</h1>
                        <p className="text-gray-500">Manage your stock efficiently</p>
                    </div>

                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Items</p>
                                <h3 className="text-lg sm:text-2xl font-bold">{totalItems}</h3>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Package className="text-blue-500" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Value</p>
                                <h3 className="text-2xl font-bold">₹ {totalValue}</h3>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                                <ShoppingCart className="text-green-500" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Potential Profit</p>
                                <h3 className="text-2xl font-bold">₹ {potentialProfit}</h3>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-full">
                                <ShoppingCart className="text-purple-500" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Low Stock Items</p>
                                <h3 className="text-2xl font-bold">{lowStockItems}</h3>
                            </div>
                            <div className="bg-red-100 p-2 rounded-full">
                                <AlertCircle className="text-red-500" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <div className="flex flex-wrap -mb-px gap-2 justify-center md:justify-start">
                            <button className={`p-2 border-b-2 rounded-t-lg ${activeTab === 'list' ? 'border-blue-500 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => setActiveTab('list')}>Inventory List</button>
                            <button className={`p - 2 border-b-2 rounded-t-lg ${activeTab === 'add' ? 'border-blue-500 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => setActiveTab('add')}>{editMode ? 'Edit Item' : 'Add Item'}</button>
                        </div>
                    </div>
                </div>

                {/* List Tab Content */}
                {
                    activeTab === 'list' && (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <h2 className="text-xl font-bold">Inventory Items</h2>
                                    <div className="flex items-center gap-2">
                                        <CustomSwitch
                                            id="lowStockFilter"
                                            checked={showLowStockOnly}
                                            onChange={setShowLowStockOnly}
                                            label="Low Stock Only"
                                        />
                                        <button
                                            className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                                            onClick={resetFilters}
                                        >
                                            <RefreshCw size={14} />
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                                    <div className="md:col-span-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                            <input
                                                type="text"
                                                placeholder="Search by name, SKU or description"
                                                name="searchTerm"
                                                value={filters.searchTerm}
                                                onChange={handleFilterChange}
                                                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <CustomSelect
                                            options={categories}
                                            value={filters.type}
                                            onChange={(value) => handleFilterSelectChange('type', value)}
                                            placeholder="Category"
                                        />
                                    </div>

                                    <div>
                                        <CustomSelect
                                            options={suppliers}
                                            value={filters.supplier}
                                            onChange={(value) => handleFilterSelectChange('supplier', value)}
                                            placeholder="Supplier"
                                        />
                                    </div>


                                </div>

                                {/* Table */}
                                <div className="border rounded-md overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredInventory.length > 0 ? (
                                                filteredInventory.map(item => (
                                                    <tr key={item.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">

                                                                <div>
                                                                    <p className="font-medium text-sm">{item.name}</p>
                                                                    <p className="text-xs text-gray-500">{item.supplier}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.type}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.sku}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span className={parseInt(item.quantity) < parseInt(item.minStockLevel) ? 'text-red-500 font-medium' : ''}>
                                                                {item.quantity}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.price}</td>

                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'Low Stock'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-green-100 text-green-800'
                                                                }`}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                                                    title="Edit"
                                                                    onClick={() => handleEdit(item)}
                                                                >
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button
                                                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                                                    title="Delete"
                                                                    onClick={() => handleDelete(item)}
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>


                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="px-6 py-16 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <Package className="h-12 w-12 text-gray-300 mb-2" />
                                                            <h3 className="font-medium text-lg text-gray-900">No items found</h3>
                                                            <p className="text-gray-500">Try adjusting your filters or add new inventory</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Showing {filteredInventory.length} of {inventory.length} items
                                </div>

                            </div>
                        </div>
                    )
                }

                {/* Add/Edit Tab Content */}
                {
                    activeTab === 'add' && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Item' : 'Add Item'}</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                            Type
                                        </label>
                                        <CustomSelect
                                            options={categories}
                                            value={formData.type}
                                            onChange={(value) => handleSelectChange('type', value)}
                                            placeholder="Select Type"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                                            SKU
                                        </label>
                                        <input
                                            type="text"
                                            id="sku"
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required
                                            readOnly={editMode}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
                                            Cost
                                        </label>
                                        <input
                                            type="number"
                                            id="cost"
                                            name="cost"
                                            value={formData.cost}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2"
                                    onClick={handleAddNewItem}
                                >
                                    <Plus size={16} /> Add New Item
                                </button>

                                {newItems.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                            <input
                                                type="text"
                                                name="name"
                                                value={item.name}
                                                onChange={(e) => handleChange(e, index)}
                                                className="p-2 border border-gray-300 rounded-md w-full"
                                                placeholder="Product Name"
                                            />
                                            <input
                                                type="text"
                                                name="price"
                                                value={item.price}
                                                onChange={(e) => handleChange(e, index)}
                                                className="p-2 border border-gray-300 rounded-md w-full"
                                                placeholder="Price"
                                            />
                                            <input
                                                type="text"
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleChange(e, index)}
                                                className="p-2 border border-gray-300 rounded-md w-full"
                                                placeholder="Quantity"
                                            />
                                            <input
                                                type="text"
                                                name="sku"
                                                value={item.sku}
                                                onChange={(e) => handleChange(e, index)}
                                                className="p-2 border border-gray-300 rounded-md w-full"
                                                placeholder="SKU"
                                            />
                                            <input
                                                type="text"
                                                name="cost"
                                                value={item.cost}
                                                onChange={(e) => handleChange(e, index)}
                                                className="p-2 border border-gray-300 rounded-md w-full"
                                                placeholder="Cost"
                                            />
                                            <div className="w-full">
                                                <label htmlFor={`type-${index}`} className="block text-sm font-medium text-gray-700">
                                                    Type
                                                </label>
                                                <CustomSelect
                                                    options={categories}
                                                    value={item.type}
                                                    onChange={(value) => handleSelectChange('type', value, index)}
                                                    placeholder="Select Type"
                                                    instanceId={`type-${index}`}
                                                />
                                            </div>
                                            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-end">
                                                <button
                                                    onClick={() => handleRemoveItem(index)}
                                                    className="text-red-500 hover:text-red-700 mt-2"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData(emptyFormData);
                                            setEditMode(false);
                                            setActiveTab('list');
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        {editMode ? 'Update Item' : 'Add Item'}
                                    </button>
                                </div>
                            </div>

                            <Dialog
                                isOpen={showDeleteDialog}
                                onClose={() => setShowDeleteDialog(false)}
                                title="Delete Item"
                            >
                                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowDeleteDialog(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Dialog>
                        </div>
                    )
                }
            </div>
        </div>)
};
export default InventoryManagement;