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
import { CalendarIcon, User, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

interface PassengerFormArabicProps {
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

export function PassengerFormArabic({ flightId, seats, passengers }: PassengerFormArabicProps) {
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">بيانات المسافرين</h1>
        <p className="text-xl text-gray-600">يرجى إدخال المعلومات المطلوبة لجميع المسافرين</p>
      </div>

      {passengerData.map((passenger, index) => (
        <Card key={index} className="shadow-xl border-0 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <CardTitle className="flex items-center gap-4 text-2xl">
              <div className="bg-white/20 p-3 rounded-full">
                <User className="h-8 w-8" />
              </div>
              <div>
                <div>المسافر {index + 1}</div>
                <div className="text-lg font-normal opacity-90">المقعد {seats[index]}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor={`firstName-${index}`} className="text-lg font-semibold text-gray-700">
                  الاسم الأول *
                </Label>
                <Input
                  id={`firstName-${index}`}
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(index, "firstName", e.target.value)}
                  placeholder="أدخل الاسم الأول"
                  className="h-14 text-lg border-2 rounded-xl focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor={`lastName-${index}`} className="text-lg font-semibold text-gray-700">
                  اسم العائلة *
                </Label>
                <Input
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(index, "lastName", e.target.value)}
                  placeholder="أدخل اسم العائلة"
                  className="h-14 text-lg border-2 rounded-xl focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-700">تاريخ الميلاد *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-14 justify-start text-right text-lg border-2 rounded-xl hover:border-blue-400"
                    >
                      <CalendarIcon className="ml-4 h-6 w-6 text-blue-600" />
                      {passenger.dateOfBirth
                        ? format(passenger.dateOfBirth, "PPP", { locale: ar })
                        : "اختر تاريخ الميلاد"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-xl">
                    <Calendar
                      mode="single"
                      selected={passenger.dateOfBirth}
                      onSelect={(date) => updatePassenger(index, "dateOfBirth", date)}
                      disabled={(date) => date > new Date()}
                      locale={ar}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-700">الجنس *</Label>
                <Select value={passenger.gender} onValueChange={(value) => updatePassenger(index, "gender", value)}>
                  <SelectTrigger className="h-14 text-lg border-2 rounded-xl">
                    <SelectValue placeholder="اختر الجنس" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="male" className="text-lg py-3">
                      ذكر
                    </SelectItem>
                    <SelectItem value="female" className="text-lg py-3">
                      أنثى
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor={`email-${index}`} className="text-lg font-semibold text-gray-700">
                  البريد الإلكتروني *
                </Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={passenger.email}
                  onChange={(e) => updatePassenger(index, "email", e.target.value)}
                  placeholder="أدخل البريد الإلكتروني"
                  className="h-14 text-lg border-2 rounded-xl focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor={`phone-${index}`} className="text-lg font-semibold text-gray-700">
                  رقم الهاتف
                </Label>
                <Input
                  id={`phone-${index}`}
                  value={passenger.phone}
                  onChange={(e) => updatePassenger(index, "phone", e.target.value)}
                  placeholder="أدخل رقم الهاتف"
                  className="h-14 text-lg border-2 rounded-xl focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor={`passport-${index}`} className="text-lg font-semibold text-gray-700">
                  رقم جواز السفر
                </Label>
                <Input
                  id={`passport-${index}`}
                  value={passenger.passportNumber}
                  onChange={(e) => updatePassenger(index, "passportNumber", e.target.value)}
                  placeholder="أدخل رقم جواز السفر"
                  className="h-14 text-lg border-2 rounded-xl focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-700">الجنسية</Label>
                <Select
                  value={passenger.nationality}
                  onValueChange={(value) => updatePassenger(index, "nationality", value)}
                >
                  <SelectTrigger className="h-14 text-lg border-2 rounded-xl">
                    <SelectValue placeholder="اختر الجنسية" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="jo" className="text-lg py-3">
                      الأردن
                    </SelectItem>
                    <SelectItem value="sa" className="text-lg py-3">
                      السعودية
                    </SelectItem>
                    <SelectItem value="ae" className="text-lg py-3">
                      الإمارات
                    </SelectItem>
                    <SelectItem value="eg" className="text-lg py-3">
                      مصر
                    </SelectItem>
                    <SelectItem value="lb" className="text-lg py-3">
                      لبنان
                    </SelectItem>
                    <SelectItem value="sy" className="text-lg py-3">
                      سوريا
                    </SelectItem>
                    <SelectItem value="iq" className="text-lg py-3">
                      العراق
                    </SelectItem>
                    <SelectItem value="other" className="text-lg py-3">
                      أخرى
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center pt-8">
        <Button
          onClick={handleContinue}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <CreditCard className="ml-3 h-6 w-6" />
          متابعة إلى الدفع
        </Button>
      </div>
    </div>
  )
}
