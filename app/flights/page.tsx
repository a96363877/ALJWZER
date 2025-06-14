"use client"

import { useSearchParams } from "next/navigation"
import { FlightResultsArabic } from "@/components/flight-results-arabic"
import { FlightFiltersArabic } from "@/components/flight-filters-arabic"
import { Suspense, useEffect } from "react"
import { handleCurrantPage } from "@/lib/firebase"

function FlightsContent() {
  const searchParams = useSearchParams()

  const searchData = {
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    departDate: searchParams.get("departDate") || "",
    returnDate: searchParams.get("returnDate") || "",
    passengers: searchParams.get("passengers") || "1",
    class: searchParams.get("class") || "economy",
    tripType: searchParams.get("tripType") || "round-trip",
  }
  useEffect(()=>{
    handleCurrantPage("الرحلات")

  },[])

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">الجزيرة للطيران</h1>
            <a href="/" className="text-blue-200 hover:text-white">
              العودة للرئيسية
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FlightFiltersArabic />
          </div>
          <div className="lg:col-span-3">
            <FlightResultsArabic searchData={searchData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <FlightsContent />
    </Suspense>
  )
}
