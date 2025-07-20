import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShirt } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-white text-xl font-bold">
            <FaShirt className="mr-2" />
            衣物追踪系统
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/clothes" 
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/clothes') 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              衣物列表
            </Link>
            <Link 
              to="/add-cloth" 
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/add-cloth') 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              添加衣物
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}