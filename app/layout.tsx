import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/src/context/CartContext";
import { WishlistProvider } from "@/src/context/WishlistContext";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ZAPP",
  description: "Next.js E-commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WishlistProvider>
          <CartProvider>
            <Header />
            {children}
            <Toaster />
          </CartProvider>
        </WishlistProvider>
        <Footer/>
      </body>
    </html>
  );
}
