import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Foydalanish shartlari
          </h1>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Buloqboshi tumani Yoshlar ishlari agentligi veb-saytidan foydalanish qoidalari va shartlari
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
            
            {/* Umumiy qoidalar */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Umumiy qoidalar
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Ushbu Foydalanish shartlari Buloqboshi tumani Yoshlar ishlari agentligi (bundan keyin "Agentlik") veb-saytidan foydalanish qoidalarini belgilaydi. Veb-saytdan foydalanish orqali siz ushbu shartlarga to'liq rozilik bildirasiz.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4">
                  <p className="text-blue-800 font-medium">Muhim:</p>
                  <p className="text-blue-700 text-sm mt-1">
                    Agar siz ushbu shartlarga rozi bo'lmasangiz, iltimos, veb-saytdan foydalanmang.
                  </p>
                </div>
              </div>
            </section>

            {/* Xizmatlar tavsifi */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Xizmatlar tavsifi
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Agentlik veb-sayti quyidagi xizmatlarni taqdim etadi:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ariza topshirish</h4>
                    <p className="text-sm text-gray-600">Startup loyihalar uchun ariza yuborish imkoniyati</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Tadbirlar</h4>
                    <p className="text-sm text-gray-600">Tadbirlarga ro'yxatdan o'tish va qatnashish</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ma'lumot olish</h4>
                    <p className="text-sm text-gray-600">Agentlik faoliyati haqida ma'lumot olish</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Aloqa</h4>
                    <p className="text-sm text-gray-600">Agentlik bilan bog'lanish imkoniyati</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Foydalanuvchi majburiyatlari */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Foydalanuvchi majburiyatlari
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Veb-saytdan foydalanishda siz quyidagilarga rioya qilishingiz shart:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">To'g'ri ma'lumot berish</h4>
                      <p className="text-sm text-gray-600">Ariza va ro'yxatdan o'tishda faqat to'g'ri va aniq ma'lumotlarni kiriting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Qonunlarga rioya qilish</h4>
                      <p className="text-sm text-gray-600">O'zbekiston Respublikasi qonunlariga muvofiq harakat qiling</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Hurmatli munosabat</h4>
                      <p className="text-sm text-gray-600">Boshqa foydalanuvchilar va xodimlarga hurmat bilan munosabatda bo'ling</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Xavfsizlik</h4>
                      <p className="text-sm text-gray-600">Hisobingiz xavfsizligini ta'minlang va parolni maxfiy saqlang</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Taqiqlangan harakatlar */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Taqiqlangan harakatlar
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Quyidagi harakatlar qat'iyan taqiqlanadi:</p>
                <div className="bg-red-50 rounded-xl p-4 sm:p-6 border border-red-100">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Yolg'on yoki chalg'ituvchi ma'lumot berish</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Boshqa shaxslar nomidan ariza topshirish</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Veb-saytga zararli dasturlar yuklash yoki hujum qilish</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Spam yoki reklama xabarlarini tarqatish</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Mualliflik huquqlarini buzish</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Noqonuniy faoliyat uchun platformadan foydalanish</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Ariza topshirish qoidalari */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Ariza topshirish qoidalari
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Startup loyihalar uchun ariza topshirishda quyidagi qoidalarga amal qiling:</p>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                      Ariza shakli
                    </h4>
                    <p className="text-sm">Barcha majburiy maydonlarni to'ldiring va kerakli hujjatlarni yuklang.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                      Ko'rib chiqish muddati
                    </h4>
                    <p className="text-sm">Arizalar 5-10 ish kuni ichida ko'rib chiqiladi. Natija haqida xabar beriladi.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                      Qaror
                    </h4>
                    <p className="text-sm">Agentlik arizani qabul qilish yoki rad etish huquqini o'zida saqlab qoladi.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
                      Qayta ariza
                    </h4>
                    <p className="text-sm">Rad etilgan ariza bo'yicha 30 kundan so'ng qayta ariza topshirish mumkin.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Intellektual mulk */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Intellektual mulk
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Veb-saytdagi barcha kontent, shu jumladan matnlar, grafikalar, logotiplar, rasmlar va dasturiy ta'minot Agentlikning intellektual mulki hisoblanadi.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-4">
                  <p className="text-yellow-800 font-medium">Diqqat:</p>
                  <p className="text-yellow-700 text-sm mt-1">
                    Kontentni Agentlikning yozma ruxsatisiz nusxalash, tarqatish yoki o'zgartirish taqiqlanadi.
                  </p>
                </div>
              </div>
            </section>

            {/* Javobgarlikni cheklash */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Javobgarlikni cheklash
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Agentlik quyidagi holatlarda javobgar emas:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Texnik nosozliklar yoki xizmat uzilishlari tufayli yuzaga kelgan zararlar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Foydalanuvchilar tomonidan berilgan noto'g'ri ma'lumotlar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Uchinchi tomon veb-saytlariga havolalar orqali yuzaga kelgan muammolar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Foydalanuvchining o'z xatosi tufayli yuzaga kelgan zararlar</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Shartlarni o'zgartirish */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Shartlarni o'zgartirish
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Agentlik ushbu Foydalanish shartlarini istalgan vaqtda o'zgartirish huquqini o'zida saqlab qoladi. O'zgarishlar veb-saytda e'lon qilingan paytdan boshlab kuchga kiradi.
                </p>
                <p>
                  Muhim o'zgarishlar haqida foydalanuvchilarga elektron pochta orqali xabar beriladi.
                </p>
              </div>
            </section>

            {/* Nizolarni hal qilish */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                Nizolarni hal qilish
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Ushbu shartlar bilan bog'liq barcha nizolar O'zbekiston Respublikasi qonunchiligiga muvofiq hal qilinadi.
                </p>
                <p>
                  Nizolar birinchi navbatda muzokaralar yo'li bilan hal qilinadi. Muzokaralar natija bermaganida, nizo sudga topshiriladi.
                </p>
              </div>
            </section>

            {/* Bog'lanish */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">10</span>
                Bog'lanish
              </h2>
              <div className="text-gray-600 leading-relaxed">
                <p className="mb-4">Foydalanish shartlari bo'yicha savollaringiz bo'lsa, biz bilan bog'laning:</p>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href="mailto:yoshlar@buloqboshi.uz" className="font-medium text-blue-600 hover:text-blue-700">yoshlar@buloqboshi.uz</a>
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
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
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

export default TermsOfService;
