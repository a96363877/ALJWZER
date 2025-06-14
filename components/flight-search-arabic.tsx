"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, ArrowUpDown, Plane, Hotel, Car, Package } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

export function FlightSearchArabic() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("flights")
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

  // Real destinations with proper airport codes
  const destinations = [
    // Kuwait and GCC
    { value: "KWI", label: "الكويت (KWI)", country: "الكويت", popular: true },
    { value: "RUH", label: "الرياض (RUH)", country: "السعودية", popular: true },
    { value: "JED", label: "جدة (JED)", country: "السعودية", popular: true },
    { value: "DXB", label: "دبي (DXB)", country: "الإمارات", popular: true },
    { value: "AUH", label: "أبوظبي (AUH)", country: "الإمارات", popular: true },
    { value: "DOH", label: "الدوحة (DOH)", country: "قطر", popular: true },
    { value: "BAH", label: "المنامة (BAH)", country: "البحرين", popular: true },
    { value: "MCT", label: "مسقط (MCT)", country: "عمان", popular: true },

    // Middle East
    { value: "AMM", label: "عمان (AMM)", country: "الأردن", popular: true },
    { value: "BEY", label: "بيروت (BEY)", country: "لبنان", popular: true },
    { value: "DAM", label: "دمشق (DAM)", country: "سوريا", popular: false },
    { value: "BGW", label: "بغداد (BGW)", country: "العراق", popular: false },
    { value: "CAI", label: "القاهرة (CAI)", country: "مصر", popular: true },
    { value: "ALX", label: "الإسكندرية (ALX)", country: "مصر", popular: false },
    { value: "IKA", label: "طهران (IKA)", country: "إيران", popular: false },

    // Turkey
    { value: "IST", label: "إسطنبول (IST)", country: "تركيا", popular: true },
    { value: "SAW", label: "إسطنبول صبيحة (SAW)", country: "تركيا", popular: false },
    { value: "ADB", label: "إزمير (ADB)", country: "تركيا", popular: false },
    { value: "AYT", label: "أنطاليا (AYT)", country: "تركيا", popular: true },

    // Europe
    { value: "LHR", label: "لندن هيثرو (LHR)", country: "بريطانيا", popular: true },
    { value: "LGW", label: "لندن جاتويك (LGW)", country: "بريطانيا", popular: false },
    { value: "CDG", label: "باريس (CDG)", country: "فرنسا", popular: true },
    { value: "ORY", label: "باريس أورلي (ORY)", country: "فرنسا", popular: false },
    { value: "FRA", label: "فرانكفورت (FRA)", country: "ألمانيا", popular: true },
    { value: "MUC", label: "ميونخ (MUC)", country: "ألمانيا", popular: false },
    { value: "FCO", label: "روما (FCO)", country: "إيطاليا", popular: true },
    { value: "MXP", label: "ميلان (MXP)", country: "إيطاليا", popular: false },
    { value: "MAD", label: "مدريد (MAD)", country: "إسبانيا", popular: true },
    { value: "BCN", label: "برشلونة (BCN)", country: "إسبانيا", popular: false },
    { value: "AMS", label: "أمستردام (AMS)", country: "هولندا", popular: true },
    { value: "VIE", label: "فيينا (VIE)", country: "النمسا", popular: false },
    { value: "ZUR", label: "زيورخ (ZUR)", country: "سويسرا", popular: false },

    // Asia
    { value: "BOM", label: "مومباي (BOM)", country: "الهند", popular: true },
    { value: "DEL", label: "نيودلهي (DEL)", country: "الهند", popular: true },
    { value: "BLR", label: "بنغالور (BLR)", country: "الهند", popular: false },
    { value: "CCU", label: "كولكاتا (CCU)", country: "الهند", popular: false },
    { value: "KHI", label: "كراتشي (KHI)", country: "باكستان", popular: true },
    { value: "LHE", label: "لاهور (LHE)", country: "باكستان", popular: false },
    { value: "ISB", label: "إسلام آباد (ISB)", country: "باكستان", popular: false },
    { value: "DAC", label: "دكا (DAC)", country: "بنغلاديش", popular: true },
    { value: "CMB", label: "كولومبو (CMB)", country: "سريلانكا", popular: false },
    { value: "KTM", label: "كاتماندو (KTM)", country: "نيبال", popular: false },

    // Far East
    { value: "BKK", label: "بانكوك (BKK)", country: "تايلاند", popular: true },
    { value: "KUL", label: "كوالالمبور (KUL)", country: "ماليزيا", popular: true },
    { value: "SIN", label: "سنغافورة (SIN)", country: "سنغافورة", popular: true },
    { value: "CGK", label: "جاكرتا (CGK)", country: "إندونيسيا", popular: false },
    { value: "MNL", label: "مانيلا (MNL)", country: "الفلبين", popular: true },
    { value: "HKG", label: "هونغ كونغ (HKG)", country: "هونغ كونغ", popular: true },
    { value: "ICN", label: "سيول (ICN)", country: "كوريا الجنوبية", popular: false },
    { value: "NRT", label: "طوكيو (NRT)", country: "اليابان", popular: true },
    { value: "PVG", label: "شنغهاي (PVG)", country: "الصين", popular: false },
    { value: "PEK", label: "بكين (PEK)", country: "الصين", popular: false },

    // North America
    { value: "JFK", label: "نيويورك (JFK)", country: "أمريكا", popular: true },
    { value: "LAX", label: "لوس أنجلوس (LAX)", country: "أمريكا", popular: true },
    { value: "ORD", label: "شيكاغو (ORD)", country: "أمريكا", popular: false },
    { value: "MIA", label: "ميامي (MIA)", country: "أمريكا", popular: false },
    { value: "YYZ", label: "تورونتو (YYZ)", country: "كندا", popular: false },
    { value: "YVR", label: "فانكوفر (YVR)", country: "كندا", popular: false },

    // Africa
    { value: "CAI", label: "القاهرة (CAI)", country: "مصر", popular: true },
    { value: "ADD", label: "أديس أبابا (ADD)", country: "إثيوبيا", popular: false },
    { value: "NBO", label: "نيروبي (NBO)", country: "كينيا", popular: false },
    { value: "JNB", label: "جوهانسبرغ (JNB)", country: "جنوب أفريقيا", popular: false },
    { value: "CPT", label: "كيب تاون (CPT)", country: "جنوب أفريقيا", popular: false },
    { value: "CMN", label: "الدار البيضاء (CMN)", country: "المغرب", popular: true },
    { value: "TUN", label: "تونس (TUN)", country: "تونس", popular: false },
    { value: "ALG", label: "الجزائر (ALG)", country: "الجزائر", popular: false },

    // Australia & Oceania
    { value: "SYD", label: "سيدني (SYD)", country: "أستراليا", popular: true },
    { value: "MEL", label: "ملبورن (MEL)", country: "أستراليا", popular: false },
    { value: "PER", label: "بيرث (PER)", country: "أستراليا", popular: false },
    { value: "AKL", label: "أوكلاند (AKL)", country: "نيوزيلندا", popular: false },
  ]

  const popularDestinations = destinations.filter((dest) => dest.popular)
  const allDestinations = destinations.sort((a, b) => a.label.localeCompare(b.label, "ar"))

  const tabs = [
    { id: "flights", label: "رحلات طيران", icon: Plane },
    { id: "hotels", label: "الفنادق", icon: Hotel },
    { id: "cars", label: "تأجير السيارات", icon: Car },
    { id: "packages", label: "باقات السفر", icon: Package },
  ]

  return (
    <Card className="w-full max-w-7xl mx-auto bg-white/98 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
      <CardContent className="p-0">
        {/* Enhanced Tab Navigation - Responsive */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id ? "bg-white text-blue-600 shadow-lg" : "text-white hover:bg-white/10"
                  }`}
                >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-10 bg-white">
          {/* Trip Type Selection - Responsive */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 sm:mb-10">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={tripType === "round-trip"}
                onChange={(e) => setTripType(e.target.value)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-lg sm:text-xl font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                ذهاب وعودة
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={(e) => setTripType(e.target.value)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-lg sm:text-xl font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                اتجاه واحد
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="tripType"
                value="multi-city"
                checked={tripType === "multi-city"}
                onChange={(e) => setTripType(e.target.value)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-lg sm:text-xl font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                وجهات متعددة
              </span>
            </label>
          </div>

          <div className="grid gap-6 sm:gap-8">
            {/* Enhanced From/To Cities - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative">
              <div className="space-y-3">
                <Label className="text-lg sm:text-xl font-semibold text-gray-500">من</Label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="h-12 sm:h-16 text-base sm:text-lg bg-gray-50 border-2 hover:border-blue-400 focus:border-blue-500 rounded-xl shadow-sm">
                    <SelectValue placeholder="اختر مدينة المغادرة" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-80">
                    <div className="p-2">
                      <div className="text-sm font-semibold text-gray-500 mb-2 px-2">الوجهات الشائعة</div>
                      {popularDestinations.map((city) => (
                        <SelectItem
                          key={`popular-${city.value}`}
                          value={city.value}
                          className="text-base sm:text-lg py-3"
                        >
                          <div className="flex flex-col">
                            <span>{city.label}</span>
                            <span className="text-xs text-gray-500">{city.country}</span>
                          </div>
                        </SelectItem>
                      ))}
                      <div className="border-t my-2"></div>
                      <div className="text-sm font-semibold text-gray-500 mb-2 px-2">جميع الوجهات</div>
                      {allDestinations.map((city) => (
                        <SelectItem key={city.value} value={city.value} className="text-base sm:text-lg py-3">
                          <div className="flex flex-col">
                            <span>{city.label}</span>
                            <span className="text-xs text-gray-500">{city.country}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="absolute left-1/2 top-12 sm:top-14 transform -translate-x-1/2 z-10 bg-white border-2 border-blue-200 rounded-full w-12 h-12 sm:w-14 sm:h-14 hover:border-blue-400 hover:bg-blue-50 shadow-lg transition-all duration-200 lg:block hidden"
                onClick={swapCities}
              >
                <ArrowUpDown className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </Button>

              {/* Mobile swap button */}
              <Button
                variant="outline"
                onClick={swapCities}
                className="lg:hidden w-full h-12 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50"
              >
                <ArrowUpDown className="h-5 w-5 text-blue-600 ml-2" />
                تبديل المدن
              </Button>

              <div className="space-y-3">
                <Label className="text-lg sm:text-xl font-semibold text-gray-500">إلى</Label>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="h-12 sm:h-16 text-base sm:text-lg bg-gray-50 border-2 hover:border-blue-400 focus:border-blue-500 rounded-xl shadow-sm">
                    <SelectValue placeholder="اختر مدينة الوصول" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-80">
                    <div className="p-2">
                      <div className="text-sm font-semibold text-gray-500 mb-2 px-2">الوجهات الشائعة</div>
                      {popularDestinations.map((city) => (
                        <SelectItem
                          key={`popular-${city.value}`}
                          value={city.value}
                          className="text-base sm:text-lg py-3"
                        >
                          <div className="flex flex-col">
                            <span>{city.label}</span>
                            <span className="text-xs text-gray-500">{city.country}</span>
                          </div>
                        </SelectItem>
                      ))}
                      <div className="border-t my-2"></div>
                      <div className="text-sm font-semibold text-gray-500 mb-2 px-2">جميع الوجهات</div>
                      {allDestinations.map((city) => (
                        <SelectItem key={city.value} value={city.value} className="text-base sm:text-lg py-3">
                          <div className="flex flex-col">
                            <span>{city.label}</span>
                            <span className="text-xs text-gray-500">{city.country}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enhanced Dates - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-3">
                <Label className="text-lg sm:text-xl font-semibold text-gray-500">تاريخ المغادرة</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 sm:h-16 justify-start text-right text-base sm:text-lg bg-gray-50 border-2 hover:border-blue-400 focus:border-blue-500 rounded-xl shadow-sm"
                    >
                      <CalendarIcon className="ml-3 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      {departDate ? format(departDate, "PPP", { locale: ar }) : "اختر تاريخ المغادرة"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={departDate}
                      onSelect={setDepartDate}
                      disabled={(date) => date < new Date()}
                      locale={ar}
                      className="rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {tripType === "round-trip" && (
                <div className="space-y-3">
                  <Label className="text-lg sm:text-xl font-semibold text-gray-500">تاريخ العودة</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 sm:h-16 justify-start text-right text-base sm:text-lg bg-gray-50 border-2 hover:border-blue-400 focus:border-blue-500 rounded-xl shadow-sm"
                      >
                        <CalendarIcon className="ml-3 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                        {returnDate ? format(returnDate, "PPP", { locale: ar }) : "اختر تاريخ العودة"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        disabled={(date) => date < (departDate || new Date())}
                        locale={ar}
                        className="rounded-xl"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            {/* Enhanced Passengers and Class - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-3">
                <Label className="text-lg sm:text-xl font-semibold text-gray-500">المسافرون</Label>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger className="h-12 sm:h-16 text-base sm:text-lg bg-gray-50 border-2 hover:border-blue-400 focus:border-blue-500 rounded-xl shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="1" className="text-base sm:text-lg py-3">
                      مسافر واحد
                    </SelectItem>
                    <SelectItem value="2" className="text-base sm:text-lg py-3">
                      مسافران
                    </SelectItem>
                    <SelectItem value="3" className="text-base sm:text-lg py-3">
                      3 مسافرين
                    </SelectItem>
                    <SelectItem value="4" className="text-base sm:text-lg py-3">
                      4 مسافرين
                    </SelectItem>
                    <SelectItem value="5" className="text-base sm:text-lg py-3">
                      5+ مسافرين
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-lg sm:text-xl font-semibold text-gray-500">درجة السفر</Label>
                <Select value={classType} onValueChange={setClassType}>
                  <SelectTrigger className="h-12 sm:h-16 text-base sm:text-lg bg-gray-50 border-2 hover:border-blue-400 focus:border-blue-500 rounded-xl shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="economy" className="text-base sm:text-lg py-3">
                      الدرجة الاقتصادية
                    </SelectItem>
                    <SelectItem value="premium" className="text-base sm:text-lg py-3">
                      الدرجة المميزة
                    </SelectItem>
                    <SelectItem value="business" className="text-base sm:text-lg py-3">
                      درجة الأعمال
                    </SelectItem>
                    <SelectItem value="first" className="text-base sm:text-lg py-3">
                      الدرجة الأولى
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 sm:py-6 text-lg sm:text-2xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              disabled={!from || !to || !departDate}
            >
              <Search className="ml-3 sm:ml-4 h-6 w-6 sm:h-7 sm:w-7" />
              البحث عن أفضل الرحلات
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
