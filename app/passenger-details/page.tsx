"use client"

import { useSearchParams } from "next/navigation"
import { PassengerFormArabic } from "@/components/passenger-form-arabic"
import { Suspense } from "react"
import { Plane, Users } from "lucide-react"

function PassengerDetailsContent() {
  const searchParams = useSearchParams()

  const flightId = searchParams.get("flightId") || ""
  const seats = searchParams.get("seats")?.split(",") || []
  const passengers = Number.parseInt(searchParams.get("passengers") || "1")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50" dir="rtl">
      {/* Professional Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a
              href="/seat-selection"
              className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors"
            >
              ← العودة لاختيار المقاعد
            </a>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-900">بيانات المسافرين</div>
              <div className="bg-blue-600 p-2 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">الجزيرة</div>
              <Plane className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PassengerFormArabic flightId={flightId} seats={seats} passengers={passengers} />
      </div>
    </div>
  )
}

export default function PassengerDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xl">جاري التحميل...</div>}>
      <PassengerDetailsContent />
    </Suspense>
  )
}
