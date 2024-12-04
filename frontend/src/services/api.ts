import axios from 'axios';
import { Company } from '../types/company';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const companyService = {
  uploadCompanies: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<Company[]>('/upload/', formData);
    return response.data;
  },

  getCompanies: async (page = 1, limit = 10) => {
    const response = await api.get<Company[]>(`/companies/?skip=${(page - 1) * limit}&limit=${limit}`);
    return response.data;
  },
};