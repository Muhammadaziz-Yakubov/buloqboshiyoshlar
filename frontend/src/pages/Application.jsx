import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Application = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startupName: '',
    founders: [''],
    email: '',
    phone: '',
    description: '',
    teamMembers: [
      { name: '', role: '', email: '', phone: '' }
    ]
  });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [applicationNumber, setApplicationNumber] = useState('');

  // Form ma'lumotlarini o'zgartirish
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Asoschilarni boshqarish
  const handleFounderChange = (index, value) => {
    const newFounders = [...formData.founders];
    newFounders[index] = value;
    setFormData(prev => ({
      ...prev,
      founders: newFounders
    }));
  };

  const addFounder = () => {
    setFormData(prev => ({
      ...prev,
      founders: [...prev.founders, '']
    }));
  };

  const removeFounder = (index) => {
    if (formData.founders.length > 1) {
      const newFounders = formData.founders.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        founders: newFounders
      }));
    }
  };

  // Jamoa a'zolarini boshqarish
  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index] = {
      ...newTeamMembers[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      teamMembers: newTeamMembers
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: '', email: '', phone: '' }]
    }));
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > 1) {
      const newTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        teamMembers: newTeamMembers
      }));
    }
  };

  // Fayllarni boshqarish
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  // Formni yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Form data yaratish
      const formDataToSend = new FormData();

      // Startup arizasi uchun ma'lumotlar
      formDataToSend.append('startupName', formData.startupName);
      formDataToSend.append('founders', JSON.stringify(formData.founders));
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('teamMembers', JSON.stringify(formData.teamMembers));

      // Fayllarni qo'shish
      attachments.forEach(file => {
        formDataToSend.append('attachments', file);
      });

      // Serverga yuborish
      const response = await axios.post('/applications', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Ariza raqamini saqlash
      if (response.data.application?.applicationNumber) {
        setApplicationNumber(response.data.application.applicationNumber);
      }

      setSuccess('Startup arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');

      // Formni tozalash
      setFormData({
        startupName: '',
        founders: [''],
        email: '',
        phone: '',
        description: '',
        teamMembers: [
          { name: '', role: '', email: '', phone: '' }
        ]
      });
      setAttachments([]);

      // 5 soniyadan keyin bosh sahifaga yo'naltirish
      setTimeout(() => {
        navigate('/');
      }, 5000);

    } catch (error) {
      setError(error.response?.data?.message || 'Arizani yuborishda xatolik yuz berdi');
    } finally {
      setLoading(false);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Ariza formasi
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Ariza <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">yuborish</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Yoshlar ishlari agentligiga murojaat qiling - biz sizga yordam beramiz
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        {/* Startup ariza formasi */}
        {!success && (
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
          
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
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-bold text-lg">{success}</p>
                  <p className="text-green-600 text-sm">5 soniyadan keyin bosh sahifaga yo'naltirilasiz...</p>
                </div>
              </div>
              
              {applicationNumber && (
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-gray-600 mb-1">Sizning ariza raqamingiz:</p>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-primary-600">{applicationNumber}</span>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(applicationNumber)}
                      className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                      title="Nusxalash"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Bu raqamni saqlang! Ariza holatini <Link to="/check-application" className="text-primary-600 hover:underline">tekshirish sahifasida</Link> ko'rishingiz mumkin.
                  </p>
                </div>
              )}
            </div>
          )}


          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Startup ma'lumotlari */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-xl font-bold text-gray-900">Startup ma'lumotlari</h2>
              </div>

              {/* Startup nomi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Startup nomi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleChange}
                    required
                    className="input-modern pl-12"
                    placeholder="Startupingiz nomini kiriting"
                  />
                </div>
              </div>

              {/* Asoschilar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asoschilar <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {formData.founders.map((founder, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={founder}
                          onChange={(e) => handleFounderChange(index, e.target.value)}
                          required
                          className="input-modern pl-12"
                          placeholder={`${index + 1}-asoschi ismi`}
                        />
                      </div>
                      {formData.founders.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFounder(index)}
                          className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addFounder}
                  className="mt-3 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Asoschi qo'shish
                </button>
              </div>

              {/* Email va telefon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-modern pl-12"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon <span className="text-red-500">*</span>
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
                      className="input-modern pl-12"
                      placeholder="+998 XX XXX XX XX"
                    />
                  </div>
                </div>
              </div>

              {/* Tavsif */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Startup tavsifi <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-modern resize-none"
                  placeholder="Startupingiz haqida qisqacha ma'lumot: qanday muammoni hal qiladi, maqsadli auditoriya, biznes modeli..."
                />
              </div>
            </div>

            {/* Section 2: Jamoa a'zolari */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-xl font-bold text-gray-900">Jamoa a'zolari <span className="text-gray-400 font-normal text-base">({formData.teamMembers.length} ta)</span></h2>
              </div>

              <div className="space-y-4">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-gray-500">A'zo #{index + 1}</span>
                      {formData.teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                        >
                          O'chirish
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Ism</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                          required
                          className="input-modern"
                          placeholder="To'liq ism"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Lavozim</label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                          required
                          className="input-modern"
                          placeholder="Masalan: CTO, Designer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                          required
                          className="input-modern"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Telefon</label>
                        <input
                          type="tel"
                          value={member.phone}
                          onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)}
                          required
                          className="input-modern"
                          placeholder="+998 XX XXX XX XX"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addTeamMember}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Jamoa a'zosini qo'shish
              </button>
            </div>

            {/* Section 3: Fayllar */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-xl font-bold text-gray-900">Prezintatsiya Yuklang</h2>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary-300 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mb-1">Fayllarni yuklash uchun bosing</p>
                  <p className="text-gray-400 text-sm">PDF, DOC, JPG, PNG - maksimum 10MB</p>
                </label>
              </div>
              
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Tanlangan fayllar:</p>
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                      <span key={index} className="inline-flex items-center gap-2 px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {file.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {/* Submit button */}
            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 text-white rounded-xl font-semibold text-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Arizani yuborish
                  </>
                )}
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">
                Yuborish orqali siz <a href="#" className="text-primary-600 hover:underline">foydalanish shartlari</a>ga rozilik bildirasiz
              </p>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default Application;
