// Mock data for orders
const mockOrders = [
    {
      id: 'o1',
      orderNumber: 'ORD-2025-001',
      supplierName: 'Tech Gear Supplies',
      supplierId: 's1',
      supplierEmail: 'contact@techgear.com',
      supplierPhone: '(555) 123-4567',
      status: 'delivered',
      orderDate: '2025-04-12T10:30:00Z',
      expectedDelivery: '2025-04-19T00:00:00Z',
      items: 8,
      subtotal: 1240.00,
      tax: 99.20,
      shipping: 35.00,
      totalAmount: 1374.20
    },
    {
      id: 'o2',
      orderNumber: 'ORD-2025-002',
      supplierName: 'Global Fabrics Inc',
      supplierId: 's2',
      supplierEmail: 'info@globalfabrics.com',
      supplierPhone: '(555) 987-6543',
      status: 'shipped',
      orderDate: '2025-04-28T14:15:00Z',
      expectedDelivery: '2025-05-12T00:00:00Z',
      items: 5,
      subtotal: 2750.00,
      tax: 220.00,
      shipping: 150.00,
      totalAmount: 3120.00
    },
    {
      id: 'o3',
      orderNumber: 'ORD-2025-003',
      supplierName: 'Office Supply Co',
      supplierId: 's3',
      supplierEmail: 'sales@officesupply.co',
      supplierPhone: '(555) 456-7890',
      status: 'pending',
      orderDate: '2025-05-03T09:45:00Z',
      expectedDelivery: '2025-05-15T00:00:00Z',
      items: 12,
      subtotal: 895.75,
      tax: 71.66,
      shipping: 25.00,
      totalAmount: 992.41
    },
    {
      id: 'o4',
      orderNumber: 'ORD-2025-004',
      supplierName: 'FreshFood Distributors',
      supplierId: 's4',
      supplierEmail: 'orders@freshfood.com',
      supplierPhone: '(555) 234-5678',
      status: 'cancelled',
      orderDate: '2025-04-25T16:20:00Z',
      expectedDelivery: '2025-04-30T00:00:00Z',
      items: 3,
      subtotal: 450.00,
      tax: 36.00,
      shipping: 15.00,
      totalAmount: 501.00
    },
    {
      id: 'o5',
      orderNumber: 'ORD-2025-005',
      supplierName: 'Tech Gear Supplies',
      supplierId: 's1',
      supplierEmail: 'contact@techgear.com',
      supplierPhone: '(555) 123-4567',
      status: 'pending',
      orderDate: '2025-05-06T11:05:00Z',
      expectedDelivery: '2025-05-13T00:00:00Z',
      items: 6,
      subtotal: 1875.50,
      tax: 150.04,
      shipping: 35.00,
      totalAmount: 2060.54
    }
  ];
  
  // Detailed order items
  const mockOrderItems = {
    'o1': [
      { id: 'i1', name: 'Laptop Dock Station', quantity: 3, unitPrice: 120.00 },
      { id: 'i2', name: 'Wireless Keyboard', quantity: 5, unitPrice: 45.00 },
      { id: 'i3', name: 'USB-C Cables (3m)', quantity: 10, unitPrice: 12.00 },
      { id: 'i4', name: 'Portable SSD 1TB', quantity: 2, unitPrice: 250.00 },
      { id: 'i5', name: 'Wireless Mouse', quantity: 5, unitPrice: 35.00 }
    ],
    'o2': [
      { id: 'i6', name: 'Premium Cotton Fabric', quantity: 150, unitPrice: 8.50 },
      { id: 'i7', name: 'Nylon Thread Spools', quantity: 50, unitPrice: 3.00 },
      { id: 'i8', name: 'Industrial Zippers', quantity: 200, unitPrice: 1.25 }
    ],
    'o3': [
      { id: 'i9', name: 'Copy Paper (Reams)', quantity: 50, unitPrice: 4.99 },
      { id: 'i10', name: 'Ballpoint Pens (Box)', quantity: 20, unitPrice: 8.50 },
      { id: 'i11', name: 'Desk Organizers', quantity: 10, unitPrice: 22.95 },
      { id: 'i12', name: 'File Folders (Pack)', quantity: 25, unitPrice: 12.75 }
    ],
    'o4': [
      { id: 'i13', name: 'Organic Apples (Case)', quantity: 5, unitPrice: 45.00 },
      { id: 'i14', name: 'Bottled Water (24-pack)', quantity: 10, unitPrice: 15.00 }
    ],
    'o5': [
      { id: 'i15', name: 'Wireless Headphones', quantity: 5, unitPrice: 89.99 },
      { id: 'i16', name: 'Power Banks', quantity: 12, unitPrice: 35.95 },
      { id: 'i17', name: 'HDMI Cables (2m)', quantity: 20, unitPrice: 8.99 },
      { id: 'i18', name: 'Smartphone Screen Protectors', quantity: 50, unitPrice: 5.99 }
    ]
  };
  
  // Dashboard statistics
  const dashboardStats = {
    totalOrders: 148,
    newOrdersToday: 3,
    totalRevenue: 187450,
    revenueGrowth: 12.5,
    activeSuppliers: 28,
    inactiveSuppliers: 5,
    pendingOrders: 12,
    delayedOrders: 2,
    recentActivity: [
      { type: 'order', message: 'Order #ORD-2025-005 created', time: '10 minutes ago' },
      { type: 'supplier', message: 'Premium Parts Ltd registered as supplier', time: '2 hours ago' },
      { type: 'order', message: 'Order #ORD-2025-002 status changed to shipped', time: '3 hours ago' },
      { type: 'alert', message: 'Low inventory alert: Wireless Headphones', time: '5 hours ago' },
      { type: 'order', message: 'Order #ORD-2025-004 cancelled', time: '1 day ago' }
    ]
  };
  
  // Simulating API delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Get all orders with basic info
   * @returns {Promise<Array>} Array of order objects
   */
  export const getOrders = async () => {
    await delay(600); // Simulate network delay
    return [...mockOrders];
  };
  
  /**
   * Get detailed order information by ID
   * @param {string} id Order ID
   * @returns {Promise<Object>} Detailed order object
   */
  export const getOrderDetails = async (id) => {
    await delay(500);
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    
    // Add items to order details
    return {
      ...order,
      items: mockOrderItems[id] || []
    };
  };
  
  /**
   * Update order status
   * @param {string} id Order ID
   * @param {string} status New status
   * @returns {Promise<Object>} Updated order object
   */
  export const updateOrderStatus = async (id, status) => {
    await delay(400);
    const orderIndex = mockOrders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    // Update status
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status
    };
    
    return mockOrders[orderIndex];
  };
  
  /**
   * Create new order
   * @param {Object} orderData Order data
   * @returns {Promise<Object>} Created order object
   */
  export const createOrder = async (orderData) => {
    await delay(800);
    const newOrder = {
      id: `o${mockOrders.length + 1}`,
      orderNumber: `ORD-2025-${String(mockOrders.length + 1).padStart(3, '0')}`,
      orderDate: new Date().toISOString(),
      ...orderData
    };
    
    // In a real app, this would be an API POST request
    mockOrders.push(newOrder);
    
    // Create associated items
    if (orderData.items && orderData.items.length > 0) {
      mockOrderItems[newOrder.id] = orderData.items;
    }
    
    return newOrder;
  };
  
  /**
   * Get dashboard statistics
   * @returns {Promise<Object>} Dashboard statistics
   */
  export const getDashboardStats = async () => {
    await delay(700);
    return { ...dashboardStats };
  };