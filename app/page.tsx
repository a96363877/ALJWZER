import { FlightSearchArabic } from "@/components/flight-search-arabic"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, Menu, Star, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 relative overflow-hidden"
      dir="rtl"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 transform rotate-12">
          <Plane className="h-32 sm:h-40 w-32 sm:w-40 text-white" />
        </div>
        <div className="absolute bottom-40 left-20 transform -rotate-12">
          <Plane className="h-24 sm:h-32 w-24 sm:w-32 text-white" />
        </div>
        <div className="absolute top-1/2 left-1/3 transform rotate-45">
          <Plane className="h-16 sm:h-20 w-16 sm:w-20 text-white" />
        </div>
        <div className="absolute top-1/4 left-1/4 transform -rotate-12">
          <Plane className="h-12 sm:h-16 w-12 sm:w-16 text-white" />
        </div>
      </div>

   
      {/* Enhanced Hero Section - Responsive */}
      <section className="relative py-12 sm:py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Promotional Banner - Responsive */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 relative">
            <div className="inline-block bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/30 shadow-2xl">
              <div className="mb-4 sm:mb-6">
                <span className="text-yellow-300 text-lg sm:text-xl lg:text-2xl font-bold bg-blue-800/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  خصم حصري
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                <div className="text-6xl sm:text-7xl lg:text-9xl font-black text-white drop-shadow-lg">45</div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl transform rotate-12 shadow-xl">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black">%</span>
                  <div className="text-xs sm:text-sm font-bold">خصم</div>
                </div>
              </div>
              <div className="text-white text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl leading-relaxed">
                على الوزن الإضافي للأمتعة، واختيار المقعد المفضل، وحقيبة
                <br className="hidden sm:block" />
                يد إضافية (7 كجم)، وجميع باقات السفر المميزة
              </div>
              <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 hover:from-yellow-500 hover:to-orange-500 px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg lg:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                احجز الآن واستفد
              </Button>
            </div>
          </div>

          {/* Enhanced Flight Search Component */}
          <FlightSearchArabic />
        </div>
      </section>

      {/* Enhanced Popular Destinations - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">وجهات شائعة</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشف أجمل المدن والوجهات السياحية حول العالم بأفضل الأسعار
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                city: "دبي",
                country: "الإمارات العربية المتحدة",
                price: "45",
                rating: "4.8",
                image: "/uae.jpg",
              },
              {
                city: "الرياض",
                country: "المملكة العربية السعودية",
                price: "40",
                rating: "4.7",
                image: "/ryad.jpg",
              },
              {
                city: "القاهرة",
                country: "جمهورية مصر العربية",
                price: "85",
                rating: "4.6",
                image: "/cairo.jpg",
              },
              {
                city: "إسطنبول",
                country: "الجمهورية التركية",
                price: "120",
                rating: "4.9",
                image: "/istanbl.jpg",
              },
            ].map((destination, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.city}
                    className="w-full h-40 sm:h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                      <span className="text-xs sm:text-sm font-bold">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-white">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">{destination.city}</h3>
                    <p className="text-xs sm:text-sm opacity-90">{destination.country}</p>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base lg:text-lg">ابتداءً من</span>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                        {destination.price}
                      </span>
                      <span className="text-gray-500 mr-1 text-sm sm:text-base">د.ك</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">5M+</div>
              <div className="text-sm sm:text-lg lg:text-xl text-blue-200">عميل راضٍ</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">150+</div>
              <div className="text-sm sm:text-lg lg:text-xl text-blue-200">وجهة حول العالم</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">99.8%</div>
              <div className="text-sm sm:text-lg lg:text-xl text-blue-200">معدل الرضا</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm sm:text-lg lg:text-xl text-blue-200">دعم العملاء</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
