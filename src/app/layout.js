import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from "./components/AuthProvider";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shipment Tracker',
  description: 'This app is for tracking the shipments. It has functionality for manging the users, Track and  modify the shipments, manage users',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  )
}
