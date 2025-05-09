import React, { useState, useEffect, useRef } from "react";
import { PlusCircle, FileText, Trash2, Save, Download, Search, Calendar,IndianRupee, DollarSign, User, Briefcase } from "lucide-react";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const initialBillState = {
  vendor: null,
  vendorName: "",
  customer: null,
  customerName: "",
  billDate: new Date().toISOString().split('T')[0],
  customerAddress: "",
  customerGstin: "",
  vendorAddress: "",
  vendorGstin: "",
  GSTBillItems: [
    { 
      description: "", 
      hsnSac: "", 
      quantity: "", 
      rate: "" 
    }
  ],
  totalAmount: 0,
  totalGST: 0,
  grandTotal: 0,
  totalQuantity: 0,
  paymentStatus: "Pending",
  gstRate: 18 // Default GST rate of 18%
};

const dummyBills = [
  {
    billNumber: 1,
    vendorName: "Saanvi tech solution",
    vendorAddress: "123 Vendor Street, City",
    vendorGstin: "29ABCDE1234F1Z5",
    customerName: "Customer A",
    customerAddress: "456 Customer Avenue, City",
    customerGstin: "29FGHIJ5678K1Z5",
    paymentStatus: "Pending",
    billDate: "2025-05-01",
    totalAmount: 1000,
    gstRate: 18,
    totalGST: 180,
    grandTotal: 1180,
    GSTBillItems: [
      { description: "Item A", hsnSac: "1234", quantity: 2, rate: 500 }
    ]
  },
  {
    billNumber: 2,
    vendorName: "Vendor B",
    vendorAddress: "789 Vendor Road, City",
    vendorGstin: "29LMNOP9012Q1Z5",
    customerName: "Customer B",
    customerAddress: "101 Customer Lane, City",
    customerGstin: "29RSTUV3456W1Z5",
    paymentStatus: "Paid",
    billDate: "2025-05-02",
    totalAmount: 1500,
    gstRate: 18,
    totalGST: 270,
    grandTotal: 1770,
    GSTBillItems: [
      { description: "Item B", hsnSac: "5678", quantity: 1, rate: 1500 }
    ]
  }
];

