import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClothCard from '../components/cloth/ClothCard';
import { getAllClothes } from '../services/api';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

export default function ClothListPage() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('last_seen');
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        const data = await getAllClothes(sortBy, sortAsc);
        setClothes(data);
        setError(null);
      } catch (err) {
        setError('加载衣物失败，请稍后重试');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClothes();
  }, [sortBy, sortAsc]);

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(newSortBy);
      setSortAsc(false);
    }
  };

  const getSortIcon = () => {
    return sortAsc ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">衣物列表</h1>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSortChange('last_seen')}
            className={`px-3 py-2 rounded-md flex items-center ${
              sortBy === 'last_seen' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            时间 {sortBy === 'last_seen' && getSortIcon()}
          </button>
          
          <button
            onClick={() => handleSortChange('days_ago')}
            className={`px-3 py-2 rounded-md flex items-center ${
              sortBy === 'days_ago' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            天数 {sortBy === 'days_ago' && getSortIcon()}
          </button>
          
          <button
            onClick={() => handleSortChange('count')}
            className={`px-3 py-2 rounded-md flex items-center ${
              sortBy === 'count' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            次数 {sortBy === 'count' && getSortIcon()}
          </button>
        </div>
      </div>
      
      {clothes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clothes.map(cloth => (
            <ClothCard key={cloth.id} cloth={cloth} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">暂无衣物记录</h3>
          <p className="mt-2 text-gray-500">您还没有添加任何衣物记录</p>
          <div className="mt-6">
            <Link
              to="/add-cloth"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              添加衣物
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}