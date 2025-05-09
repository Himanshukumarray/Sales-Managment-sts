import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", orders: 7 },
  { name: "Feb", orders: 4 },
  { name: "Mar", orders: 2 },
  { name: "Apr", orders: 5 },
  { name: "May", orders: 7 },
  { name: "Jun", orders: 2 },
];

const ordersList = [
  { id: "1234", date: "May 6, 2025", items: 3, points: 15 },
  { id: "1235", date: "May 2, 2025", items: 5, points: 25 },
  { id: "1228", date: "Apr 28, 2025", items: 2, points: 10 },
  { id: "1224", date: "Apr 25, 2025", items: 4, points: 20 },
];

const getRank = (totalPoints) => {
  if (totalPoints >= 1000) return {
    name: (
      <span className="inline-block bg-gradient-to-r mt-3 from-blue-300 to-blue-500 text-blue-900 font-extrabold text-sm px-3 py-1 rounded-full shadow">
        Platinum
      </span>
    ),
    color: "text-blue-800"
  };

  if (totalPoints >= 500) return {
    name: (
      <span className="inline-block bg-gradient-to-r mt-3 from-yellow-200 to-yellow-400 text-yellow-900 font-bold text-sm px-3 py-1 rounded-full shadow">
        Gold
      </span>
    ),
    color: " text-yellow-800"
  };

  return {
    name: (
      <span className="inline-block bg-gradient-to-r  mt-3 from-orange-200 to-orange-400 text-orange-900 font-semibold text-sm px-3 py-1 rounded-full shadow">
        Bronze
      </span>
    ),
    color: " text-orange-800"
  };
};

const calculatePoints = (totalOrders) => {
  return totalOrders * 5;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
        <p className="text-sm">{`${payload[0].payload.name}: ${payload[0].value} orders`}</p>
      </div>
    );
  }
  return null;
};

