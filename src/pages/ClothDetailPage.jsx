import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClothById, updateClothCount } from '../services/api';
import { FaArrowLeft, FaPlus, FaCalendarAlt, FaTshirt, FaClock } from 'react-icons/fa';

export default function ClothDetailPage() {
  const { id } = useParams();
  const [cloth, setCloth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchCloth = async () => {
      try {
        setLoading(true);
        const data = await getClothById(id);
        setCloth(data);
        setError(null);
      } catch (err) {
        setError('获取衣物详情失败');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCloth();
  }, [id]);

  const handleUpdateCount = async () => {
    try {
      setIsUpdating(true);
      const updatedCloth = await updateClothCount(id);
      setCloth(updatedCloth);
    } catch (err) {
      setError('更新次数失败');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
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
      <div className="mb-6">
        <Link to="/clothes" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
          <FaArrowLeft className="mr-2" /> 返回衣物列表
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {cloth.image_path && (
            <div className="md:w-1/2">
              <img 
                src={`/uploads/${cloth.image_path}`} 
                alt={cloth.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className={`p-6 ${cloth.image_path ? 'md:w-1/2' : 'w-full'}`}>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{cloth.name}</h1>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center text-gray-500 mb-1">
                  <FaTshirt className="mr-2" />
                  <span className="text-sm">出现次数</span>
                </div>
                <p className="text-xl font-semibold">{cloth.count}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center text-gray-500 mb-1">
                  <FaClock className="mr-2" />
                  <span className="text-sm">距今天数</span>
                </div>
                <p className="text-xl font-semibold">{cloth.days_ago}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md col-span-2">
                <div className="flex items-center text-gray-500 mb-1">
                  <FaCalendarAlt className="mr-2" />
                  <span className="text-sm">最近出现时间</span>
                </div>
                <p className="text-lg">{new Date(cloth.last_seen).toLocaleString()}</p>
              </div>
            </div>
            
            <button
              onClick={handleUpdateCount}
              disabled={isUpdating}
              className={`w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                isUpdating 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center`}
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  更新中...
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" />
                  记录一次出现
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}