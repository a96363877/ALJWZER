"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export function FlightFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedStops, setSelectedStops] = useState<string[]>([])

  const airlines = ["SkyWings", "AirConnect", "Budget Air", "Premium Airways"]
  const stopOptions = ["Nonstop", "1 Stop", "2+ Stops"]

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
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="mt-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Airlines */}
          <div>
            <Label className="text-sm font-medium">Airlines</Label>
            <div className="mt-2 space-y-2">
              {airlines.map((airline) => (
                <div key={airline} className="flex items-center space-x-2">
                  <Checkbox
                    id={airline}
                    checked={selectedAirlines.includes(airline)}
                    onCheckedChange={(checked) => handleAirlineChange(airline, checked as boolean)}
                  />
                  <Label htmlFor={airline} className="text-sm">
                    {airline}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Stops */}
          <div>
            <Label className="text-sm font-medium">Stops</Label>
            <div className="mt-2 space-y-2">
              {stopOptions.map((stop) => (
                <div key={stop} className="flex items-center space-x-2">
                  <Checkbox
                    id={stop}
                    checked={selectedStops.includes(stop)}
                    onCheckedChange={(checked) => handleStopChange(stop, checked as boolean)}
                  />
                  <Label htmlFor={stop} className="text-sm">
                    {stop}
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
