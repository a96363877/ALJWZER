import type { Metadata } from 'next'
import './globals.css'
import { Award, Globe, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: ' شركة طيران ',
  description: 'أول شركة طيران غير حكومية في منطقة الشرق الأوسط، وما زالت إحدى شركات الطيران القليلة الخاصة في المنطقة.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar"> 
      <body dir='rtl'>
           {/* Professional Header - Responsive */}
      <header className="relative z-20 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden text-blue-800 hover:bg-white/10">
              <Menu className="h-6 w-6 text-blue-700" />
            </Button>

            {/* Enhanced Navigation - Hidden on mobile */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 space-x-reverse">
              <a
                href="#"
                className="text-white hover:text-yellow-300 font-medium text-base lg:text-lg transition-colors duration-200 relative group"
              >
                الرحلات
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-300 font-medium text-base lg:text-lg transition-colors duration-200 relative group"
              >
                الفنادق
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-300 font-medium text-base lg:text-lg transition-colors duration-200 relative group"
              >
                تأجير السيارات
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-300 font-medium text-base lg:text-lg transition-colors duration-200 relative group"
              >
                رحلاتي
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-200"></span>
              </a>
            </nav>

            {/* Enhanced Logo - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                <img src="vercel.svg" alt="logo"/>              
              </div>
            </div>

            {/* Enhanced Account & Language - Responsive */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-900 border-white bg-white hover:bg-yellow-50 font-medium text-xs sm:text-sm px-2 sm:px-3"
              >
                KW | AR
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-700 border-white bg-transparent hover:bg-white/10 font-medium text-xs sm:text-sm px-2 sm:px-3"
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        </div>
      </header>

        {children}
      
      {/* Enhanced Footer - Responsive */}
      <footer className="bg-gray-100 text-blue-900 py-12 sm:py-16" dir='rtl'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <img src="vercel.svg" alt="logo"/>              

              </div>
              <p className="text-gray-400 leading-relaxed text-base sm:text-lg mb-6">
                شركة طيران رائدة تقدم خدمات متميزة وتجربة سفر لا تُنسى إلى أكثر من 150 وجهة حول العالم
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <Award className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">خدماتنا</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    حجز الطيران
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    إدارة الحجز
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    تسجيل الوصول
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    حالة الرحلة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    برنامج الولاء
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">معلومات السفر</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    شروط السفر
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    الأمتعة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    التأشيرات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    التأمين
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors text-base sm:text-lg">
                    الصحة والسلامة
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">تواصل معنا</h4>
              <ul className="space-y-3 sm:space-y-4 text-gray-400">
                <li className="text-base sm:text-lg">الهاتف: 965-1234-567+</li>
                <li className="text-base sm:text-lg">البريد: info@jazeera.com</li>
                <li className="text-base sm:text-lg">العنوان: الكويت</li>
                <li className="text-base sm:text-lg">ساعات العمل: 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-base sm:text-lg">© 2024 شركة الجزيرة للطيران. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer></body>
    </html>
  )
}
