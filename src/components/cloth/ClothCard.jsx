import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaCalendarAlt, FaTshirt } from 'react-icons/fa';

export default function ClothCard({ cloth }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {cloth.image_path && (
        <div className="h-48 overflow-hidden">
          <img 
            src={`/uploads/${cloth.image_path}`} 
            alt={cloth.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{cloth.name}</h3>
        
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-gray-50 p-2 rounded flex items-center">
            <FaTshirt className="text-indigo-600 mr-1" />
            <div>
              <p className="text-xs text-gray-500">出现次数</p>
              <p className="font-medium">{cloth.count}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-2 rounded flex items-center">
            <FaClock className="text-indigo-600 mr-1" />
            <div>
              <p className="text-xs text-gray-500">距今</p>
              <p className="font-medium">{cloth.days_ago} 天</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-2 rounded flex items-center">
            <FaCalendarAlt className="text-indigo-600 mr-1" />
            <div>
              <p className="text-xs text-gray-500">最近出现</p>
              <p className="font-medium text-sm">{new Date(cloth.last_seen).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Link 
            to={`/clothes/${cloth.id}`}
            className="inline-block w-full text-center py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
          >
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
}