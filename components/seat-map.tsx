"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SeatMapProps {
  flightId: string
  passengers: number
  classType: string
}

interface Seat {
  id: string
  row: number
  letter: string
  type: "economy" | "premium" | "business" | "first"
  status: "available" | "occupied" | "selected"
  price: number
  features?: string[]
}

export function SeatMap({ flightId, passengers, classType }: SeatMapProps) {
  const router = useRouter()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  // Generate mock seat data
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = []
    const letters = ["A", "B", "C", "D", "E", "F"]

    // First Class (rows 1-3)
    for (let row = 1; row <= 3; row++) {
      for (let i = 0; i < 4; i++) {
        const letter = letters[i]
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: "first",
          status: Math.random() > 0.7 ? "occupied" : "available",
          price: 200,
          features: ["Extra legroom", "Priority boarding", "Premium meal"],
        })
      }
    }

    // Business Class (rows 4-8)
    for (let row = 4; row <= 8; row++) {
      for (let i = 0; i < 4; i++) {
        const letter = letters[i]
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: "business",
          status: Math.random() > 0.6 ? "occupied" : "available",
          price: 100,
          features: ["Extra legroom", "Priority boarding"],
        })
      }
    }

    // Premium Economy (rows 9-12)
    for (let row = 9; row <= 12; row++) {
      for (const letter of letters) {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: "premium",
          status: Math.random() > 0.5 ? "occupied" : "available",
          price: 50,
          features: ["Extra legroom"],
        })
      }
    }

    // Economy (rows 13-35)
    for (let row = 13; row <= 35; row++) {
      for (const letter of letters) {
        const isExit = row === 15 || row === 25
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: "economy",
          status: Math.random() > 0.4 ? "occupied" : "available",
          price: isExit ? 25 : 0,
          features: isExit ? ["Exit row", "Extra legroom"] : undefined,
        })
      }
    }

    return seats
  }

  const [seats] = useState<Seat[]>(generateSeats())

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId)
    if (!seat || seat.status === "occupied") return

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
    } else if (selectedSeats.length < passengers) {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const handleContinue = () => {
    if (selectedSeats.length === passengers) {
      const params = new URLSearchParams({
        flightId,
        seats: selectedSeats.join(","),
        passengers: passengers.toString(),
      })
      router.push(`/passenger-details?${params.toString()}`)
    }
  }

  const getSeatColor = (seat: Seat) => {
    if (seat.status === "occupied") return "bg-gray-400 cursor-not-allowed"
    if (selectedSeats.includes(seat.id)) return "bg-blue-600 text-white"

    switch (seat.type) {
      case "first":
        return "bg-purple-100 hover:bg-purple-200 border-purple-300"
      case "business":
        return "bg-blue-100 hover:bg-blue-200 border-blue-300"
      case "premium":
        return "bg-green-100 hover:bg-green-200 border-green-300"
      default:
        return "bg-gray-100 hover:bg-gray-200 border-gray-300"
    }
  }

  const groupedSeats = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = []
      acc[seat.row].push(seat)
      return acc
    },
    {} as Record<number, Seat[]>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Select Your Seats</span>
          <Badge variant="outline">
            {selectedSeats.length}/{passengers} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
            <span>First Class (+$200)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Business (+$100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Premium (+$50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <span>Economy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Occupied</span>
          </div>
        </div>

        {/* Seat Map */}
        <div className="max-h-96 overflow-y-auto border rounded-lg p-4">
          {Object.entries(groupedSeats).map(([rowNum, rowSeats]) => {
            const row = Number.parseInt(rowNum)
            const leftSeats = rowSeats.slice(0, 3)
            const rightSeats = rowSeats.slice(3, 6)

            return (
              <div key={row} className="flex items-center gap-4 mb-2">
                <div className="w-8 text-center text-sm font-medium">{row}</div>
                <div className="flex gap-1">
                  {leftSeats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      className={cn("w-8 h-8 rounded border text-xs font-medium transition-colors", getSeatColor(seat))}
                      disabled={seat.status === "occupied"}
                      title={`${seat.id} - ${seat.features?.join(", ") || "Standard seat"}`}
                    >
                      {seat.letter}
                    </button>
                  ))}
                </div>
                <div className="w-8"></div> {/* Aisle */}
                <div className="flex gap-1">
                  {rightSeats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      className={cn("w-8 h-8 rounded border text-xs font-medium transition-colors", getSeatColor(seat))}
                      disabled={seat.status === "occupied"}
                      title={`${seat.id} - ${seat.features?.join(", ") || "Standard seat"}`}
                    >
                      {seat.letter}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Select {passengers} seat{passengers > 1 ? "s" : ""} to continue
          </div>
          <Button
            onClick={handleContinue}
            disabled={selectedSeats.length !== passengers}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue to Passenger Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
