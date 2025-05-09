import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Upload, Download, ArrowUpCircle, FileText, PieChart, TrendingUp, Users, DollarSign, ShoppingBag } from 'lucide-react';
import * as XLSX from 'xlsx';

// Custom Card component using Tailwind
const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// Custom Card Content component
const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

// Custom Button component
const Button = ({ children, className, onClick }) => {
  return (
    <button 
      className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const initialData = [
  { month: 'Jan', sales: 4000000, target: 4500000, orders: 320, customers: 150, region: 'Mumbai', topProduct: 'Electronics', returns: 5, profit: 1200000, avgOrderValue: 12500, customerRetention: 78 },
  { month: 'Feb', sales: 3000000, target: 3500000, orders: 280, customers: 130, region: 'Delhi', topProduct: 'Apparel', returns: 8, profit: 900000, avgOrderValue: 10714, customerRetention: 70 },
  { month: 'Mar', sales: 5200000, target: 4000000, orders: 410, customers: 200, region: 'Bangalore', topProduct: 'Electronics', returns: 6, profit: 1500000, avgOrderValue: 12683, customerRetention: 82 },
  { month: 'Apr', sales: 6000000, target: 5000000, orders: 450, customers: 220, region: 'Hyderabad', topProduct: 'Furniture', returns: 10, profit: 1800000, avgOrderValue: 13333, customerRetention: 85 },
  { month: 'May', sales: 7200000, target: 6500000, orders: 500, customers: 250, region: 'Kolkata', topProduct: 'Electronics', returns: 4, profit: 2100000, avgOrderValue: 14400, customerRetention: 88 }
];

const SalesInsightPage = () => {
  const [data, setData] = useState(initialData);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Animation on load
    setIsLoaded(true);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Handle JSON files
          if (file.name.endsWith('.json')) {
            const content = e.target.result;
            const parsedData = JSON.parse(content);
            setData(parsedData);
          } 
          // Handle Excel/CSV files
          else if (file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const parsedData = XLSX.utils.sheet_to_json(firstSheet);
            setData(parsedData);
          }
        } catch (error) {
          console.error("Error parsing file:", error);
          alert("Error parsing file. Please check the format.");
        }
      };
      
      if (file.name.endsWith('.json')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "SalesInsightData.xlsx");
  };

  // Calculate summary statistics
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const topRegion = [...data].sort((a, b) => b.sales - a.sales)[0];
  const avgMonthlyTarget = data.reduce((sum, item) => sum + item.target, 0) / data.length;
  const avgOrderValue = data.reduce((sum, item) => sum + item.avgOrderValue, 0) / data.length;
  const avgCustomerRetention = data.reduce((sum, item) => sum + item.customerRetention, 0) / data.length;
  const avgReturns = data.reduce((sum, item) => sum + item.returns, 0) / data.length;

  const cardData = [
    { label: 'Total Sales', value: `₹ ${(totalSales / 1000000).toFixed(1)}M`, bgColor: 'bg-blue-600', icon: <DollarSign className="text-white" size={24} /> },
    { label: 'Top Region', value: `${topRegion.region}`, bgColor: 'bg-purple-600', icon: <TrendingUp className="text-white" size={24} /> },
    { label: 'Monthly Target', value: `₹ ${(avgMonthlyTarget / 1000000).toFixed(1)}M`, bgColor: 'bg-green-600', icon: <ArrowUpCircle className="text-white" size={24} /> },
    { label: 'Avg. Order Value', value: `₹ ${avgOrderValue.toFixed(0)}`, bgColor: 'bg-yellow-600', icon: <ShoppingBag className="text-white" size={24} /> },
    { label: 'Customer Retention', value: `${avgCustomerRetention.toFixed(0)}%`, bgColor: 'bg-teal-600', icon: <Users className="text-white" size={24} /> },
    { label: 'Returns', value: `${avgReturns.toFixed(1)}%`, bgColor: 'bg-red-600', icon: <PieChart className="text-white" size={24} /> }
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-2xl font-bold mb-6 text-black-500 flex items-center">
          <FileText size={32} className="mr-2 text-blue-700" />
          Sales Insight Dashboard 
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Card className={`${card.bgColor} text-white cursor-pointer hover:bg-opacity-90 hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{card.label}</h2>
                  {card.icon}
                </div>
                <p className="text-xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className={`transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
        <Card className="bg-white mb-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Sales vs Target Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹ ${(value/1000000).toFixed(2)}M`} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={2} name="Sales" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="target" stroke="#14B8A6" strokeWidth={2} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className={`transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
        <Card className="bg-white mb-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Upload Sales Data (Excel/CSV/JSON)</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors duration-300">
                <Upload size={20} className="mr-2" />
                <span>Choose File</span>
                <input type="file" accept=".csv, .json, .xlsx" onChange={handleFileUpload} className="hidden" />
              </label>
              <span className="text-gray-500 text-sm">Supported formats: .xlsx, .csv, .json</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={`transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
        <Card className="bg-white mb-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Regional Performance Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip formatter={(value) => `₹ ${(value/1000000).toFixed(2)}M`} />
                <Bar dataKey="sales" fill="#6366F1" name="Sales" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className={`mt-8 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:translate-y-px"
          onClick={downloadExcel}
        >
          <Download size={18} />
          <span>Download Sales Data (Excel)</span>
        </Button>
      </div>
    </div>
  );
};

export default SalesInsightPage;