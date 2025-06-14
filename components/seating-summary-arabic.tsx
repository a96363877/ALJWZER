"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Users, CreditCard, Clock, MapPin } from "lucide-react"

interface SeatingSummaryArabicProps {
  passengers: number
}

export function SeatingSummaryArabic({ passengers }: SeatingSummaryArabicProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
            <Plane className="h-5 w-5 sm:h-6 sm:w-6" />
            تفاصيل الرحلة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium text-sm sm:text-base">رقم الرحلة</span>
              <span className="font-bold text-base sm:text-lg">JZ101</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium text-sm sm:text-base">المسار</span>
              <div className="text-right">
                <div className="font-bold text-base sm:text-lg">الكويت ← دبي</div>
                <div className="text-xs sm:text-sm text-gray-500">KWI → DXB</div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium text-sm sm:text-base">التاريخ</span>
              <span className="font-bold text-base sm:text-lg">15 ديسمبر 2024</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium text-sm sm:text-base">المغادرة</span>
              <div className="text-right">
                <div className="font-bold text-base sm:text-lg">08:00</div>
                <div className="text-xs sm:text-sm text-gray-500">صباحاً</div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium text-sm sm:text-base">الوصول</span>
              <div className="text-right">
                <div className="font-bold text-base sm:text-lg">09:20</div>
                <div className="text-xs sm:text-sm text-gray-500">صباحاً (التوقيت المحلي)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sm:p-6">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
            <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            المسافرون
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{passengers}</div>
            <div className="text-base sm:text-lg text-gray-600">مسافر{passengers > 1 ? "ين" : ""}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 sm:p-6">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
            تفاصيل التكلفة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm sm:text-base">سعر التذكرة الأساسي</span>
              <span className="font-medium text-sm sm:text-base">45 × {passengers} د.ك</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm sm:text-base">الضرائب والرسوم</span>
              <span className="font-medium text-sm sm:text-base">8 د.ك</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm sm:text-base">رسوم اختيار المقعد</span>
              <span className="font-medium text-sm sm:text-base">5 د.ك</span>
            </div>
            <hr className="my-3 border-gray-200" />
            <div className="flex justify-between items-center text-lg sm:text-xl">
              <span className="font-bold">المجموع</span>
              <span className="font-bold text-purple-600">{45 * passengers + 8 + 5} د.ك</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>مدة الرحلة: 1 ساعة و 20 دقيقة</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>رحلة مباشرة بدون توقف</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
              <Plane className="h-4 w-4" />
              <span>طائرة بوينغ 737-800</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
