"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, Plane, Users } from "lucide-react"

interface CheckoutFormProps {
  flightId: string
  seats: string[]
  passengers: any[]
}

export function CheckoutForm({ flightId, seats, passengers }: CheckoutFormProps) {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const baseFare = 45
  const taxes = 8
  const seatFees = seats.length * 5
  const total = baseFare * passengers.length + taxes + seatFees

  const handlePayment = async () => {
    if (!agreeToTerms) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate booking reference
    const bookingRef = "JZ" + Math.random().toString(36).substr(2, 6).toUpperCase()

    // Pass all booking data to confirmation page
    const confirmationParams = new URLSearchParams({
      booking: bookingRef,
      flightId,
      from: "KWI", // This should come from the actual search data
      to: "DXB", // This should come from the actual search data
      departDate: new Date().toISOString(),
      seats: seats.join(","),
      passengers: JSON.stringify(passengers),
      class: "economy", // This should come from the actual booking data
      totalPrice: total.toString(),
    })

    router.push(`/confirmation?${confirmationParams.toString()}`)
  }

  const updatePaymentData = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Payment Form */}
      <div className="lg:col-span-2 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">Secure payment powered by industry-leading encryption</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => updatePaymentData("cardNumber", e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => updatePaymentData("expiryDate", e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={paymentData.cvv}
                  onChange={(e) => updatePaymentData("cvv", e.target.value)}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                value={paymentData.cardholderName}
                onChange={(e) => updatePaymentData("cardholderName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="billingAddress">Address</Label>
              <Input
                id="billingAddress"
                value={paymentData.billingAddress}
                onChange={(e) => updatePaymentData("billingAddress", e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={paymentData.city}
                  onChange={(e) => updatePaymentData("city", e.target.value)}
                  placeholder="Kuwait City"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={paymentData.zipCode}
                  onChange={(e) => updatePaymentData("zipCode", e.target.value)}
                  placeholder="12345"
                />
              </div>
            </div>

            <div>
              <Label>Country</Label>
              <Select value={paymentData.country} onValueChange={(value) => updatePaymentData("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kw">Kuwait</SelectItem>
                  <SelectItem value="sa">Saudi Arabia</SelectItem>
                  <SelectItem value="ae">UAE</SelectItem>
                  <SelectItem value="qa">Qatar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
          <Label htmlFor="terms" className="text-sm">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>

        <Button
          onClick={handlePayment}
          disabled={!agreeToTerms || isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
        >
          <Lock className="mr-2 h-5 w-5" />
          {isProcessing ? "Processing Payment..." : `Pay ${total} KD`}
        </Button>
      </div>

      {/* Booking Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Flight Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Flight</span>
              <span className="font-medium">JZ101</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Route</span>
              <span className="font-medium">KWI → DXB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">Dec 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-medium">08:00 - 09:20</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Passengers & Seats
            </CardTitle>
          </CardHeader>
          <CardContent>
            {passengers.map((passenger, index) => (
              <div key={index} className="flex justify-between py-2">
                <span>
                  {passenger.firstName} {passenger.lastName}
                </span>
                <span className="font-medium">Seat {seats[index]}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Base fare</span>
              <span>
                {baseFare} KD × {passengers.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Seat selection</span>
              <span>{seatFees} KD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & fees</span>
              <span>{taxes} KD</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{total} KD</span>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-gray-500 text-center">
          <Lock className="h-4 w-4 inline mr-1" />
          Your payment information is encrypted and secure
        </div>
      </div>
    </div>
  )
}
