import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CheckApplication = () => {
  const [applicationNumber, setApplicationNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!applicationNumber.trim()) {
      setError('Ariza raqamini kiriting');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`/applications/check/${applicationNumber.trim()}`);
      setResult(response.data.application);
    } catch (error) {
      setError(error.response?.data?.message || 'Ariza topilmadi');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          text: 'Kutilmoqda',
          color: 'bg-amber-100 text-amber-700 border-amber-200',
          icon: (
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          description: 'Arizangiz qabul qilindi va ko\'rib chiqish navbatida.'
        };
      case 'reviewing':
        return {
          text: 'Ko\'rib chiqilmoqda',
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ),
          description: 'Arizangiz hozirda ko\'rib chiqilmoqda. Tez orada natija e\'lon qilinadi.'
        };
      case 'accepted':
        return {
          text: 'Qabul qilindi',
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: (
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          description: 'Tabriklaymiz! Arizangiz qabul qilindi. Tez orada siz bilan bog\'lanamiz.'
        };
      case 'rejected':
        return {
          text: 'Rad etildi',
          color: 'bg-red-100 text-red-700 border-red-200',
          icon: (
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          description: 'Afsuski, arizangiz rad etildi.'
        };
      default:
        return {
          text: 'Noma\'lum',
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: null,
          description: ''
        };
    }
  };

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Ariza holati
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Ariza <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">tekshirish</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Ariza raqamingizni kiriting va arizangiz holatini tekshiring
          </p>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-gray-100">
          
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ariza raqami
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={applicationNumber}
                  onChange={(e) => setApplicationNumber(e.target.value.toUpperCase())}
                  placeholder="BLS-2026-00001"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-mono"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          {/* Error */}
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

          {/* Result */}
          {result && (
            <div className="space-y-6">
              {/* Status Card */}
              <div className={`p-6 rounded-2xl border-2 ${getStatusInfo(result.status).color}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    {getStatusInfo(result.status).icon}
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Ariza holati</p>
                    <p className="text-2xl font-bold">{getStatusInfo(result.status).text}</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">{getStatusInfo(result.status).description}</p>
              </div>

              {/* Rejection Reason */}
              {result.status === 'rejected' && result.rejectionReason && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-sm font-semibold text-red-800 mb-1">Rad etish sababi:</p>
                  <p className="text-red-700">{result.rejectionReason}</p>
                </div>
              )}

              {/* Application Details */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-gray-900">Ariza ma'lumotlari</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ariza raqami</p>
                    <p className="font-mono font-semibold text-gray-900">{result.applicationNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Yuborilgan sana</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(result.createdAt).toLocaleDateString('uz-UZ')}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Startup nomi</p>
                  <p className="font-semibold text-gray-900">{result.startupName}</p>
                </div>

                {result.eventTitle && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tadbir</p>
                    <p className="font-semibold text-gray-900">{result.eventTitle}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Help Text */}
          {!result && !error && (
            <div className="text-center text-gray-500 text-sm">
              <p>Ariza raqamingiz ariza yuborilgandan keyin beriladi.</p>
              <p className="mt-2">
                Ariza yuborish uchun{' '}
                <Link to="/application" className="text-primary-600 hover:underline font-medium">
                  bu yerga bosing
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckApplication;
