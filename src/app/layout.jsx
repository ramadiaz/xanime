import Navbar from "@/components/Utilites/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Utilites/Footer";
import { Analytics } from "@vercel/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "XAnimeList",
  description: "Anime Tier List by Xanny",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-screen bg-zinc-950">
          {children} <Analytics />
        </div>
        <Footer />
      </body>
    </html>
  );
}
