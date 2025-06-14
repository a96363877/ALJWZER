"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Plane, Users, CreditCard, MapPin, Star, Coffee, Monitor } from "lucide-react"

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
  amenities?: string[]
}

export function SeatMap({ flightId, passengers, classType }: SeatMapProps) {
  const router = useRouter()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

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
          amenities: ["Lie-flat seat", "Personal suite", "Premium dining", "Dedicated service"],
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
          amenities: ["Flat-bed seat", "Premium meal", "Priority check-in"],
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
          amenities: ["Enhanced meal", "Priority boarding", "Extra baggage"],
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
          amenities: isExit ? ["Extra legroom", "Emergency exit access"] : ["Standard seat"],
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
    if (seat.status === "occupied") return "bg-slate-300 text-slate-500 cursor-not-allowed border-slate-300"
    if (selectedSeats.includes(seat.id)) return "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"

    switch (seat.type) {
      case "first":
        return "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-300 text-purple-800 hover:shadow-md hover:scale-105"
      case "business":
        return "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-300 text-blue-800 hover:shadow-md hover:scale-105"
      case "premium":
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border-emerald-300 text-emerald-800 hover:shadow-md hover:scale-105"
      default:
        return "bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-slate-300 text-slate-700 hover:shadow-md hover:scale-105"
    }
  }

  const getClassIcon = (type: string) => {
    switch (type) {
      case "first":
        return <Star className="w-3 h-3" />
      case "business":
        return <Monitor className="w-3 h-3" />
      case "premium":
        return <Coffee className="w-3 h-3" />
      default:
        return <Plane className="w-3 h-3" />
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

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find((s) => s.id === seatId)
    return sum + (seat?.price || 0)
  }, 0)

  const hoveredSeatData = hoveredSeat ? seats.find((s) => s.id === hoveredSeat) : null

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-y-4 flex-col">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-slate-600 font-medium">Loading seat map...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
      {/* Header Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800">Select Your Seats</CardTitle>
                <p className="text-slate-600 text-xs sm:text-sm">Choose the perfect seats for your journey</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Badge variant="outline" className="bg-white/50 border-blue-200 text-xs sm:text-sm">
              <Users className="w-3 h-3 mr-1" />
              {selectedSeats.length}/{passengers} selected
            </Badge>
            {totalPrice > 0 && (
              <Badge variant="outline" className="bg-white/50 border-green-200 text-xs sm:text-sm">
                <CreditCard className="w-3 h-3 mr-1" />
                +${totalPrice}
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Legend - Responsive Grid */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50 rounded-lg">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded flex items-center justify-center flex-shrink-0">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-xs sm:text-sm truncate">First Class</p>
                <p className="text-xs text-slate-600">+$200</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50 rounded-lg">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded flex items-center justify-center flex-shrink-0">
                <Monitor className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-xs sm:text-sm truncate">Business</p>
                <p className="text-xs text-slate-600">+$100</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50 rounded-lg">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-300 rounded flex items-center justify-center flex-shrink-0">
                <Coffee className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-xs sm:text-sm truncate">Premium</p>
                <p className="text-xs text-slate-600">+$50</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50 rounded-lg">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 rounded flex items-center justify-center flex-shrink-0">
                <Plane className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-xs sm:text-sm truncate">Economy</p>
                <p className="text-xs text-slate-600">Standard</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content - Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Seat Map - Takes full width on mobile, 3/4 on desktop */}
        <div className="xl:col-span-3">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-3 sm:p-6">
              <div className="max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto border-2 border-slate-200 rounded-xl p-2 sm:p-4 bg-gradient-to-b from-slate-50 to-white">
                <div className="min-w-fit space-y-0.5 sm:space-y-1">
                  {Object.entries(groupedSeats).map(([rowNum, rowSeats]) => {
                    const row = Number.parseInt(rowNum)
                    const leftSeats = rowSeats.slice(0, 2)
                    const rightSeats = rowSeats.slice(3, 6)

                    return (
                      <div key={row} className="flex items-center gap-2 sm:gap-4">
                        <div className="w-6 sm:w-8 text-center text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 rounded px-1 sm:px-2 py-1 flex-shrink-0">
                          {row}
                        </div>
                        <div className="flex gap-0.5 sm:gap-1">
                          {leftSeats.map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id)}
                              onMouseEnter={() => setHoveredSeat(seat.id)}
                              onMouseLeave={() => setHoveredSeat(null)}
                              className={cn(
                                "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg border-2 text-xs font-bold transition-all duration-200 flex items-center justify-center relative touch-manipulation",
                                getSeatColor(seat),
                              )}
                              disabled={seat.status === "occupied"}
                            >
                              {seat.letter}
                              {seat.features?.includes("Exit row") && (
                                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">!</span>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                        <div className="w-4 sm:w-8 flex justify-center flex-shrink-0">
                          <div className="w-0.5 h-4 sm:h-6 bg-slate-300 rounded-full"></div>
                        </div>
                        <div className="flex gap-0.5 sm:gap-1">
                          {rightSeats.map((seat) => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id)}
                              onMouseEnter={() => setHoveredSeat(seat.id)}
                              onMouseLeave={() => setHoveredSeat(null)}
                              className={cn(
                                "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg border-2 text-xs font-bold transition-all duration-200 flex items-center justify-center relative touch-manipulation",
                                getSeatColor(seat),
                              )}
                              disabled={seat.status === "occupied"}
                            >
                              {seat.letter}
                              {seat.features?.includes("Exit row") && (
                                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">!</span>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Separator className="my-4 sm:my-6" />

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-slate-600">
                  {selectedSeats.length === passengers ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      All seats selected
                    </div>
                  ) : (
                    `Select ${passengers - selectedSeats.length} more seat${passengers - selectedSeats.length > 1 ? "s" : ""} to continue`
                  )}
                </div>
                <Button
                  onClick={handleContinue}
                  disabled={selectedSeats.length !== passengers}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto min-h-[48px] sm:min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Continue to Passenger Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Stacks below on mobile, sidebar on desktop */}
        <div className="xl:col-span-1 space-y-4">
          {/* Hovered Seat Details */}
          {hoveredSeatData && (
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  {getClassIcon(hoveredSeatData.type)}
                  Seat {hoveredSeatData.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize text-sm">{hoveredSeatData.type} Class</span>
                  {hoveredSeatData.price > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      +${hoveredSeatData.price}
                    </Badge>
                  )}
                </div>
                {hoveredSeatData.amenities && (
                  <div>
                    <p className="font-medium text-xs sm:text-sm mb-2">Amenities:</p>
                    <div className="space-y-1">
                      {hoveredSeatData.amenities.slice(0, 3).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                      {hoveredSeatData.amenities.length > 3 && (
                        <p className="text-xs text-slate-500">+{hoveredSeatData.amenities.length - 3} more</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Selected Seats Summary */}
          {selectedSeats.length > 0 && (
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="text-base sm:text-lg">Selected Seats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-0">
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedSeats.map((seatId) => {
                    const seat = seats.find((s) => s.id === seatId)
                    return seat ? (
                      <div key={seatId} className="flex items-center justify-between">
                        <span className="font-medium text-sm">{seat.id}</span>
                        <div className="flex items-center gap-2">
                          {seat.price > 0 && <span className="text-xs">+${seat.price}</span>}
                          <div className="w-4 h-4 flex items-center justify-center">{getClassIcon(seat.type)}</div>
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>Total Extra Cost:</span>
                  <span>${totalPrice}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mobile-only quick stats */}
          <div className="xl:hidden">
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{selectedSeats.length}</p>
                    <p className="text-xs text-slate-600">Seats Selected</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">${totalPrice}</p>
                    <p className="text-xs text-slate-600">Extra Cost</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
