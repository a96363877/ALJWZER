"use client"

import { useSearchParams } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { Suspense, useEffect } from "react"
import { handleCurrantPage } from "@/lib/firebase"

function CheckoutContent() {
  const searchParams = useSearchParams()

  const flightId = searchParams.get("flightId") || ""
  const seats = searchParams.get("seats")?.split(",") || []
  const passengersData = searchParams.get("passengers") || "[]"

  let passengers = []
  try {
    passengers = JSON.parse(passengersData)
  } catch (e) {
    passengers = []
  }
  useEffect(()=>{
    handleCurrantPage("الدفع")

  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutForm flightId={flightId} seats={seats} passengers={passengers} />
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
