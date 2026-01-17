import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.jsx';

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [stats, setStats] = useState({ total: 0, owners: 0, admins: 0, users: 0 });

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (roleFilter !== 'all') params.role = roleFilter;
      
      const response = await axios.get('/users', { params });
      setUsers(response.data.users);
      
      // Statistikani hisoblash
      const allUsers = response.data.users;
      setStats({
        total: allUsers.length,
        owners: allUsers.filter(u => u.role === 'owner').length,
        admins: allUsers.filter(u => u.role === 'admin').length,
        users: allUsers.filter(u => u.role === 'user').length
      });
    } catch (error) {
      console.error('Foydalanuvchilarni olishda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users/admin', formData);
      setShowCreateModal(false);
      setFormData({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Admin yaratishda xatolik:', error);
      alert('Admin yaratishda xatolik yuz berdi');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`/users/${userId}/role`, { role: newRole });
      fetchUsers();
      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Rol o\'zgartirishda xatolik:', error);
      alert('Rol o\'zgartirishda xatolik yuz berdi');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Foydalanuvchini o\'chirmoqchimisiz? Bu amal orqaga qaytarilmaydi.')) return;

    try {
      await axios.delete(`/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Foydalanuvchini o\'chirishda xatolik:', error);
      alert('Foydalanuvchini o\'chirishda xatolik yuz berdi');
    }
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'owner': return 'Owner';
      case 'admin': return 'Admin';
      case 'user': return 'User';
      default: return role;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6 lg:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Foydalanuvchilar</h1>
                  <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">Barcha foydalanuvchilarni boshqarish</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="hidden sm:inline">Admin</span> qo'shish
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Jami</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">{stats.owners}</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">{stats.admins}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{stats.users}</p>
                <p className="text-xs text-gray-500">User</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 mb-4 sm:mb-6 p-3 sm:p-4 lg:p-5">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  roleFilter === 'all'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Barchasi
              </button>
              <button
                onClick={() => setRoleFilter('owner')}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  roleFilter === 'owner'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                Owner
              </button>
              <button
                onClick={() => setRoleFilter('admin')}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  roleFilter === 'admin'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setRoleFilter('user')}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  roleFilter === 'user'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                User
              </button>
            </div>
          </div>
        </div>

        {/* Users List - Card View */}
        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
                      user.role === 'owner' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                      user.role === 'admin' ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                      'bg-gradient-to-br from-green-500 to-emerald-600'
                    }`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        {user._id === currentUser._id && (
                          <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">Siz</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getRoleColor(user.role)}`}>
                    {getRoleText(user.role)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(user.createdAt).toLocaleDateString('uz-UZ')}
                  </div>
                </div>

                {user._id !== currentUser._id && (
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => openRoleModal(user)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Rol
                    </button>
                    {user.role !== 'owner' && (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                        }}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Foydalanuvchilar yo'q</h3>
            <p className="text-gray-500">Hozircha foydalanuvchilar mavjud emas.</p>
          </div>
        )}
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Yangi admin yaratish</h3>
                  <p className="text-sm text-gray-500">Admin huquqlari bilan foydalanuvchi</p>
                </div>
              </div>
              
              <form onSubmit={handleCreateAdmin}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ism</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="To'liq ism"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parol</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Yaratish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
                  selectedUser.role === 'owner' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                  selectedUser.role === 'admin' ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                  'bg-gradient-to-br from-green-500 to-emerald-600'
                }`}>
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">Rolni tanlang</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleRoleChange(selectedUser._id, 'user')}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedUser.role === 'user' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">User</p>
                      <p className="text-xs text-gray-500">Oddiy foydalanuvchi</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleRoleChange(selectedUser._id, 'admin')}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedUser.role === 'admin' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Admin</p>
                      <p className="text-xs text-gray-500">Tadbirlar va arizalarni boshqarishi mumkin</p>
                    </div>
                  </div>
                </button>
                
                {selectedUser._id !== currentUser._id && (
                  <button
                    onClick={() => handleRoleChange(selectedUser._id, 'owner')}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedUser.role === 'owner' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-700">Owner</p>
                        <p className="text-xs text-gray-500">To'liq huquqlar - foydalanuvchilarni boshqarish</p>
                      </div>
                    </div>
                  </button>
                )}
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                  }}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Foydalanuvchini o'chirish</h3>
                  <p className="text-sm text-gray-500">Bu amalni ortga qaytarib bo'lmaydi</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
                <p className="text-red-800">
                  <strong>{selectedUser.name}</strong> foydalanuvchisini o'chirmoqchimisiz?
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => {
                    handleDeleteUser(selectedUser._id);
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
