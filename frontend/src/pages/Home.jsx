import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { number: '38808+', label: 'Yoshlar' },
    { number: '0', label: 'Startuplar' },
    { number: '0', label: 'Arizalar' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Statistikalarni olish
        const applicationsRes = await axios.get('/applications?limit=1');
        const applicationsCount = applicationsRes.data.total || applicationsRes.data.applications?.length || 0;

        // Startuplar sonini hisoblash (qabul qilingan arizalar)
        const startupsRes = await axios.get('/applications?status=accepted&limit=1000');
        const startupsCount = startupsRes.data.total || startupsRes.data.applications?.length || 0;

        setStats([
          { number: '38808+', label: 'Yoshlar' },
          { number: String(startupsCount), label: 'Startuplar' },
          { number: String(applicationsCount), label: 'Arizalar' }
        ]);
      } catch (error) {
        console.error('Ma\'lumotlarni olishda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Startup qo'llab-quvvatlash",
      description: "Yoshlarning innovatsion g'oyalari va startuplarini rivojlantirish uchun yordam va mentorlik",
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Moliyaviy yordam',
      description: "Startuplarga grantlar, investitsiyalar va moliyaviy ko'mak berish",
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Inkubatsiya dasturi",
      description: "Startuplarga ofis joy, mentorlik va biznes rivojlanish uchun yordam",
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Networking',
      description: "Investitorlar, mentorlar va boshqa tadbirkorlar bilan bog'lanish imkoniyati",
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-mesh opacity-50"></div>
        
        {/* Floating Elements - hidden on mobile for performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="hidden sm:block absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-float animate-delay-200"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 pattern-grid opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 text-center">
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Yoshlar uchun yangi imkoniyatlar
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 animate-fade-in-up font-display leading-tight">
            <span className="block">Buloqboshi tumani</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
              Yoshlar ishlari agentligi
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in-up animate-delay-200 leading-relaxed px-2">
            Yoshlarning startup g'oyalarini rivojlantirish, moliyaviy yordam ko'rsatish va
            muvaffaqiyatli biznes qurish uchun <span className="text-white font-semibold">yagona platforma</span>
          </p>
          
          <div className="flex justify-center animate-fade-in-up animate-delay-300 px-4 sm:px-0">
            <Link
              to="/application"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-700 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-2xl shadow-white/20 hover:shadow-white/30 transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Startup ariza yuborish
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-10 sm:mt-16 animate-fade-in-up animate-delay-500 px-2 sm:px-0">
            {stats.map((stat, index) => (
              <div key={index} className="p-3 sm:p-4 md:p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl hover:bg-white/15 transition-colors">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">{stat.number}</div>
                <div className="text-white/70 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="hidden sm:block absolute bottom-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-purple-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 lg:mb-20">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 text-primary-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Biz haqimizda
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Yoshlar uchun <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">imkoniyatlar</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Buloqboshi tumani Yoshlar ishlari agentligi - yoshlarning startup g'oyalarini rivojlantirish,
              moliyaviy yordam ko'rsatish va muvaffaqiyatli biznes qurish uchun tashkil etilgan platforma.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-5 sm:p-6 lg:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">{feature.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-2xl sm:rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-mesh opacity-30"></div>
        
        {/* Floating shapes - hidden on mobile */}
        <div className="hidden sm:block absolute top-10 left-10 w-24 md:w-32 h-24 md:h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
        <div className="hidden sm:block absolute bottom-10 right-10 w-32 md:w-48 h-32 md:h-48 bg-purple-500/20 rounded-full blur-3xl animate-float animate-delay-300"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Hoziroq boshlang
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 font-display leading-tight">
            Kelajagingizni <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">bugun</span> quring
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
            Startup g'oyangizni rivojlantirish, moliyaviy yordam olish va
            muvaffaqiyatli biznes qurish uchun biz bilan bog'laning
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              to="/application"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-700 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg shadow-2xl shadow-black/20 hover:shadow-black/30 transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Ariza yuborish
            </Link>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Bog'lanish
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-primary-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="hidden sm:block absolute bottom-0 right-0 w-48 md:w-72 h-48 md:h-72 bg-purple-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 text-primary-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Aloqa
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Biz bilan <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">bog'laning</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Savollaringiz bo'lsa, biz bilan bog'laning. Sizga yordam berishdan mamnunmiz!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Contact Cards */}
            <div className="group p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl sm:rounded-3xl border border-primary-100 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Telefon</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Dushanba - Juma, 9:00 - 18:00</p>
              <a href="tel:+998901234567" className="text-sm sm:text-base text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                +998 99 089 95 00
              </a>
            </div>

            <div className="group p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl border border-green-100 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Email</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">24 soat ichida javob beramiz</p>
              <a href="mailto:yoshlar@buloqboshi.uz" className="text-sm sm:text-base text-green-600 font-semibold hover:text-green-700 transition-colors break-all">
                yoshlar@buloqboshi.uz
              </a>
            </div>

            <div className="group p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl sm:rounded-3xl border border-orange-100 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Manzil</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Bizning ofisimizga tashrif buyuring</p>
              <span className="text-sm sm:text-base text-orange-600 font-semibold">
                Buloqboshi, Andijon viloyati
              </span>
            </div>
          </div>

          {/* Working Hours */}
          <div className="mt-8 sm:mt-12 lg:mt-16 p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-2xl sm:rounded-3xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Ish vaqti</h3>
                <p className="text-sm sm:text-base text-gray-600">Sizni kutib qolamiz!</p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 w-full md:w-auto">
                <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 bg-white rounded-xl sm:rounded-2xl shadow-sm text-center">
                  <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Dush - Juma</p>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">9:00-18:00</p>
                </div>
                <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 bg-white rounded-xl sm:rounded-2xl shadow-sm text-center">
                  <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Shanba</p>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">10:00-16:00</p>
                </div>
                <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 bg-white rounded-xl sm:rounded-2xl shadow-sm text-center">
                  <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Yakshanba</p>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-red-500">Dam olish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
