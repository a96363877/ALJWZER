"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, User } from "lucide-react"
import { format } from "date-fns"

interface PassengerFormProps {
  flightId: string
  seats: string[]
  passengers: number
}

interface PassengerData {
  firstName: string
  lastName: string
  dateOfBirth: Date | undefined
  gender: string
  email: string
  phone: string
  passportNumber: string
  nationality: string
}

export function PassengerForm({ flightId, seats, passengers }: PassengerFormProps) {
  const router = useRouter()
  const [passengerData, setPassengerData] = useState<PassengerData[]>(
    Array.from({ length: passengers }, () => ({
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      gender: "",
      email: "",
      phone: "",
      passportNumber: "",
      nationality: "",
    })),
  )

  const updatePassenger = (index: number, field: keyof PassengerData, value: any) => {
    const updated = [...passengerData]
    updated[index] = { ...updated[index], [field]: value }
    setPassengerData(updated)
  }

  const handleContinue = () => {
    // Validate all required fields
    const isValid = passengerData.every(
      (passenger) =>
        passenger.firstName && passenger.lastName && passenger.dateOfBirth && passenger.gender && passenger.email,
    )

    if (isValid) {
      const params = new URLSearchParams({
        flightId,
        seats: seats.join(","),
        passengers: JSON.stringify(passengerData),
      })
      router.push(`/checkout?${params.toString()}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Passenger Details</h1>
        <p className="text-gray-600 mt-2">Please provide information for all passengers</p>
      </div>

      {passengerData.map((passenger, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Passenger {index + 1} - Seat {seats[index]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                <Input
                  id={`firstName-${index}`}
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(index, "firstName", e.target.value)}
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                <Input
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(index, "lastName", e.target.value)}
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <Label>Date of Birth *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {passenger.dateOfBirth ? format(passenger.dateOfBirth, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={passenger.dateOfBirth}
                      onSelect={(date) => updatePassenger(index, "dateOfBirth", date)}
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Gender *</Label>
                <Select value={passenger.gender} onValueChange={(value) => updatePassenger(index, "gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor={`email-${index}`}>Email *</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={passenger.email}
                  onChange={(e) => updatePassenger(index, "email", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                <Input
                  id={`phone-${index}`}
                  value={passenger.phone}
                  onChange={(e) => updatePassenger(index, "phone", e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <Label htmlFor={`passport-${index}`}>Passport Number</Label>
                <Input
                  id={`passport-${index}`}
                  value={passenger.passportNumber}
                  onChange={(e) => updatePassenger(index, "passportNumber", e.target.value)}
                  placeholder="Enter passport number"
                />
              </div>

              <div>
                <Label>Nationality</Label>
                <Select
                  value={passenger.nationality}
                  onValueChange={(value) => updatePassenger(index, "nationality", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center">
        <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 px-8 py-3" size="lg">
          Continue to Payment
        </Button>
      </div>
    </div>
  )
}