export default function App() {
  const [bills, setBills] = useState(dummyBills);
  const [bill, setBill] = useState(initialBillState);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const pdfRef = useRef(null);

  // Calculate total amount whenever bill items change
  useEffect(() => {
    const calculateTotals = () => {
      let totalAmt = 0;
      let totalQty = 0;
      
      bill.GSTBillItems.forEach(item => {
        if (item.quantity && item.rate) {
          const itemTotal = parseFloat(item.quantity) * parseFloat(item.rate);
          totalAmt += itemTotal;
          totalQty += parseFloat(item.quantity);
        }
      });
      
      const totalGST = totalAmt * (parseFloat(bill.gstRate || 18) / 100);
      const grandTotal = totalAmt + totalGST;
      
      setBill(prev => ({
        ...prev,
        totalAmount: totalAmt.toFixed(2),
        totalGST: totalGST.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
        totalQuantity: totalQty
      }));
    };
    
    calculateTotals();
  }, [bill.GSTBillItems, bill.gstRate]);

  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBill({ ...bill, [name]: value });
  };

  const addBillItem = () => {
    setBill({
      ...bill,
      GSTBillItems: [
        ...bill.GSTBillItems,
        { description: '', hsnSac: '', quantity: '', rate: '' }
      ],
    });
  };

  const removeBillItem = (index) => {
    const updatedItems = bill.GSTBillItems.filter((item, idx) => idx !== index);
    setBill({ ...bill, GSTBillItems: updatedItems });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...bill.GSTBillItems];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setBill({ ...bill, GSTBillItems: updatedItems });
  };

  const submitBill = () => {
    // Generate a new bill number
    const newBillNumber = bills.length > 0 ? Math.max(...bills.map(b => b.billNumber)) + 1 : 1;
    
    // Create the new bill
    const newBill = {
      ...bill,
      billNumber: newBillNumber,
    };
    
    // Add to bills list
    setBills([...bills, newBill]);
    
    // Reset bill state and hide form
    setBill(initialBillState);
    setIsFormVisible(false);
  };

  const removeBill = (billNumber) => {
    const updatedBills = bills.filter((b) => b.billNumber !== billNumber);
    setBills(updatedBills);
  };

  const generatePdf = (bill) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(`Invoice ${bill.billNumber}`, 105, 20, null, null, "center");
    
    // Add vendor and customer info
    doc.setFontSize(12);
    doc.text("Vendor:", 14, 40);
    doc.text(`${bill.vendorName}`, 14, 45);
    doc.text(`${bill.vendorAddress || ""}`, 14, 50);
    doc.text(`GSTIN: ${bill.vendorGstin || ""}`, 14, 55);
    
    doc.text("Customer:", 120, 40);
    doc.text(`${bill.customerName}`, 120, 45);
    doc.text(`${bill.customerAddress || ""}`, 120, 50);
    doc.text(`GSTIN: ${bill.customerGstin || ""}`, 120, 55);
    
    // Add invoice details
    doc.text(`Invoice Date: ${bill.billDate}`, 14, 70);
    doc.text(`Payment Status: ${bill.paymentStatus}`, 120, 70);
    
    // Manually create table for items
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    
    // Table header
    const startY = 80;
    const colWidth = [75, 30, 25, 30, 30];
    const headers = ["Description", "HSN/SAC", "Qty", "Rate ", "Amount"];
    
    // Draw header background
    doc.setFillColor(240, 240, 240);
    doc.rect(10, startY, 190, 10, "F");
    
    // Draw header text
    doc.setTextColor(0, 0, 0);
    let xPos = 10;
    for (let i = 0; i < headers.length; i++) {
      doc.text(headers[i], xPos + 2, startY + 7);
      xPos += colWidth[i];
    }
    
    // Table rows
    doc.setFont(undefined, 'normal');
    let yPos = startY + 10;
    
    // Draw rows
    bill.GSTBillItems.forEach((item, index) => {
      const itemQuantity = parseFloat(item.quantity) || 0;
      const itemRate = parseFloat(item.rate) || 0;
      const itemTotal = (itemQuantity * itemRate).toFixed(2);
      
      const rowData = [
        item.description || "-",
        item.hsnSac || "-",
        itemQuantity.toString(),
        itemRate.toFixed(2),
        itemTotal
      ];
      
      // Alternate row background
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setFillColor(248, 248, 248);
      }
      doc.rect(10, yPos, 190, 10, "F");
      
      // Draw row text
      xPos = 10;
      for (let i = 0; i < rowData.length; i++) {
        doc.text(rowData[i].toString(), xPos + 2, yPos + 7);
        xPos += colWidth[i];
      }
      
      yPos += 10;
    });
    
    // Draw borders
    doc.setDrawColor(0, 0, 0);
    doc.rect(10, startY, 190, yPos - startY, "S");
    
    // Add vertical lines
    xPos = 10;
    for (let i = 0; i < colWidth.length; i++) {
      xPos += colWidth[i];
      doc.line(xPos, startY, xPos, yPos);
    }
    
    // Add totals
    const finalY = yPos + 10;
    
    doc.text(`Subtotal: ${bill.totalAmount}`, 140, finalY);
    doc.text(`GST (${bill.gstRate}%): ${bill.totalGST}`, 140, finalY + 7);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Grand Total: Rs${bill.grandTotal}`, 140, finalY + 13);
    
    // Add footer
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text("Thank you for your business!", 105, finalY + 30, null, null, "center");
    
    // Save the PDF
    doc.save(`Invoice-${bill.billNumber}.pdf`);
  };

  const filteredBills = bills.filter(b => 
    b.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.billNumber.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Bill Management</h1>
        </div>

        {/* New Bill Button */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded flex items-center gap-2 transition-all"
          >
            {isFormVisible ? 'Hide Form' : (
              <>
                <PlusCircle size={20} />
                <span>Create New Bill</span>
              </>
            )}
          </button>
        </div>

        {/* Bill Form */}
        {isFormVisible && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-gray-800">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FileText size={24} className="text-gray-700" />
              New Bill Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Briefcase size={16} className="text-gray-500" /> Vendor Name
                </label>
                <input 
                  type="text" 
                  name="vendorName" 
                  value={bill.vendorName} 
                  onChange={handleBillChange} 
                  placeholder="Enter Vendor Name" 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <User size={16} className="text-gray-500" /> Customer Name
                </label>
                <input 
                  type="text" 
                  name="customerName" 
                  value={bill.customerName} 
                  onChange={handleBillChange} 
                  placeholder="Enter Customer Name" 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor Address
                </label>
                <input 
                  type="text" 
                  name="vendorAddress" 
                  value={bill.vendorAddress} 
                  onChange={handleBillChange} 
                  placeholder="Enter Vendor Address" 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Address
                </label>
                <input 
                  type="text" 
                  name="customerAddress" 
                  value={bill.customerAddress} 
                  onChange={handleBillChange} 
                  placeholder="Enter Customer Address" 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor GSTIN
                </label>
                <input 
                  type="text" 
                  name="vendorGstin" 
                  value={bill.vendorGstin} 
                  onChange={handleBillChange} 
                  placeholder="Enter Vendor GSTIN" 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer GSTIN
                </label>
                <input 
                  type="text" 
                  name="customerGstin" 
                  value={bill.customerGstin} 
                  onChange={handleBillChange} 
                  placeholder="Enter Customer GSTIN" 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Calendar size={16} className="text-gray-500" /> Date
                </label>
                <input 
                  type="date" 
                  name="billDate" 
                  value={bill.billDate} 
                  onChange={handleBillChange} 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <IndianRupee size={16} className="text-gray-500" /> Payment Status
                </label>
                <select 
                  name="paymentStatus" 
                  value={bill.paymentStatus} 
                  onChange={handleBillChange} 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Rate (%)
                </label>
                <select 
                  name="gstRate" 
                  value={bill.gstRate} 
                  onChange={handleBillChange} 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all"
                >
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
            </div>

            {/* Bill Items */}
            <div className="bg-gray-50 p-4 rounded mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Bill Items</h3>
              
              {bill.GSTBillItems.map((item, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-white rounded border border-gray-200"
                >
                  <input 
                    type="text" 
                    name="description" 
                    value={item.description} 
                    onChange={(e) => handleItemChange(e, index)} 
                    placeholder="Description" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                  />
                  <input 
                    type="text" 
                    name="hsnSac" 
                    value={item.hsnSac} 
                    onChange={(e) => handleItemChange(e, index)} 
                    placeholder="HSN/SAC" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                  />
                  <input 
                    type="number" 
                    name="quantity" 
                    value={item.quantity} 
                    onChange={(e) => handleItemChange(e, index)} 
                    placeholder="Quantity" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                  />
                  <input 
                    type="number" 
                    name="rate" 
                    value={item.rate} 
                    onChange={(e) => handleItemChange(e, index)} 
                    placeholder="Rate" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
                  />
                  
                  {bill.GSTBillItems.length > 1 && (
                    <button 
                      onClick={() => removeBillItem(index)} 
                      className="col-span-full flex items-center justify-center gap-1 text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={16} />
                      <span>Remove Item</span>
                    </button>
                  )}
                </div>
              ))}
              
              <div className="flex justify-between items-center mt-4">
                <button 
                  onClick={addBillItem} 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-1 transition-all"
                >
                  <PlusCircle size={16} />
                  <span>Add Item</span>
                </button>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Subtotal: ₹{bill.totalAmount}</div>
                  <div className="text-sm text-gray-600 mb-1">GST ({bill.gstRate}%): ₹{bill.totalGST}</div>
                  <div className="text-lg font-semibold text-gray-800">Grand Total: ₹{bill.grandTotal}</div>
                </div>
              </div>
            </div>

            <button 
              onClick={submitBill} 
              className="w-full bg-gray-800 hover:bg-black text-white px-6 py-3 rounded flex items-center justify-center gap-2 transition-all"
            >
              <Save size={20} />
              <span>Submit Bill</span>
            </button>
          </div>
        )}

        {/* Bill List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search bills by vendor, customer or bill number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all" 
            />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FileText size={24} className="text-gray-700" />
            Bill List
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBills.length > 0 ? (
              filteredBills.map((bill) => (
                <div 
                  key={bill.billNumber}
                  className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-semibold text-gray-800">Bill #{bill.billNumber}</div>
                    <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      bill.paymentStatus === "Paid" || bill.paymentStatus === "PAID"
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {bill.paymentStatus}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Briefcase size={16} className="text-gray-500" />
                      <span>{bill.vendorName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <User size={16} className="text-gray-500" />
                      <span>{bill.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} className="text-gray-500" />
                      <span>{bill.billDate}</span>
                    </div>
                  </div>
                  
                  <div className="mb-2 text-sm text-gray-600">
                    Subtotal: ₹{bill.totalAmount}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    GST ({bill.gstRate}%): ₹{bill.totalGST}
                  </div>
                  <div className="text-lg font-bold text-gray-800 mb-4">
                    Grand Total: ₹{bill.grandTotal}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => generatePdf(bill)}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded flex items-center justify-center gap-1 transition-all"
                    >
                      <Download size={16} />
                      <span>Download PDF</span>
                    </button>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
                    
                    <button 
                      onClick={() => removeBill(bill.billNumber)} 
                      className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded flex items-center justify-center gap-1 transition-all"
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No bills found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}