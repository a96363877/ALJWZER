"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Plane, Download, Mail, Calendar, MapPin, Clock, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

interface BookingData {
  bookingRef: string
  flightId: string
  from: string
  to: string
  departDate: string
  returnDate: string
  passengers: string
  seats: string
  classType: string
  totalPrice: string
}

interface ConfirmationPageArabicProps {
  bookingData: BookingData
}

// Real city names mapping
const cityNames: Record<string, string> = {
  KWI: "الكويت",
  RUH: "الرياض",
  JED: "جدة",
  DXB: "دبي",
  AUH: "أبوظبي",
  DOH: "الدوحة",
  BAH: "المنامة",
  MCT: "مسقط",
  AMM: "عمان",
  BEY: "بيروت",
  CAI: "القاهرة",
  IST: "إسطنبول",
  LHR: "لندن",
  CDG: "باريس",
  FRA: "فرانكفورت",
  BOM: "مومباي",
  DEL: "نيودلهي",
  BKK: "بانكوك",
  KUL: "كوالالمبور",
  SIN: "سنغافورة",
  JFK: "نيويورك",
  LAX: "لوس أنجلوس",
  SYD: "سيدني",
}

const airportNames: Record<string, string> = {
  KWI: "مطار الكويت الدولي",
  RUH: "مطار الملك خالد الدولي",
  JED: "مطار الملك عبدالعزيز الدولي",
  DXB: "مطار دبي الدولي",
  AUH: "مطار أبوظبي الدولي",
  DOH: "مطار حمد الدولي",
  BAH: "مطار البحرين الدولي",
  MCT: "مطار مسقط الدولي",
  AMM: "مطار الملكة علياء الدولي",
  BEY: "مطار رفيق الحريري الدولي",
  CAI: "مطار القاهرة الدولي",
  IST: "مطار إسطنبول",
  LHR: "مطار هيثرو",
  CDG: "مطار شارل ديغول",
  FRA: "مطار فرانكفورت",
  BOM: "مطار تشاتراباتي شيفاجي",
  DEL: "مطار إنديرا غاندي الدولي",
  BKK: "مطار سوفارنابومي",
  KUL: "مطار كوالالمبور الدولي",
  SIN: "مطار تشانغي",
  JFK: "مطار جون كينيدي الدولي",
  LAX: "مطار لوس أنجلوس الدولي",
  SYD: "مطار كينغسفورد سميث",
}

const classNames: Record<string, string> = {
  economy: "الدرجة الاقتصادية",
  premium: "الدرجة المميزة",
  business: "درجة الأعمال",
  first: "الدرجة الأولى",
}

// Generate flight times based on route
const generateFlightTimes = (from: string, to: string) => {
  const routes: Record<string, any> = {
    "KWI-DXB": { duration: "1س 20د", departTime: "08:00", arriveTime: "09:20" },
    "KWI-RUH": { duration: "1س 15د", departTime: "07:30", arriveTime: "08:45" },
    "KWI-DOH": { duration: "1س 10د", departTime: "09:15", arriveTime: "10:25" },
    "KWI-BAH": { duration: "45د", departTime: "06:45", arriveTime: "07:30" },
    "KWI-MCT": { duration: "1س 30د", departTime: "10:30", arriveTime: "12:00" },
    "KWI-AMM": { duration: "2س 15د", departTime: "14:20", arriveTime: "16:35" },
    "KWI-BEY": { duration: "2س 30د", departTime: "15:45", arriveTime: "18:15" },
    "KWI-CAI": { duration: "3س 45د", departTime: "11:30", arriveTime: "15:15" },
    "KWI-IST": { duration: "4س 30د", departTime: "13:20", arriveTime: "17:50" },
    "KWI-LHR": { duration: "7س 15د", departTime: "02:30", arriveTime: "09:45" },
    "KWI-CDG": { duration: "6س 45د", departTime: "03:15", arriveTime: "10:00" },
    "KWI-FRA": { duration: "6س 30د", departTime: "01:45", arriveTime: "08:15" },
    "KWI-BOM": { duration: "3س 30د", departTime: "16:30", arriveTime: "20:00" },
    "KWI-DEL": { duration: "4س 15د", departTime: "17:45", arriveTime: "22:00" },
    "KWI-BKK": { duration: "6س 45د", departTime: "23:30", arriveTime: "06:15+1" },
    "KWI-KUL": { duration: "7س 30د", departTime: "22:15", arriveTime: "05:45+1" },
    "KWI-SIN": { duration: "7س 45د", departTime: "21:30", arriveTime: "05:15+1" },
    "KWI-JFK": { duration: "13س 30د", departTime: "14:30", arriveTime: "04:00+1" },
    "KWI-LAX": { duration: "16س 15د", departTime: "12:45", arriveTime: "04:00+1" },
  }

  const routeKey = `${from}-${to}`
  const reverseRouteKey = `${to}-${from}`
  return (
    routes[routeKey] ||
    routes[reverseRouteKey] || {
      duration: "2س 30د",
      departTime: "10:00",
      arriveTime: "12:30",
    }
  )
}

