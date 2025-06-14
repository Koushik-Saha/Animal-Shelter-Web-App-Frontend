import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          
          const { token } = response.data;
          localStorage.setItem('auth_token', token);
          
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch(url, data, config),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
};

// Upload file helper
export const uploadFile = async (file: File, endpoint: string, onProgress?: (progressEvent: any) => void) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onProgress,
  });
};

// Download file helper
export const downloadFile = async (url: string, filename: string) => {
  const response = await api.get(url, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

// Error handling utilities
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      status,
      message: data.message || 'An error occurred',
      errors: data.errors || [],
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
      errors: [],
    };
  } else {
    // Something else happened
    return {
      status: 0,
      message: error.message || 'An unexpected error occurred',
      errors: [],
    };
  }
};

// Query key factories for React Query
export const queryKeys = {
  // Auth
  user: ['user'] as const,
  
  // Animals
  animals: ['animals'] as const,
  animal: (id: string) => ['animals', id] as const,
  animalSearch: (params: Record<string, any>) => ['animals', 'search', params] as const,
  
  // Adoptions
  adoptions: ['adoptions'] as const,
  adoption: (id: string) => ['adoptions', id] as const,
  adoptionApplications: ['adoption-applications'] as const,
  adoptionApplication: (id: string) => ['adoption-applications', id] as const,
  
  // Medical
  medicalRecords: ['medical-records'] as const,
  medicalRecord: (id: string) => ['medical-records', id] as const,
  animalMedicalRecords: (animalId: string) => ['animals', animalId, 'medical-records'] as const,
  
  // Volunteers
  volunteers: ['volunteers'] as const,
  volunteer: (id: string) => ['volunteers', id] as const,
  volunteerTasks: (volunteerId: string) => ['volunteers', volunteerId, 'tasks'] as const,
  
  // Tasks
  tasks: ['tasks'] as const,
  task: (id: string) => ['tasks', id] as const,
  
  // Donations
  donations: ['donations'] as const,
  donation: (id: string) => ['donations', id] as const,
  
  // Events
  events: ['events'] as const,
  event: (id: string) => ['events', id] as const,
  
  // Statistics
  stats: ['stats'] as const,
  dashboardStats: ['stats', 'dashboard'] as const,
};

// Cache invalidation helpers
export const invalidateQueries = (queryClient: any, queryKey: string[]) => {
  return queryClient.invalidateQueries({ queryKey });
};

export const removeFromCache = (queryClient: any, queryKey: string[]) => {
  return queryClient.removeQueries({ queryKey });
};

// Optimistic update helpers
export const updateQueryData = <T>(
  queryClient: any,
  queryKey: string[],
  updater: (oldData: T) => T
) => {
  return queryClient.setQueryData(queryKey, updater);
};

// Pagination helpers
export const createPaginationParams = (page: number, limit: number = 10) => ({
  page,
  limit,
  offset: (page - 1) * limit,
});

export const parsePaginationResponse = <T>(response: any) => {
  return {
    data: response.data.data as T[],
    pagination: response.data.pagination,
    total: response.data.pagination?.total || 0,
    hasMore: response.data.pagination?.hasNext || false,
  };
};

// WebSocket connection helper
export const createWebSocketConnection = (endpoint: string) => {
  const wsUrl = API_BASE_URL.replace('http', 'ws') + endpoint;
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  const ws = new WebSocket(`${wsUrl}?token=${token}`);
  
  ws.onopen = () => {
    console.log('WebSocket connected');
  };
  
  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
};

// Local storage helpers
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch {
      return localStorage.getItem(key);
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      localStorage.setItem(key, value);
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  
  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};