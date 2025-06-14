"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export function FlightFiltersArabic() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedStops, setSelectedStops] = useState<string[]>([])

  const airlines = ["الجزيرة", "الخطوط الملكية", "طيران الشرق الأوسط", "الخطوط المتحدة"]
  const stopOptions = ["مباشر", "توقف واحد", "توقفان أو أكثر"]

  const handleAirlineChange = (airline: string, checked: boolean) => {
    if (checked) {
      setSelectedAirlines([...selectedAirlines, airline])
    } else {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline))
    }
  }

  const handleStopChange = (stop: string, checked: boolean) => {
    if (checked) {
      setSelectedStops([...selectedStops, stop])
    } else {
      setSelectedStops(selectedStops.filter((s) => s !== stop))
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-r-4 border-r-blue-500">
        <CardHeader>
          <CardTitle className="text-xl">المرشحات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-base font-semibold">نطاق السعر</Label>
            <div className="mt-3">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                min={0}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{priceRange[0]} دينار</span>
                <span>{priceRange[1]} دينار</span>
              </div>
            </div>
          </div>

          {/* Airlines */}
          <div>
            <Label className="text-base font-semibold">شركات الطيران</Label>
            <div className="mt-3 space-y-3">
              {airlines.map((airline) => (
                <div key={airline} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={airline}
                    checked={selectedAirlines.includes(airline)}
                    onCheckedChange={(checked) => handleAirlineChange(airline, checked as boolean)}
                  />
                  <Label htmlFor={airline} className="text-sm font-medium">
                    {airline}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Stops */}
          <div>
            <Label className="text-base font-semibold">التوقفات</Label>
            <div className="mt-3 space-y-3">
              {stopOptions.map((stop) => (
                <div key={stop} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={stop}
                    checked={selectedStops.includes(stop)}
                    onCheckedChange={(checked) => handleStopChange(stop, checked as boolean)}
                  />
                  <Label htmlFor={stop} className="text-sm font-medium">
                    {stop}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Departure Time */}
          <div>
            <Label className="text-base font-semibold">وقت المغادرة</Label>
            <div className="mt-3 space-y-3">
              {[
                { id: "morning", label: "الصباح (06:00 - 12:00)" },
                { id: "afternoon", label: "بعد الظهر (12:00 - 18:00)" },
                { id: "evening", label: "المساء (18:00 - 00:00)" },
                { id: "night", label: "الليل (00:00 - 06:00)" },
              ].map((time) => (
                <div key={time.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id={time.id} />
                  <Label htmlFor={time.id} className="text-sm font-medium">
                    {time.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
