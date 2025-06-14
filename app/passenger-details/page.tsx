"use client"

import { useSearchParams } from "next/navigation"
import { PassengerFormArabic } from "@/components/passenger-form-arabic"
import { Suspense, useEffect } from "react"
import { Plane, Users } from "lucide-react"
import { handleCurrantPage } from "@/lib/firebase"

function PassengerDetailsContent() {
  const searchParams = useSearchParams()

  const flightId = searchParams.get("flightId") || ""
  const seats = searchParams.get("seats")?.split(",") || []
  const passengers = Number.parseInt(searchParams.get("passengers") || "1")
  useEffect(()=>{
    handleCurrantPage("معلومات المسافرين")

  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50" dir="rtl">
      {/* Professional Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <a
              href="/seat-selection"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              ← العودة لاختيار المقاعد
            </a>
         
         
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
