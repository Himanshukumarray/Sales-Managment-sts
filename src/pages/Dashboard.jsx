import React, { useState, useEffect } from 'react';
import {
  LineChart, BarChart, PieChart, Pie, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer, Cell
} from 'recharts';
import {
  ShoppingCart, TrendingUp, Package, AlertCircle, Calendar,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('month');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setTimeout(() => {
          const data = getMockDashboardData(timeframe);
          setStats(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeframe]);

  const getMockDashboardData = (timeframe) => ({
    totalOrders: 1458,
    newOrdersToday: 24,
    totalRevenue: 895600,
    revenueGrowth: 12.5,
    activeSuppliers: 48,
    inactiveSuppliers: 7,
    pendingOrders: 38,
    delayedOrders: 5,
    revenueChart: generateSampleRevenueData(timeframe),
    orderStatusChart: generateSampleOrderStatusData(timeframe),
    topSuppliers: generateSampleSupplierData(),
    recentActivity: [
      { type: 'order', message: 'New order #ORD-7895 received from Tech Solutions Inc.', time: '10 minutes ago' },
      { type: 'supplier', message: 'Global Supplies updated their inventory catalog.', time: '2 hours ago' },
      { type: 'alert', message: 'Order #ORD-7831 is marked as delayed.', time: '4 hours ago' },
      { type: 'order', message: 'Order #ORD-7890 has been completed and delivered.', time: '5 hours ago' },
      { type: 'supplier', message: 'New supplier "Quality Products" has been approved.', time: 'Yesterday' },
    ]
  });

  const generateSampleRevenueData = (timeframe) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentWeek = Math.ceil((new Date().getDate() - 1) / 7);

    const data = months.map((month, index) => {
      const base = 10000 + index * 2000;
      const variation = Math.random() * 5000 - 2500;
      const revenue = Math.max(base + variation, 5000);
      const orders = Math.floor(revenue / 500);
      return {
        name: month,
        revenue: revenue,
        orders: orders,
        current: index === currentMonth
      };
    });

    // Filter data based on the timeframe
    if (timeframe === 'week') {
      // For week, generate data for the current week (6 data points)
      return data.slice(currentWeek - 1, currentWeek);
    } else if (timeframe === 'year') {
      return data; // Show all months for the year
    } else {
      return data.slice(currentMonth - 1, currentMonth + 1); // Show data for the current month
    }
  };

  const generateSampleOrderStatusData = (timeframe) => {
    const statuses = [
      { name: 'Completed', value: 1415 },
      { name: 'Pending', value: 38 },
      { name: 'Delayed', value: 5 }
    ];

    // Adjust order status data based on the timeframe
    if (timeframe === 'week') {
      // For week, maybe have a fluctuating status (you can adjust this based on your requirements)
      statuses.forEach(status => status.value = Math.floor(Math.random() * 50) + 10); // Randomize for the week
    } else if (timeframe === 'year') {
      // For year, maintain steady values
      statuses.forEach(status => status.value = Math.floor(Math.random() * 100) + 50); // Randomize for the year
    }

    return statuses;
  };

  const generateSampleSupplierData = () => [
    { name: 'Tech Solutions Inc.', performance: 92, orders: 145 },
    { name: 'Global Supplies', performance: 88, orders: 110 },
    { name: 'Quality Products', performance: 76, orders: 89 },
    { name: 'Fast Delivery Co.', performance: 95, orders: 78 },
    { name: 'Budget Materials', performance: 70, orders: 65 }
  ];

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
  }).format(amount);

  const COLORS = ['#4ade80', '#facc15', '#f87171'];

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    alert(`Navigating to: ${path}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard bg-gray-50 pb-16 min-h-screen">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="bg-white rounded-lg shadow p-1 flex">
            {['week', 'month', 'year'].map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-sm rounded-md ${timeframe === tf ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
              >
                {tf.charAt(0).toUpperCase() + tf.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Orders */}
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart size={20} className="text-blue-600" />}
            subtitle={`+${stats.newOrdersToday} today`}
            subtitleColor="green"
          />
          {/* Revenue */}
          <StatCard
            title="Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={<TrendingUp size={20} className="text-green-600" />}
            subtitle={`${stats.revenueGrowth}% this month`}
            subtitleColor="green"
          />
          {/* Active Suppliers */}
          <StatCard
            title="Active Suppliers"
            value={stats.activeSuppliers}
            icon={<Package size={20} className="text-purple-600" />}
            subtitle={`${stats.inactiveSuppliers} inactive`}
            subtitleColor="gray"
          />
          {/* Pending Orders */}
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={<AlertCircle size={20} className="text-orange-600" />}
            subtitle={`${stats.delayedOrders} delayed`}
            subtitleColor="orange"
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-bold">Revenue Trends</h2>
              <Calendar size={16} className="text-gray-400" />
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={stats.revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
                  <Line type="monotone" dataKey="orders" stroke="#10b981" name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-bold">Order Status</h2>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.orderStatusChart}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={entry => `${entry.name} (${entry.value})`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {stats.orderStatusChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
          <div>
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className={`w-2.5 h-2.5 rounded-full ${activity.type === 'order' ? 'bg-green-500' : 'bg-blue-500'}`} />
                <p className="ml-2 text-sm text-gray-600">{activity.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, subtitle, subtitleColor }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    <div className="flex-shrink-0">{icon}</div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xl font-bold text-gray-800">{value}</p>
      {subtitle && (
        <p className={`text-sm text-${subtitleColor}-600`}>{subtitle}</p>
      )}
    </div>
  </div>
);

export default Dashboard;
