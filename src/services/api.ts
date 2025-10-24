import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// API Base URL - adjust based on your backend setup
const getBaseURL = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5001/api';
  } else if (Platform.OS === 'ios') {
    return 'http://localhost:5001/api'; // For iOS Simulator
  } else {
    return 'http://10.0.2.2:5001/api'; // For Android Emulator
  }
};

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: getBaseURL(),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('authToken');
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
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          await AsyncStorage.removeItem('authToken');
          // You might want to navigate to login screen here
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(userData: {
    username: string;
    email: string;
    password: string;
    experienceType: 'green' | 'thread';
    accountType: 'individual' | 'entity';
    interests: string[];
  }) {
    const response = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.api.post('/auth/login', credentials);
    if (response.data.token) {
      await AsyncStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  }

  async logout() {
    await AsyncStorage.removeItem('authToken');
    const response = await this.api.post('/auth/logout');
    return response.data;
  }

  // User endpoints
  async getProfile() {
    const response = await this.api.get('/users/profile');
    return response.data;
  }

  async updateProfile(profileData: any) {
    const response = await this.api.put('/users/profile', profileData);
    return response.data;
  }

  // Posts endpoints
  async getFeed(page = 1, limit = 20) {
    const response = await this.api.get(`/feed?page=${page}&limit=${limit}`);
    return response.data;
  }

  async createPost(postData: {
    content: {
      type: string;
      text?: string;
      media?: string[];
    };
    interestTags: string[];
    primaryInterest: string;
  }) {
    const response = await this.api.post('/posts', postData);
    return response.data;
  }

  async getPostById(postId: string) {
    const response = await this.api.get(`/posts/${postId}`);
    return response.data;
  }

  // Search endpoints
  async searchPosts(query: string, filters?: any) {
    const response = await this.api.get(`/search/posts`, {
      params: { q: query, ...filters }
    });
    return response.data;
  }

  async searchByInterest(interest: string, page = 1) {
    const response = await this.api.get(`/search/interest/${interest}`, {
      params: { page }
    });
    return response.data;
  }

  // Circles endpoints
  async getCircles() {
    const response = await this.api.get('/circles');
    return response.data;
  }

  async createCircle(circleData: { name: string; description: string }) {
    const response = await this.api.post('/circles', circleData);
    return response.data;
  }

  async joinCircle(circleId: string) {
    const response = await this.api.post(`/circles/${circleId}/join`);
    return response.data;
  }

  // Rooms endpoints
  async getRooms() {
    const response = await this.api.get('/rooms');
    return response.data;
  }

  async createRoom(roomData: { name: string; description: string; type: string }) {
    const response = await this.api.post('/rooms', roomData);
    return response.data;
  }

  // Verification endpoints
  async requestVerification(type: 'social' | 'paid' | 'application', data: any) {
    const response = await this.api.post('/verification/request', { type, data });
    return response.data;
  }

  // Health check
  async healthCheck() {
    try {
      const response = await axios.get(getBaseURL().replace('/api', '/health'));
      return response.data;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return null;
    }
  }
}

export default new ApiService(); 