// Modal Component
const RankModal = ({ isOpen, onClose, rank }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl transform transition-all duration-300"
        style={{
          animation: "modalFadeIn 0.3s ease-out forwards"
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Loyalty Rank System</h3>
          <button
            onClick={onClose}
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Bronze Rank */}
          <div className={`p-3 rounded-lg ${rank === "Bronze" ? "bg-orange-50 border-2 border-orange-200" : "bg-gray-50"}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="font-bold">Bronze</div>
                <div className="text-sm text-gray-600">0 - 499 points</div>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Basic loyalty benefits</li>
                <li>5% discount on selected items</li>
                <li>Birthday special offer</li>
              </ul>
            </div>
          </div>

          {/* Gold Rank */}
          <div className={`p-3 rounded-lg ${rank === "Gold" ? "bg-yellow-50 border-2 border-yellow-200" : "bg-gray-50"}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-bold">Gold</div>
                <div className="text-sm text-gray-600">500 - 999 points</div>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>All Bronze benefits</li>
                <li>10% discount on all purchases</li>
                <li>Priority customer service</li>
                <li>Free shipping on orders over $50</li>
              </ul>
            </div>
          </div>

          {/* Platinum Rank */}
          <div className={`p-3 rounded-lg ${rank === "Platinum" ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <div className="font-bold">Platinum</div>
                <div className="text-sm text-gray-600">1000+ points</div>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>All Gold benefits</li>
                <li>15% discount on all purchases</li>
                <li>Exclusive access to limited items</li>
                <li>Free shipping on all orders</li>
                <li>Personalized shopping experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomCardComponent = () => {
  const totalOrders = data.reduce((acc, item) => acc + item.orders, 0);
  const points = calculatePoints(totalOrders);
  const rank = getRank(points);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-2 sm:p-4 bg-pink-50 min-h-screen">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-5px) rotate(6deg); }
          100% { transform: translateY(0px) rotate(6deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mt-6 mb-4">
                Your card!
              </h2>
            </div>
          </div>
        </div>

        {/* Card Display with Rank Badge */}
        <div className="relative mb-6 h-44 sm:h-48 md:h-52 flex justify-center items-center">
          {/* Background Layer */}
          <div
            className="absolute top-8 w-10/15 sm:w-11/15 h-36 sm:h-40 md:h-44 bg-teal-500 rounded-xl shadow-lg z-10 animate-float"
          ></div>

          {/* Foreground Card */}
          <div
            className="absolute top-5 w-10/15 sm:w-11/15 h-36 sm:h-40 md:h-44 bg-red-500 rounded-xl shadow-xl z-20 transition-transform duration-300 transform hover:scale-105"
            style={{ animation: "fadeIn 0.5s ease-out forwards", animationDelay: "0.1s" }}
          >
            <div className="p-4 text-white">
              <div className="flex justify-between">
                <div>
                  <div className="text-xs opacity-80">Available Points</div>
                  <div className="text-2xl font-bold mb-2">{points}</div>
                </div>
                <div
                  className={`${rank.color} px-3 py-1 rounded-lg text-xs font-medium cursor-pointer hover:shadow-md transition-shadow animate-pulse`}
                  onClick={() => setModalOpen(true)}
                >
                  {rank.name}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                  <div className="text-xs opacity-80">****</div>
                  <div className="text-xs opacity-80">****</div>
                  <div className="text-xs opacity-80">****</div>
                  <div className="text-xs">34</div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <div className="mt-2 text-sm font-medium">Loyalty card</div>
            </div>
          </div>
        </div>


        {/* Orders Graph Section */}
        <div
          className="mb-6 animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">Orders</div>
            <div className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">View all</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-gray-400">Total: {totalOrders} orders</div>
              <div className="text-xs font-semibold text-blue-500">+26%</div>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={data}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide={true} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#00B7FF"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#00B7FF", stroke: "white", strokeWidth: 2 }}
                  dot={{ r: 3, fill: "#00B7FF", stroke: "white", strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Main Services with Updated SVGs */}
        <div
          className="mb-6 animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">Main Services</div>
            <div className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">View all</div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-green-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-transform hover:transform hover:scale-105 cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-200 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13h8m-8 0H4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 6l-4-4-4 4" />
                </svg>
              </div>
              <div className="text-xs text-center">Offers</div>
            </div>
            <div className="bg-red-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-transform hover:transform hover:scale-105 cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-200 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div className="text-xs text-center">Price</div>
            </div>
            <div
              className="bg-teal-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-transform hover:transform hover:scale-105 cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-200 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-xs text-center">Rank deals</div>
            </div>
          </div>
        </div>

        {/* Recent Orders List */}
        <div
          className="mb-6 animate-fadeIn"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">Recent Orders</div>
            <div className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">View all</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            {ordersList.map((order, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-3 ${index !== ordersList.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors cursor-pointer`}
              >
                <div>
                  <div className="font-medium text-sm">{order.id}</div>
                  <div className="text-xs text-gray-500">{order.date}</div>
                </div>
                <div className="flex items-center">
                  <div className="text-xs text-gray-500 mr-3">{order.items} items</div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                    +{order.points} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points to Next Rank */}
        <div
          className="mb-6 animate-fadeIn"
          style={{ animationDelay: "0.6s" }}
        >
          <div
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium text-sm">Points to next rank</div>
              {rank.name !== "Platinum" && (
                <div className="text-xs font-semibold text-blue-500">
                  {rank.name === "Bronze" ? `${500 - points} pts to Gold` : `${1000 - points} pts to Platinum`}
                </div>
              )}
              {rank.name === "Platinum" && (
                <div className="text-xs font-semibold text-blue-500">Highest rank achieved!</div>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${rank.name === "Bronze" ? "bg-orange-500" :
                  rank.name === "Gold" ? "bg-yellow-500" : "bg-blue-500"
                  } h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${rank.name === "Bronze" ? (points / 500) * 100 : rank.name === "Gold" ? ((points - 500) / 500) * 100 : 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Rank Info Modal */}
      <RankModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        rank={rank.name}
      />
    </div>
  );
};

export default CustomCardComponent;