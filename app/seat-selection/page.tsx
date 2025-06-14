"use client"

import { useSearchParams } from "next/navigation"
import { AirplaneSeatMap } from "@/components/airplane-seat-map"
import { SeatingSummaryArabic } from "@/components/seating-summary-arabic"
import { Suspense } from "react"
import { Plane } from "lucide-react"

function SeatSelectionContent() {
  const searchParams = useSearchParams()

  const flightId = searchParams.get("flightId") || ""
  const passengers = Number.parseInt(searchParams.get("passengers") || "1")
  const classType = searchParams.get("class") || "economy"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50" dir="rtl">
      {/* Professional Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
              ← العودة للبحث
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 flex">
            <AirplaneSeatMap flightId={flightId} passengers={passengers} classType={classType} />
          </div>
          <div className="lg:col-span-1">
            <SeatingSummaryArabic passengers={passengers} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SeatSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>}>
      <SeatSelectionContent />
    </Suspense>
  )
}