export function ConfirmationPageArabic({ bookingData }: ConfirmationPageArabicProps) {
  const handleDownloadTicket = () => {
    console.log("Downloading e-ticket...")
  }

  const handleEmailConfirmation = () => {
    console.log("Sending confirmation email...")
  }

  // Parse passenger data
  let passengerList = []
  try {
    passengerList = JSON.parse(bookingData.passengers)
  } catch (e) {
    passengerList = []
  }

  // Parse seats
  const seatList = bookingData.seats ? bookingData.seats.split(",") : []

  // Get flight times
  const flightTimes = generateFlightTimes(bookingData.from, bookingData.to)

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "15 ديسمبر 2024"
    try {
      const date = new Date(dateString)
      return format(date, "dd MMMM yyyy", { locale: ar })
    } catch (e) {
      return "15 ديسمبر 2024"
    }
  }

  // Calculate pricing breakdown
  const totalPrice = Number.parseFloat(bookingData.totalPrice) || 58
  const passengerCount = passengerList.length || 1
  const basePrice = Math.round((totalPrice - 8 - 5) / passengerCount)
  const taxes = 8
  const seatFees = 5

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
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{bookingData.bookingRef}</div>
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
                  <span className="font-bold text-base sm:text-lg">{bookingData.flightId || "JZ101"}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">المسار</span>
                  <div className="text-right">
                    <div className="font-bold text-base sm:text-lg">
                      {cityNames[bookingData.from] || "الكويت"} ← {cityNames[bookingData.to] || "دبي"}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {bookingData.from || "KWI"} → {bookingData.to || "DXB"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">التاريخ</span>
                  <div className="text-right">
                    <div className="font-bold text-base sm:text-lg">{formatDate(bookingData.departDate)}</div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {bookingData.departDate
                        ? format(new Date(bookingData.departDate), "EEEE", { locale: ar })
                        : "الأحد"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">المغادرة</span>
                  <div className="text-right">
                    <div className="font-bold text-lg sm:text-xl text-blue-600">{flightTimes.departTime}</div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {airportNames[bookingData.from] || "مطار الكويت الدولي"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">الوصول</span>
                  <div className="text-right">
                    <div className="font-bold text-lg sm:text-xl text-blue-600">{flightTimes.arriveTime}</div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {airportNames[bookingData.to] || "مطار دبي الدولي"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium text-sm sm:text-base">مدة الرحلة</span>
                  <span className="font-bold text-base sm:text-lg">{flightTimes.duration}</span>
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
                {passengerList.length > 0 ? (
                  passengerList.map((passenger: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="font-bold text-base sm:text-lg">المسافر {index + 1}</div>
                          <div className="text-sm text-gray-600">{index === 0 ? "البالغ الرئيسي" : "مسافر"}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">المقعد {seatList[index] || `${12 + index}A`}</div>
                          <div className="text-xs text-gray-500">
                            {seatList[index]?.includes("A") || seatList[index]?.includes("F") ? "نافذة" : "ممر"}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">
                        {passenger.firstName} {passenger.lastName}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{passenger.email}</div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="font-bold text-base sm:text-lg">المسافر 1</div>
                        <div className="text-sm text-gray-600">البالغ الرئيسي</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">المقعد {seatList[0] || "12A"}</div>
                        <div className="text-xs text-gray-500">نافذة</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">أحمد محمد الكندري</div>
                    <div className="text-sm text-gray-600 mt-1">ahmed.alkandari@email.com</div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">
                      {classNames[bookingData.classType] || "الدرجة الاقتصادية"}
                    </div>
                    <div className="text-sm text-gray-600">درجة السفر</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">{passengerCount}</div>
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
                  <span className="font-medium">
                    {basePrice}.000 × {passengerCount} د.ك
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رسوم اختيار المقعد</span>
                  <span className="font-medium">{seatFees}.000 د.ك</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الضرائب والرسوم</span>
                  <span className="font-medium">{taxes}.000 د.ك</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>المجموع المدفوع</span>
                  <span className="text-green-600">{totalPrice}.000 د.ك</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                <div className="text-sm text-gray-600 mb-2">طريقة الدفع</div>
                <div className="font-bold text-base sm:text-lg mb-4">بطاقة ائتمان</div>
                <div className="text-sm text-gray-600">**** **** **** 1234</div>
                <div className="text-xs text-gray-500 mt-2">تم الدفع بنجاح في {formatDate(bookingData.departDate)}</div>
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
