"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, ArrowLeftRight } from "lucide-react"
import { format } from "date-fns"

export function FlightSearch() {
  const router = useRouter()
  const [tripType, setTripType] = useState("round-trip")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departDate, setDepartDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState("1")
  const [classType, setClassType] = useState("economy")

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      from,
      to,
      departDate: departDate?.toISOString() || "",
      returnDate: returnDate?.toISOString() || "",
      passengers,
      class: classType,
      tripType,
    })
    router.push(`/flights?${searchParams.toString()}`)
  }

  const swapCities = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        {/* Trip Type Selection */}
        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={tripType === "round-trip"}
              onChange={(e) => setTripType(e.target.value)}
              className="text-blue-600"
            />
            Round Trip
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === "one-way"}
              onChange={(e) => setTripType(e.target.value)}
              className="text-blue-600"
            />
            One Way
          </label>
        </div>

        <div className="grid gap-4">
          {/* From/To Cities */}
          <div className="grid md:grid-cols-2 gap-4 relative">
            <div>
              <Label htmlFor="from">From</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger>
                  <SelectValue placeholder="Select departure city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NYC">New York (NYC)</SelectItem>
                  <SelectItem value="LAX">Los Angeles (LAX)</SelectItem>
                  <SelectItem value="CHI">Chicago (CHI)</SelectItem>
                  <SelectItem value="MIA">Miami (MIA)</SelectItem>
                  <SelectItem value="LAS">Las Vegas (LAS)</SelectItem>
                  <SelectItem value="SFO">San Francisco (SFO)</SelectItem>
                  <SelectItem value="LON">London (LON)</SelectItem>
                  <SelectItem value="PAR">Paris (PAR)</SelectItem>
                  <SelectItem value="TOK">Tokyo (TOK)</SelectItem>
                  <SelectItem value="SYD">Sydney (SYD)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-1/2 top-6 transform -translate-x-1/2 z-10 bg-white border rounded-full"
              onClick={swapCities}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div>
              <Label htmlFor="to">To</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NYC">New York (NYC)</SelectItem>
                  <SelectItem value="LAX">Los Angeles (LAX)</SelectItem>
                  <SelectItem value="CHI">Chicago (CHI)</SelectItem>
                  <SelectItem value="MIA">Miami (MIA)</SelectItem>
                  <SelectItem value="LAS">Las Vegas (LAS)</SelectItem>
                  <SelectItem value="SFO">San Francisco (SFO)</SelectItem>
                  <SelectItem value="LON">London (LON)</SelectItem>
                  <SelectItem value="PAR">Paris (PAR)</SelectItem>
                  <SelectItem value="TOK">Tokyo (TOK)</SelectItem>
                  <SelectItem value="SYD">Sydney (SYD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departDate ? format(departDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={setDepartDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {tripType === "round-trip" && (
              <div>
                <Label>Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) => date < (departDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* Passengers and Class */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Passengers</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                  <SelectItem value="5">5+ Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Class</Label>
              <Select value={classType} onValueChange={setClassType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            disabled={!from || !to || !departDate}
          >
            <Search className="mr-2 h-5 w-5" />
            Search Flights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
