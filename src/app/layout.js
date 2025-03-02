import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Utensils, CupSoda, IceCream, ShoppingCart } from "lucide-react";
import { CartProvider } from "./context/CardContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-[var(--lightyellow)] text-white p-5 flex flex-col space-y-4">
            <div><img src="/images/logo.png" alt="MesaMate Logo" className="w-full" /></div>
            <div className="w-full h-[50px]"></div>
            <nav className="flex flex-col space-y-2 gap-4">
              <Link href="/foods" className="hover:bg-[var(--yellowbg)] p-2 rounded text-black flex gap-2">
                <Utensils size={20} /> FOODS
              </Link>
              <Link href="/drinks" className="hover:bg-[var(--yellowbg)] p-2 rounded text-black flex gap-2">
                <CupSoda size={20} /> DRINKS
              </Link>
              <Link href="/desserts" className="hover:bg-[var(--yellowbg)] p-2 rounded text-black flex gap-2">
                <IceCream size={20} /> DESSERTS
              </Link>
              <Link href="/carts" className="hover:bg-[var(--yellowbg)] p-2 rounded text-black flex gap-2">
                <ShoppingCart size={20} /> CARTS
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white overflow-auto">
            <CartProvider>
              {children}
            </CartProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
