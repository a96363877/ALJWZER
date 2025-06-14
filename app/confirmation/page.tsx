"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Plane, Download, Mail, Calendar, MapPin, Clock, CreditCard } from "lucide-react"

interface ConfirmationPageArabicProps {
  bookingRef: string
}

export function ConfirmationPageArabic({ bookingRef }: ConfirmationPageArabicProps) {
  const handleDownloadTicket = () => {
    // Simulate ticket download
    console.log("Downloading e-ticket...")
  }

  const handleEmailConfirmation = () => {
    // Simulate email sending
    console.log("Sending confirmation email...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50" dir="rtl">
      {/* Professional Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium text-base sm:text-lg transition-colors"
            >
              ← العودة للرئيسية
            </a>
            <div className="flex items-center gap-3">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">تأكيد الحجز</div>
              <div className="bg-green-600 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">الجزيرة</div>
              <Plane className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Success Message */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 sm:p-6 rounded-full">
              <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">تم تأكيد حجزك بنجاح!</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            تم حجز رحلتك بنجاح وسيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني
          </p>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg inline-block">
            <div className="text-sm sm:text-base text-gray-600 mb-2">رقم الحجز</div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{bookingRef}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Flight Information */}
          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 sm:p-8">
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <Plane className="h-6 w-6 sm:h-8 sm:w-8" />
                معلومات الرحلة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">رقم الرحلة</span>
                  <span className="font-bold text-base sm:text-lg">JZ101</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">المسار</span>
                  <div className="text-right">
                    <div className="font-bold text-base sm:text-lg">الكويت ← دبي</div>
                    <div className="text-xs sm:text-sm text-gray-500">KWI → DXB</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">التاريخ</span>
                  <div className="text-right">
                    <div className="font-bold text-base sm:text-lg">15 ديسمبر 2024</div>
                    <div className="text-xs sm:text-sm text-gray-500">الأحد</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">المغادرة</span>
                  <div className="text-right">
                    <div className="font-bold text-lg sm:text-xl text-blue-600">08:00</div>
                    <div className="text-xs sm:text-sm text-gray-500">صباحاً - مطار الكويت الدولي</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">الوصول</span>
                  <div className="text-right">
                    <div className="font-bold text-lg sm:text-xl text-blue-600">09:20</div>
                    <div className="text-xs sm:text-sm text-gray-500">صباحاً - مطار دبي الدولي</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">مدة الرحلة</span>
                  <span className="font-bold text-base sm:text-lg">1س 20د</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Details */}
          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 sm:p-8">
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <Users className="h-6 w-6 sm:h-8 sm:w-8" />
                تفاصيل المسافرين
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-bold text-base sm:text-lg">المسافر 1</div>
                      <div className="text-sm text-gray-600">البالغ الرئيسي</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">المقعد 12A</div>
                      <div className="text-xs text-gray-500">نافذة</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">أحمد محمد الكندري</div>
                  <div className="text-sm text-gray-600 mt-1">ahmed.alkandari@email.com</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">الدرجة الاقتصادية</div>
                    <div className="text-sm text-gray-600">درجة السفر</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">1</div>
                    <div className="text-sm text-gray-600">عدد المسافرين</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <Card className="shadow-xl border-0 rounded-3xl overflow-hidden mb-8 sm:mb-12">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 sm:p-8">
            <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
              <CreditCard className="h-6 w-6 sm:h-8 sm:w-8" />
              ملخص الدفع
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">سعر التذكرة الأساسي</span>
                  <span className="font-medium">45.000 د.ك</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رسوم اختيار المقعد</span>
                  <span className="font-medium">5.000 د.ك</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الضرائب والرسوم</span>
                  <span className="font-medium">8.000 د.ك</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>المجموع المدفوع</span>
                  <span className="text-green-600">58.000 د.ك</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                <div className="text-sm text-gray-600 mb-2">طريقة الدفع</div>
                <div className="font-bold text-base sm:text-lg mb-4">بطاقة ائتمان</div>
                <div className="text-sm text-gray-600">**** **** **** 1234</div>
                <div className="text-xs text-gray-500 mt-2">تم الدفع بنجاح في 15 ديسمبر 2024</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="shadow-xl border-0 rounded-3xl overflow-hidden mb-8 sm:mb-12">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 sm:p-8">
            <CardTitle className="text-xl sm:text-2xl">معلومات مهمة للسفر</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">تسجيل الوصول</div>
                    <div className="text-sm text-gray-600">يفتح قبل 24 ساعة من موعد المغادرة</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">الوصول للمطار</div>
                    <div className="text-sm text-gray-600">يُنصح بالوصول قبل ساعتين من موعد المغادرة</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">إغلاق البوابة</div>
                    <div className="text-sm text-gray-600">تُغلق البوابة قبل 30 دقيقة من موعد المغادرة</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="font-semibold text-yellow-800 mb-2">الأمتعة المسموحة</div>
                  <div className="text-sm text-yellow-700">
                    • حقيبة يد: 7 كجم
                    <br />• أمتعة مسجلة: 23 كجم
                    <br />• أبعاد الحقيبة: 55×40×20 سم
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="font-semibold text-blue-800 mb-2">الوثائق المطلوبة</div>
                  <div className="text-sm text-blue-700">
                    • جواز سفر ساري المفعول
                    <br />• تأشيرة دخول (إن لزم الأمر)
                    <br />• شهادة تطعيم (حسب الوجهة)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Button
            onClick={handleDownloadTicket}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="ml-3 h-6 w-6" />
            تحميل التذكرة الإلكترونية
          </Button>
          <Button
            onClick={handleEmailConfirmation}
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Mail className="ml-3 h-6 w-6" />
            إرسال التأكيد بالبريد
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plane className="ml-3 h-6 w-6" />
            حجز رحلة أخرى
          </Button>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">هل تحتاج مساعدة؟</h3>
            <p className="text-gray-600 mb-6">فريق خدمة العملاء متاح على مدار الساعة لمساعدتك</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">الهاتف: 965-1234-567+</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">البريد: support@jazeera.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
