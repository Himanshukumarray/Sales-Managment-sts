// Mock data for suppliers
const mockSuppliers = [
    {
      id: 's1',
      name: 'Tech Gear Supplies',
      email: 'contact@techgear.com',
      phone: '(555) 123-4567',
      address: '123 Tech Lane, Silicon Valley, CA 94025',
      products: 42,
      status: 'active',
      paymentTerms: '30',
      categories: ['Electronics', 'Accessories']
    },
    {
      id: 's2',
      name: 'Global Fabrics Inc',
      email: 'info@globalfabrics.com',
      phone: '(555) 987-6543',
      address: '456 Textile Blvd, New York, NY 10001',
      products: 128,
      status: 'active',
      paymentTerms: '45',
      categories: ['Textiles', 'Raw Materials']
    },
    {
      id: 's3',
      name: 'Office Supply Co',
      email: 'sales@officesupply.co',
      phone: '(555) 456-7890',
      address: '789 Business Park, Chicago, IL 60601',
      products: 95,
      status: 'inactive',
      paymentTerms: '30',
      categories: ['Office Supplies', 'Furniture']
    },
    {
      id: 's4',
      name: 'FreshFood Distributors',
      email: 'orders@freshfood.com',
      phone: '(555) 234-5678',
      address: '101 Produce Lane, Portland, OR 97205',
      products: 73,
      status: 'active',
      paymentTerms: '15',
      categories: ['Food', 'Beverages']
    },
    {
      id: 's5',
      name: 'Premium Parts Ltd',
      email: 'contact@premiumparts.com',
      phone: '(555) 876-5432',
      address: '202 Manufacturing Dr, Detroit, MI 48201',
      products: 211,
      status: 'pending',
      paymentTerms: '60',
      categories: ['Automotive', 'Industrial']
    }
  ];
  
  // Simulating API delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Get all suppliers
   * @returns {Promise<Array>} Array of supplier objects
   */
  export const getSuppliersList = async () => {
    await delay(500); // Simulate network delay
    return [...mockSuppliers];
  };
  
  /**
   * Get supplier by ID
   * @param {string} id Supplier ID
   * @returns {Promise<Object>} Supplier object
   */
  export const getSupplierById = async (id) => {
    await delay(300);
    const supplier = mockSuppliers.find(s => s.id === id);
    if (!supplier) {
      throw new Error('Supplier not found');
    }
    return { ...supplier };
  };
  
  /**
   * Create new supplier
   * @param {Object} supplierData Supplier data
   * @returns {Promise<Object>} Created supplier object
   */
  export const createSupplier = async (supplierData) => {
    await delay(700);
    const newSupplier = {
      id: `s${mockSuppliers.length + 1}`, // Generate simple ID
      ...supplierData,
      products: 0 // New suppliers start with 0 products
    };
    
    // In a real app, this would be an API POST request
    mockSuppliers.push(newSupplier);
    return newSupplier;
  };
  
  /**
   * Update supplier
   * @param {string} id Supplier ID
   * @param {Object} supplierData Updated supplier data
   * @returns {Promise<Object>} Updated supplier object
   */
  export const updateSupplier = async (id, supplierData) => {
    await delay(600);
    const index = mockSuppliers.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Supplier not found');
    }
    
    // Update supplier
    const updatedSupplier = {
      ...mockSuppliers[index],
      ...supplierData,
      id // Ensure ID doesn't change
    };
    
    // In a real app, this would be an API PUT/PATCH request
    mockSuppliers[index] = updatedSupplier;
    return updatedSupplier;
  };
  
  /**
   * Delete supplier
   * @param {string} id Supplier ID
   * @returns {Promise<boolean>} Success status
   */
  export const deleteSupplier = async (id) => {
    await delay(500);
    const index = mockSuppliers.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Supplier not found');
    }
    
    // In a real app, this would be an API DELETE request
    mockSuppliers.splice(index, 1);
    return true;
  };