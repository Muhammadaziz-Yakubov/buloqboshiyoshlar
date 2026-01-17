import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: null
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/events?limit=50');
      setEvents(response.data.events);
    } catch (error) {
      console.error('Tadbirlarni olishda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (key !== 'image') {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.post('/events', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: null
      });
      fetchEvents();
    } catch (error) {
      console.error('Tadbir yaratishda xatolik:', error);
      console.log('Server javobi:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Tadbir yaratishda xatolik yuz berdi';
      alert(errorMessage);
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (key !== 'image') {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.put(`/events/${selectedEvent._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setShowEditModal(false);
      setSelectedEvent(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: null
      });
      fetchEvents();
    } catch (error) {
      console.error('Tadbir yangilashda xatolik:', error);
      const errorMessage = error.response?.data?.message || 'Tadbir yangilashda xatolik yuz berdi';
      alert(errorMessage);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Tadbirni o\'chirmoqchimisiz?')) return;

    try {
      await axios.delete(`/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Tadbir o\'chirishda xatolik:', error);
      const errorMessage = error.response?.data?.message || 'Tadbir o\'chirishda xatolik yuz berdi';
      alert(errorMessage);
    }
  };

  const handleToggleStatus = async (eventId, isActive) => {
    try {
      await axios.patch(`/events/${eventId}/status`, { isActive: !isActive });
      fetchEvents();
    } catch (error) {
      console.error('Status o\'zgartirishda xatolik:', error);
    }
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0],
      time: event.time,
      location: event.location,
      image: null
    });
    setShowEditModal(true);
  };

  // Ro'yxatdan o'tganlarni ko'rish
  const openRegistrationsModal = async (event) => {
    setSelectedEvent(event);
    setShowRegistrationsModal(true);
    setRegistrationsLoading(true);

    try {
      const response = await axios.get(`/event-registrations/event/${event._id}`);
      setRegistrations(response.data.registrations);
    } catch (error) {
      console.error('Ro\'yxatdan o\'tganlarni olishda xatolik:', error);
      setRegistrations([]);
    } finally {
      setRegistrationsLoading(false);
    }
  };

  const handleRegistrationStatus = async (regId, status) => {
    try {
      await axios.patch(`/event-registrations/${regId}/status`, { status });
      // Ro'yxatni yangilash
      if (selectedEvent) {
        const response = await axios.get(`/event-registrations/event/${selectedEvent._id}`);
        setRegistrations(response.data.registrations);
      }
    } catch (error) {
      console.error('Status o\'zgartirishda xatolik:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
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
          <div className="py-4 sm:py-6 lg:py-8 flex justify-between items-center gap-3">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Tadbirlar</h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block">Barcha tadbirlarni boshqarish</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="hidden sm:inline">Yangi</span> tadbir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-36 sm:h-44 lg:h-48 bg-gradient-to-br from-primary-400 to-purple-500">
                  {event.image ? (
                    <img
                      src={`https://buloqboshiyoshlar.onrender.com${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${event.isActive
                      ? 'bg-green-500/90 text-white'
                      : 'bg-gray-500/90 text-white'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${event.isActive ? 'bg-white animate-pulse' : 'bg-gray-300'}`}></span>
                      {event.isActive ? 'Faol' : 'Nofaol'}
                    </span>
                  </div>

                  {/* Telegram Badge */}
                  {event.telegramPostId && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-500/90 text-white backdrop-blur-sm">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                        </svg>
                        Telegram
                      </span>
                    </div>
                  )}

                  {/* Title on image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white truncate">{event.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 sm:mb-4">{event.description}</p>

                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('uz-UZ')} • {event.time}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => openRegistrationsModal(event)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Ro'yxat
                    </button>
                    <button
                      onClick={() => openEditModal(event)}
                      className="p-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                      title="Tahrirlash"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleToggleStatus(event._id, event.isActive)}
                      className={`p-2 rounded-lg transition-colors ${event.isActive ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-green-600 bg-green-50 hover:bg-green-100'}`}
                      title={event.isActive ? 'Nofaol qilish' : 'Faollashtirish'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      title="O'chirish"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Tadbirlar yo'q</h3>
            <p className="text-gray-500 mb-6">
              Hozircha tadbirlar mavjud emas. Yangi tadbir yarating.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Yangi tadbir yaratish
            </button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 pt-10">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Yangi tadbir yaratish</h3>
                  <p className="text-sm text-gray-500">Tadbir ma'lumotlarini kiriting</p>
                </div>
              </div>

              <form onSubmit={handleCreateEvent}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sarlavha</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="Tadbir nomi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tavsif</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                      placeholder="Tadbir haqida qisqacha..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sana</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Vaqt</label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Joy</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="Tadbir o'tkaziladigan joy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rasm</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary-300 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        className="hidden"
                        id="event-image"
                      />
                      <label htmlFor="event-image" className="cursor-pointer">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formData.image ? formData.image.name : 'Rasm tanlash uchun bosing'}
                        </p>
                      </label>
                    </div>
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

      {/* Edit Modal */}
      {showEditModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 pt-10">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tadbirni tahrirlash</h3>
                  <p className="text-sm text-gray-500">Ma'lumotlarni yangilang</p>
                </div>
              </div>

              <form onSubmit={handleUpdateEvent}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sarlavha</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tavsif</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sana</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Vaqt</label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Joy</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rasm (yangilash uchun)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary-300 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        className="hidden"
                        id="edit-event-image"
                      />
                      <label htmlFor="edit-event-image" className="cursor-pointer">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formData.image ? formData.image.name : 'Yangi rasm tanlash'}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedEvent(null);
                    }}
                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Yangilash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Ro'yxatdan o'tganlar Modal */}
      {showRegistrationsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ro'yxatdan o'tganlar</h2>
                  <p className="text-sm text-gray-500">{selectedEvent.title}</p>
                </div>
                <button
                  onClick={() => {
                    setShowRegistrationsModal(false);
                    setSelectedEvent(null);
                    setRegistrations([]);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {registrationsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                </div>
              ) : registrations.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Jami: {registrations.length} ta</span>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
                        <th className="pb-3">№</th>
                        <th className="pb-3">Ism Familiya</th>
                        <th className="pb-3">Telefon</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Sana</th>
                        <th className="pb-3">Amallar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {registrations.map((reg, index) => (
                        <tr key={reg._id} className="hover:bg-gray-50">
                          <td className="py-3 text-sm text-gray-500">{index + 1}</td>
                          <td className="py-3">
                            <span className="font-medium text-gray-900">{reg.firstName} {reg.lastName}</span>
                          </td>
                          <td className="py-3 text-sm text-gray-600">{reg.phone}</td>
                          <td className="py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${reg.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              reg.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                              {reg.status === 'confirmed' ? 'Tasdiqlangan' :
                                reg.status === 'cancelled' ? 'Bekor qilingan' : 'Kutilmoqda'}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-500">
                            {new Date(reg.createdAt).toLocaleDateString('uz-UZ')}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              {reg.status !== 'confirmed' && (
                                <button
                                  onClick={() => handleRegistrationStatus(reg._id, 'confirmed')}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Tasdiqlash"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                              )}
                              {reg.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleRegistrationStatus(reg._id, 'cancelled')}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Bekor qilish"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">Hali hech kim ro'yxatdan o'tmagan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
