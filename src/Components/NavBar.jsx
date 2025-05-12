import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Package,
  Menu,
  UserCircle,
  Settings,
  CreditCard,
  IndianRupee,
  PercentDiamondIcon,
  ListOrderedIcon,
  LogOut
} from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { path: '/suppliers', icon: <Users className="w-5 h-5" />, label: 'Suppliers' },
    { path: '/orders', icon: <Package className="w-5 h-5" />, label: 'Orders' },
  ];

  return (
    <header className="fixed bottom-0 w-full bg-white shadow-md border-t border-gray-200 z-50">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map(item => (
          <Link
            to={item.path}
            key={item.path}
            className={`flex flex-col items-center justify-center px-2 py-1 text-xs transition-all ${location.pathname === item.path
                ? 'text-blue-600 font-semibold'
                : 'text-gray-500 hover:text-blue-500'
              }`}
          >
            {item.icon}
            <span className="mt-0.5">{item.label}</span>
          </Link>
        ))}

        {/* More Menu */}
        <button
          className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          onClick={toggleMenu}
        >
          <Menu className="w-5 h-5" />
          <span className="text-xs mt-0.5">More</span>
        </button>
      </div>

      {/* Slide-up Menu */}
      {menuOpen && (
        <div className="absolute bottom-16 right-4 w-40 bg-white border border-gray-200 rounded-lg shadow-lg animate-slide-up z-50">
          <div className="flex flex-col divide-y divide-gray-100">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <UserCircle className="w-4 h-4" /> Profile
            </Link>
           
            <Link
              to="/customCard"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <CreditCard className="w-4 h-4" /> Customer Card
            </Link>
            <Link
              to="/insight"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <PercentDiamondIcon className="w-4 h-4" /> Sales Insight
            </Link>
            <Link
              to="/bill"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <IndianRupee className="w-4 h-4" /> Generate Bill
            </Link>
            <Link
              to="/home"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <ListOrderedIcon className="w-4 h-4" /> Offers
            </Link>
            <Link
              to="/inventory"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <ListOrderedIcon className="w-4 h-4" /> inventory
            </Link>
            <Link
              to="/permission"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <Settings className="w-4 h-4" /> Terms & Conditions
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              <Settings className="w-4 h-4" /> Settings
            </Link>
            <button
              className="flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              onClick={() => alert('Logging out...')}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
