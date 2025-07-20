import React from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaPlus, FaChartBar } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          衣物追踪系统
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          记录衣物出现次数、最后出现时间和图片，帮助您追踪衣物使用情况
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<FaList className="h-12 w-12 mx-auto" />}
          title="衣物列表"
          description="查看所有衣物记录，按时间、天数或出现次数排序"
          linkText="查看衣物列表"
          linkTo="/clothes"
        />
        
        <FeatureCard 
          icon={<FaPlus className="h-12 w-12 mx-auto" />}
          title="添加衣物"
          description="添加新衣物或更新现有衣物的出现记录"
          linkText="添加新衣物"
          linkTo="/add-cloth"
        />
        
        <FeatureCard 
          icon={<FaChartBar className="h-12 w-12 mx-auto" />}
          title="数据分析"
          description="查看衣物使用统计和趋势分析（即将推出）"
          linkText="查看统计"
          disabled={true}
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, linkText, linkTo, disabled }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      
      {disabled ? (
        <button
          disabled
          className="inline-flex items-center text-gray-400 font-medium cursor-not-allowed"
        >
          {linkText}
        </button>
      ) : (
        <Link
          to={linkTo}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}