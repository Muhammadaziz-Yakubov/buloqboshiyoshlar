import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${id}`);
        setEvent(response.data.event);
      } catch (error) {
        console.error('Tadbirni olishda xatolik:', error);
        setError('Tadbir topilmadi');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tadbir topilmadi</h1>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tadbirlarga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary-600 transition-colors">
                Bosh sahifa
              </Link>
            </li>
            <li><svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></li>
            <li>
              <Link to="/events" className="text-gray-500 hover:text-primary-600 transition-colors">
                Tadbirlar
              </Link>
            </li>
            <li><svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></li>
            <li className="text-gray-900 font-medium truncate max-w-xs">{event.title}</li>
          </ol>
        </nav>

        {/* Event Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          {/* Image */}
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary-400 to-purple-500">
            {event.image ? (
              <img 
                src={`http://localhost:5000${event.image}`} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                event.isActive 
                  ? 'bg-green-500/90 text-white' 
                  : 'bg-gray-500/90 text-white'
              }`}>
                <span className={`w-2 h-2 rounded-full ${event.isActive ? 'bg-white animate-pulse' : 'bg-gray-300'}`}></span>
                {event.isActive ? 'Faol tadbir' : 'Tugagan'}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">
              {event.title}
            </h1>

            {/* Event Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sana</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(event.date).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vaqt</p>
                  <p className="font-semibold text-gray-900">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joy</p>
                  <p className="font-semibold text-gray-900">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tadbir haqida</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                {event.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            {event.isActive ? (
              <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 text-center border border-primary-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Tadbirga qatnashishni hohlaysizmi?
                </h3>
                <p className="text-gray-600 mb-6">
                  Ro'yxatdan o'ting va bu ajoyib imkoniyatni o'tkazmang
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to={`/events/register?eventId=${id}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ro'yxatdan o'tish
                  </Link>
                  <button
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary-600 border-2 border-primary-200 rounded-xl font-semibold hover:bg-primary-50 transition-all"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: event.title,
                          text: event.description,
                          url: window.location.href
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link nusxalandi!');
                      }
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Ulashish
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Bu tadbir o'tkazilgan
                </h3>
                <p className="text-gray-600 mb-4">
                  Tadbir allaqachon o'tkazilgan. Boshqa tadbirlarimizga qatnashishingiz mumkin.
                </p>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Boshqa tadbirlarni ko'rish
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Barcha tadbirlarga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
