import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: ' شركة طيران ',
  description: 'أول شركة طيران غير حكومية في منطقة الشرق الأوسط، وما زالت إحدى شركات الطيران القليلة الخاصة في المنطقة.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
