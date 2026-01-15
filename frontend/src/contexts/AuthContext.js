import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios konfiguratsiyasi
axios.defaults.baseURL = API_BASE_URL;

// Auth context yaratish
const AuthContext = createContext();

// Auth state va actions
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
};

// Reducer funksiyasi
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
};

// AuthProvider komponenti
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Token ni localStorage ga saqlash
  useEffect(() => {
    if (state.token) {
      localStorage.setItem('token', state.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // User ma'lumotlarini olish
  const fetchUser = async () => {
    try {
      const response = await axios.get('/auth/me');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: state.token
        }
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'User ma\'lumotlarini olish xatolik'
      });
    }
  };

  // Dastlabki yuklash
  useEffect(() => {
    if (state.token) {
      fetchUser();
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Login funksiyasi
  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.post('/auth/login', { email, password });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Login xatolik'
      });
      throw error;
    }
  };

  // Logout funksiyasi
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Profilni yangilash
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/auth/profile', userData);
      dispatch({
        type: 'UPDATE_USER',
        payload: response.data.user
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Profilni yangilash xatolik'
      });
      throw error;
    }
  };

  // Parolni o'zgartirish
  const changePassword = async (passwordData) => {
    try {
      const response = await axios.put('/auth/password', passwordData);
      return response.data;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Parolni o\'zgartirish xatolik'
      });
      throw error;
    }
  };

  // Xatolikni tozalash
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
    changePassword,
    clearError,
    fetchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext dan foydalanish hooki
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
