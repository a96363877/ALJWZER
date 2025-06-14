"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Users, CreditCard } from "lucide-react"

interface SeatingSummaryProps {
  passengers: number
}

export function SeatingSummary({ passengers }: SeatingSummaryProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Flight Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Flight</span>
              <span className="font-medium">SW101</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Route</span>
              <span className="font-medium">NYC → LAX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">Dec 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-medium">08:00 - 11:30</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Passengers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-center">
            {passengers} Passenger{passengers > 1 ? "s" : ""}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Base fare</span>
              <span>$299 × {passengers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & fees</span>
              <span>$45</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${299 * passengers + 45}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
