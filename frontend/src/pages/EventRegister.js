import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const EventRegister = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    } else {
      setEventLoading(false);
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/events/${eventId}`);
      setEvent(response.data.event);
    } catch (error) {
      console.error('Tadbir olishda xatolik:', error);
      setError('Tadbir topilmadi');
    } finally {
      setEventLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Tadbir uchun ro'yxatdan o'tish
      await axios.post('/event-registrations', {
        eventId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });

      setSuccess('Ro\'yxatdan muvaffaqiyatli o\'tdingiz! Tez orada siz bilan bog\'lanamiz.');
      
      // Formni tozalash
      setFormData({
        firstName: '',
        lastName: '',
        phone: ''
      });

      // 3 soniyadan keyin bosh sahifaga yo'naltirish
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      setError(error.response?.data?.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  if (eventLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-mesh opacity-30"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float animate-delay-200"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Tadbirga ro'yxatdan o'tish
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            {event ? event.title : 'Tadbirga qatnashing'}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {event ? `${new Date(event.date).toLocaleDateString('uz-UZ')} • ${event.time} • ${event.location}` : 'Ma\'lumotlaringizni kiriting va tadbirga qatnashing'}
          </p>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-gray-100">
          
          {/* Event Info Card */}
          {event && (
            <div className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl border border-primary-100">
              <div className="flex items-center gap-3">
                {event.image ? (
                  <img 
                    src={`http://localhost:5000${event.image}`} 
                    alt={event.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString('uz-UZ')} • {event.time}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-green-700 font-semibold">{success}</p>
                <p className="text-green-600 text-sm">3 soniyadan keyin bosh sahifaga yo'naltirilasiz...</p>
              </div>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Ism */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ism <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="Ismingiz"
                  />
                </div>
              </div>

              {/* Familiya */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Familiya <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="Familiyangiz"
                  />
                </div>
              </div>

              {/* Telefon */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telefon raqam <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="+998 XX XXX XX XX"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !eventId}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ro'yxatdan o'tish
                  </>
                )}
              </button>

              {!eventId && (
                <p className="text-center text-amber-600 text-sm">
                  Tadbir tanlanmagan. Iltimos, tadbirlar sahifasidan tanlang.
                </p>
              )}
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/events" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              ← Barcha tadbirlarga qaytish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
