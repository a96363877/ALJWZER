"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Plane, Users, Crown, Star, Zap, ChevronLeft, ChevronRight } from "lucide-react"

interface AirplaneSeatMapProps {
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
  position: "window" | "middle" | "aisle"
}

export function AirplaneSeatMap({ flightId, passengers, classType }: AirplaneSeatMapProps) {
  const router = useRouter()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [currentSection, setCurrentSection] = useState(0)

  // Generate airplane-shaped seat layout
  const generateAirplaneSeats = (): Seat[] => {
    const seats: Seat[] = []
    const letters = ["A", "B", "C", "D", "E", "F"]

    // First Class (rows 1-3) - 2-2 configuration
    for (let row = 1; row <= 3; row++) {
      const firstClassLetters = ["A", "B", "E", "F"]
      firstClassLetters.forEach((letter, index) => {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: "first",
          status: Math.random() > 0.8 ? "occupied" : "available",
          price: 200,
          features: ["مقعد مسطح", "وجبة فاخرة", "أولوية الصعود", "مساحة إضافية"],
          position: index === 0 || index === 3 ? "window" : "aisle",
        })
      })
    }

    // Business Class (rows 5-8) - 2-2 configuration
    for (let row = 5; row <= 8; row++) {
      const businessLetters = ["A", "B", "E", "F"]
      businessLetters.forEach((letter, index) => {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: "business",
          status: Math.random() > 0.7 ? "occupied" : "available",
          price: 100,
          features: ["مقعد مريح", "وجبة مميزة", "أولوية الصعود"],
          position: index === 0 || index === 3 ? "window" : "aisle",
        })
      })
    }

    // Premium Economy (rows 10-13) - 3-3 configuration
    for (let row = 10; row <= 13; row++) {
      letters.forEach((letter, index) => {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: "premium",
          status: Math.random() > 0.6 ? "occupied" : "available",
          price: 50,
          features: ["مساحة إضافية للأرجل", "وجبة محسنة"],
          position: index === 0 || index === 5 ? "window" : index === 2 || index === 3 ? "aisle" : "middle",
        })
      })
    }

    // Economy (rows 15-35) - 3-3 configuration
    for (let row = 15; row <= 35; row++) {
      letters.forEach((letter, index) => {
        const isExit = row === 18 || row === 28
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          type: "economy",
          status: Math.random() > 0.5 ? "occupied" : "available",
          price: isExit ? 25 : 0,
          features: isExit ? ["مخرج طوارئ", "مساحة إضافية"] : undefined,
          position: index === 0 || index === 5 ? "window" : index === 2 || index === 3 ? "aisle" : "middle",
        })
      })
    }

    return seats
  }

  const [seats] = useState<Seat[]>(generateAirplaneSeats())

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
    if (seat.status === "occupied") return "bg-gray-400 cursor-not-allowed text-white"
    if (selectedSeats.includes(seat.id)) return "bg-blue-600 text-white shadow-lg ring-2 ring-blue-300"

    switch (seat.type) {
      case "first":
        return "bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 border-purple-400 text-purple-800"
      case "business":
        return "bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 border-blue-400 text-blue-800"
      case "premium":
        return "bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 border-green-400 text-green-800"
      default:
        return "bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-400 text-gray-800"
    }
  }

  const getSeatIcon = (seat: Seat) => {
    switch (seat.type) {
      case "first":
        return <Crown className="h-2 w-2 sm:h-3 sm:w-3" />
      case "business":
        return <Star className="h-2 w-2 sm:h-3 sm:w-3" />
      case "premium":
        return <Zap className="h-2 w-2 sm:h-3 sm:w-3" />
      default:
        return null
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

  const getRowConfiguration = (row: number) => {
    if (row <= 3) return { left: 2, right: 2 } // First class 2-2
    if (row <= 8) return { left: 2, right: 2 } // Business 2-2
    return { left: 3, right: 3 } // Economy/Premium 3-3
  }

  // Group rows into sections for mobile navigation
  const sections = [
    { name: "الدرجة الأولى", rows: [1, 2, 3], color: "purple" },
    { name: "درجة الأعمال", rows: [5, 6, 7, 8], color: "blue" },
    { name: "الدرجة المميزة", rows: [10, 11, 12, 13], color: "green" },
    { name: "الدرجة الاقتصادية", rows: Array.from({ length: 21 }, (_, i) => i + 15), color: "gray" },
  ]

  const currentSectionRows = sections[currentSection]?.rows || []
  const filteredRows = Object.entries(groupedSeats)
    .filter(([rowNum]) => currentSectionRows.includes(Number.parseInt(rowNum)))
    .sort(([a], [b]) => Number.parseInt(a) - Number.parseInt(b))

  return (
    <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-8">
        <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xl sm:text-2xl">
          <div className="flex items-center gap-3">
            <Plane className="h-6 w-6 sm:h-8 sm:w-8" />
            <span>اختر مقاعدك المفضلة</span>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2">
            {selectedSeats.length}/{passengers} محدد
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-8">
        {/* Enhanced Legend */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-6 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-400 rounded-lg flex items-center justify-center">
              <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium">الأولى (+200)</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-400 rounded-lg flex items-center justify-center">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium">الأعمال (+100)</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-100 to-green-200 border border-green-400 rounded-lg flex items-center justify-center">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium">المميزة (+50)</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-400 rounded-lg"></div>
            <span className="text-xs sm:text-sm font-medium">الاقتصادية</span>
          </div>
        </div>

        {/* Mobile Section Navigation */}
        <div className="block sm:hidden mb-6">
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="font-medium text-sm">{sections[currentSection]?.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
              disabled={currentSection === sections.length - 1}
              className="p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Airplane Shape Seat Map */}
        <div className="relative">
          {/* Airplane Nose */}
          <div className="w-20 h-10 sm:w-32 sm:h-16 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-full mx-auto mb-4 flex items-center justify-center">
            <Plane className="h-4 w-4 sm:h-8 sm:w-8 text-blue-600" />
          </div>

          {/* Seat Map Container */}
          <div className="max-h-64 sm:max-h-96 overflow-y-auto border-2 sm:border-4 border-blue-200 rounded-2xl sm:rounded-3xl p-3 sm:p-6 bg-gradient-to-b from-blue-50 to-white">
            {/* Desktop: Show all rows */}
            <div className="hidden sm:block">
              {Object.entries(groupedSeats)
                .sort(([a], [b]) => Number.parseInt(a) - Number.parseInt(b))
                .map(([rowNum, rowSeats]) => {
                  const row = Number.parseInt(rowNum)
                  const config = getRowConfiguration(row)
                  const leftSeats = rowSeats.slice(0, config.left)
                  const rightSeats = rowSeats.slice(config.left)

                  return (
                    <div key={row} className="flex items-center gap-4 sm:gap-6 mb-2 sm:mb-3">
                      {/* Row Number */}
                      <div className="w-8 sm:w-12 text-center text-sm sm:text-lg font-bold text-gray-600 bg-gray-100 rounded-lg py-1 sm:py-2">
                        {row}
                      </div>

                      {/* Left Seats */}
                      <div className="flex gap-1 sm:gap-2">
                        {leftSeats.map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            className={cn(
                              "w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border-2 text-xs sm:text-sm font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center relative",
                              getSeatColor(seat),
                            )}
                            disabled={seat.status === "occupied"}
                            title={`${seat.id} - ${seat.features?.join(", ") || "مقعد عادي"}`}
                          >
                            <div className="flex flex-col items-center">
                              {getSeatIcon(seat)}
                              <span className="text-xs">{seat.letter}</span>
                            </div>
                            {seat.price > 0 && (
                              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 text-yellow-900 text-xs rounded-full w-3 h-3 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                                +
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Aisle */}
                      <div className="w-6 sm:w-12 flex justify-center">
                        <div className="w-1 h-6 sm:h-8 bg-blue-200 rounded-full"></div>
                      </div>

                      {/* Right Seats */}
                      <div className="flex gap-1 sm:gap-2">
                        {rightSeats.map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            className={cn(
                              "w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border-2 text-xs sm:text-sm font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center relative",
                              getSeatColor(seat),
                            )}
                            disabled={seat.status === "occupied"}
                            title={`${seat.id} - ${seat.features?.join(", ") || "مقعد عادي"}`}
                          >
                            <div className="flex flex-col items-center">
                              {getSeatIcon(seat)}
                              <span className="text-xs">{seat.letter}</span>
                            </div>
                            {seat.price > 0 && (
                              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 text-yellow-900 text-xs rounded-full w-3 h-3 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                                +
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
            </div>

            {/* Mobile: Show current section only */}
            <div className="block sm:hidden">
              {filteredRows.map(([rowNum, rowSeats]) => {
                const row = Number.parseInt(rowNum)
                const config = getRowConfiguration(row)
                const leftSeats = rowSeats.slice(0, config.left)
                const rightSeats = rowSeats.slice(config.left)

                return (
                  <div key={row} className="flex items-center gap-2 mb-2">
                    {/* Row Number */}
                    <div className="w-8 text-center text-sm font-bold text-gray-600 bg-gray-100 rounded-lg py-1">
                      {row}
                    </div>

                    {/* Left Seats */}
                    <div className="flex gap-1">
                      {leftSeats.map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          className={cn(
                            "w-8 h-8 rounded-lg border-2 text-xs font-bold transition-all duration-200 flex items-center justify-center relative",
                            getSeatColor(seat),
                          )}
                          disabled={seat.status === "occupied"}
                        >
                          <div className="flex flex-col items-center">
                            {getSeatIcon(seat)}
                            <span className="text-xs">{seat.letter}</span>
                          </div>
                          {seat.price > 0 && (
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs rounded-full w-3 h-3 flex items-center justify-center font-bold">
                              +
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Aisle */}
                    <div className="w-4 flex justify-center">
                      <div className="w-1 h-6 bg-blue-200 rounded-full"></div>
                    </div>

                    {/* Right Seats */}
                    <div className="flex gap-1">
                      {rightSeats.map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          className={cn(
                            "w-8 h-8 rounded-lg border-2 text-xs font-bold transition-all duration-200 flex items-center justify-center relative",
                            getSeatColor(seat),
                          )}
                          disabled={seat.status === "occupied"}
                        >
                          <div className="flex flex-col items-center">
                            {getSeatIcon(seat)}
                            <span className="text-xs">{seat.letter}</span>
                          </div>
                          {seat.price > 0 && (
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs rounded-full w-3 h-3 flex items-center justify-center font-bold">
                              +
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

          {/* Airplane Tail */}
          <div className="w-16 h-8 sm:w-24 sm:h-12 bg-gradient-to-t from-blue-200 to-blue-300 rounded-b-full mx-auto mt-4"></div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-6 bg-blue-50 rounded-2xl">
          <div className="text-sm sm:text-lg text-gray-700 text-center sm:text-right">
            اختر {passengers} مقعد{passengers > 1 ? "" : ""} للمتابعة
          </div>
          <Button
            onClick={handleContinue}
            disabled={selectedSeats.length !== passengers}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Users className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            متابعة إلى بيانات المسافرين
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
