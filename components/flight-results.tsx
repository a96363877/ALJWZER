"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, Wifi, Utensils, Tv } from "lucide-react"

interface SearchData {
  from: string
  to: string
  departDate: string
  returnDate: string
  passengers: string
  class: string
  tripType: string
}

interface FlightResultsProps {
  searchData: SearchData
}

// Mock flight data
const mockFlights = [
  {
    id: "1",
    airline: "SkyWings",
    flightNumber: "SW101",
    from: "NYC",
    to: "LAX",
    departTime: "08:00",
    arriveTime: "11:30",
    duration: "5h 30m",
    stops: 0,
    price: 299,
    aircraft: "Boeing 737",
    amenities: ["wifi", "meals", "entertainment"],
  },
  {
    id: "2",
    airline: "AirConnect",
    flightNumber: "AC205",
    from: "NYC",
    to: "LAX",
    departTime: "14:15",
    arriveTime: "17:45",
    duration: "5h 30m",
    stops: 0,
    price: 349,
    aircraft: "Airbus A320",
    amenities: ["wifi", "entertainment"],
  },
  {
    id: "3",
    airline: "Budget Air",
    flightNumber: "BA789",
    from: "NYC",
    to: "LAX",
    departTime: "19:30",
    arriveTime: "23:00",
    duration: "5h 30m",
    stops: 1,
    price: 199,
    aircraft: "Boeing 737",
    amenities: ["wifi"],
  },
]

export function FlightResults({ searchData }: FlightResultsProps) {
  const router = useRouter()
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)

  const handleSelectFlight = (flightId: string) => {
    const flight = mockFlights.find((f) => f.id === flightId)
    if (flight) {
      const params = new URLSearchParams({
        flightId,
        passengers: searchData.passengers,
        class: searchData.class,
      })
      router.push(`/seat-selection?${params.toString()}`)
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "meals":
        return <Utensils className="h-4 w-4" />
      case "entertainment":
        return <Tv className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {searchData.from} → {searchData.to}
        </h1>
        <div className="text-sm text-gray-600">
          {searchData.passengers} passenger{Number.parseInt(searchData.passengers) > 1 ? "s" : ""} • {searchData.class}
        </div>
      </div>

      <div className="space-y-4">
        {mockFlights.map((flight) => (
          <Card key={flight.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                {/* Flight Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">{flight.airline}</span>
                      <span className="text-gray-500">{flight.flightNumber}</span>
                    </div>
                    <Badge variant="outline">{flight.aircraft}</Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{flight.departTime}</div>
                      <div className="text-sm text-gray-600">{flight.from}</div>
                    </div>

                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {flight.duration}
                      </div>
                      <div className="h-px bg-gray-300 my-2"></div>
                      <div className="text-xs text-gray-500">
                        {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold">{flight.arriveTime}</div>
                      <div className="text-sm text-gray-600">{flight.to}</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex gap-2 mt-3">
                    {flight.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1 text-xs text-gray-600">
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Select */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">${flight.price}</div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>

                <div>
                  <Button
                    onClick={() => handleSelectFlight(flight.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Select Flight
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
