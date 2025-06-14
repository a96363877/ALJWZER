"use client"

import { useSearchParams } from "next/navigation"
import { ConfirmationPageArabic } from "@/components/confirmation-page-arabic"
import { Suspense } from "react"

function ConfirmationContent() {
  const searchParams = useSearchParams()

  const bookingData = {
    bookingRef: searchParams.get("booking") || "JZ123456",
    flightId: searchParams.get("flightId") || "",
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    departDate: searchParams.get("departDate") || "",
    returnDate: searchParams.get("returnDate") || "",
    passengers: searchParams.get("passengers") || "[]",
    seats: searchParams.get("seats") || "",
    classType: searchParams.get("class") || "economy",
    totalPrice: searchParams.get("totalPrice") || "58",
  }

  return <ConfirmationPageArabic bookingData={bookingData} />
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xl">جاري التحميل...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
