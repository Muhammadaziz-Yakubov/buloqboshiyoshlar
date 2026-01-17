import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Maxfiylik siyosati
          </h1>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Buloqboshi tumani Yoshlar ishlari agentligi shaxsiy ma'lumotlaringizni himoya qilish bo'yicha qat'iy siyosatga amal qiladi
          </p>
          <p className="text-white/60 text-sm mt-4">
            Oxirgi yangilanish: 2024-yil, 15-yanvar
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            
            {/* Kirish */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Kirish
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Buloqboshi tumani Yoshlar ishlari agentligi (bundan keyin "Agentlik" deb yuritiladi) sizning shaxsiy ma'lumotlaringizni himoya qilishga jiddiy yondashadi. Ushbu Maxfiylik siyosati bizning veb-saytimiz va xizmatlarimizdan foydalanganingizda qanday ma'lumotlarni to'plashimiz, ulardan qanday foydalanishimiz va himoya qilishimiz haqida tushuntiradi.
                </p>
                <p>
                  Bizning xizmatlarimizdan foydalanish orqali siz ushbu Maxfiylik siyosati shartlariga rozilik bildirasiz.
                </p>
              </div>
            </section>

            {/* To'planadigan ma'lumotlar */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                To'planadigan ma'lumotlar
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Biz quyidagi turdagi ma'lumotlarni to'plashimiz mumkin:</p>
                
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Shaxsiy ma'lumotlar:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Ism, familiya va otasining ismi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Elektron pochta manzili</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Telefon raqami</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Tug'ilgan sana</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Yashash manzili</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Startup va loyiha ma'lumotlari:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Startup nomi va tavsifi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Jamoa a'zolari haqida ma'lumot</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Biznes-reja va taqdimotlar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Yuklangan hujjatlar va fayllar</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Ma'lumotlardan foydalanish */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Ma'lumotlardan foydalanish
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>To'plangan ma'lumotlar quyidagi maqsadlarda ishlatiladi:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Arizalarni ko'rib chiqish</h4>
                      <p className="text-sm text-gray-600">Yuborilgan arizalarni baholash va qaror qabul qilish</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Aloqa o'rnatish</h4>
                      <p className="text-sm text-gray-600">Siz bilan bog'lanish va xabar yuborish</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-purple-50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Tadbirlar haqida xabar berish</h4>
                      <p className="text-sm text-gray-600">Kelgusi tadbirlar va imkoniyatlar haqida ma'lumot berish</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-orange-50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Statistika va tahlil</h4>
                      <p className="text-sm text-gray-600">Xizmatlarimizni yaxshilash uchun umumiy statistika to'plash</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Ma'lumotlarni himoya qilish */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Ma'lumotlarni himoya qilish
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Biz sizning ma'lumotlaringizni himoya qilish uchun quyidagi choralarni ko'ramiz:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl p-4 border border-primary-100">
                    <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Shifrlash</h4>
                    <p className="text-sm text-gray-600">Barcha ma'lumotlar shifrlangan holda saqlanadi</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Xavfsiz serverlar</h4>
                    <p className="text-sm text-gray-600">Ma'lumotlar xavfsiz serverlarda saqlanadi</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Kirish nazorati</h4>
                    <p className="text-sm text-gray-600">Faqat vakolatli xodimlar kirish huquqiga ega</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Muntazam yangilanish</h4>
                    <p className="text-sm text-gray-600">Xavfsizlik tizimlari doimiy yangilanib turadi</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Uchinchi tomonlar */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Uchinchi tomonlar bilan bo'lishish
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Biz sizning shaxsiy ma'lumotlaringizni uchinchi tomonlarga sotmaymiz yoki ijaraga bermaymiz. Ma'lumotlar faqat quyidagi hollarda bo'lishilishi mumkin:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Qonun talablariga muvofiq davlat organlariga</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Sizning aniq roziligingiz bilan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Xizmat ko'rsatuvchi hamkorlar bilan (maxfiylik shartnomasi asosida)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Sizning huquqlaringiz */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Sizning huquqlaringiz
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Siz quyidagi huquqlarga egasiz:</p>
                <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6 border border-primary-100">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Ma'lumotlaringizga kirish va nusxa olish huquqi</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Ma'lumotlarni tuzatish yoki yangilash huquqi</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Ma'lumotlarni o'chirishni so'rash huquqi</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Marketing xabarlaridan voz kechish huquqi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bog'lanish */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Bog'lanish
              </h2>
              <div className="text-gray-600 leading-relaxed">
                <p className="mb-4">Maxfiylik siyosati bo'yicha savollaringiz bo'lsa, biz bilan bog'laning:</p>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href="mailto:yoshlar@buloqboshi.uz" className="font-medium text-primary-600 hover:text-primary-700">yoshlar@buloqboshi.uz</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <a href="tel:+998990899500" className="font-medium text-green-600 hover:text-green-700">+998 99 089 95 00</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Manzil</p>
                      <p className="font-medium text-gray-900">Buloqboshi tumani, Andijon viloyati</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
