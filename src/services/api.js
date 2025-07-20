import axios from 'axios';

const API_BASE = 'http://localhost:8080';

// 创建 axios 实例
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// 获取所有衣物
export const getAllClothes = async (sortBy = 'last_seen', sortAsc = false) => {
  try {
    const response = await api.get('/clothes', {
      params: {
        sort_by: sortBy,
        sort_asc: sortAsc,
      }
    });
    return response.data;
  } catch (error) {
    console.error('获取衣物列表失败:', error);
    throw error;
  }
};

// 添加新衣物
export const addCloth = async (formData) => {
  try {
    const response = await api.post('/clothes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('添加衣物失败:', error);
    throw error;
  }
};

// 获取单个衣物详情
export const getClothById = async (id) => {
  try {
    const response = await api.get(`/clothes/${id}`);
    return response.data;
  } catch (error) {
    console.error('获取衣物详情失败:', error);
    throw error;
  }
};

// 更新衣物出现次数
export const updateClothCount = async (id) => {
  try {
    const response = await api.put(`/clothes/${id}/count`);
    return response.data;
  } catch (error) {
    console.error('更新衣物次数失败:', error);
    throw error;
  }
};