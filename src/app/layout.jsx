import Navbar from "@/components/Utilites/Navbar";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Footer from "@/components/Utilites/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Xanime | Latest Anime News, Reviews, Character Profiles & Anime Database",
  description:
    "Discover Xanime, the ultimate hub for anime fans. Get the latest anime news, in-depth reviews, detailed character profiles, episode summaries, and explore our vast anime database. Stay updated on upcoming releases, top-rated anime, and fan favorites.",
  keywords: [
    "Xanime",
    "Anime News",
    "Latest Anime Reviews",
    "Anime Database",
    "Anime Character Profiles",
    "Top Anime 2024",
    "Upcoming Anime",
    "Popular Anime Shows",
    "Anime Episode Summaries",
    "Anime Recommendations",
    "Anime Community",
    "Best Anime Streaming",
    "Anime Characters",
    "Anime Trailers",
    "Anime Release Dates",
  ],
  openGraph: {
    title:
      "Xanime | Latest Anime News, Reviews, Character Profiles & Anime Database",
    description:
      "Explore Xanime for the latest anime news, top reviews, character profiles, episode guides, and an extensive anime database. Stay informed on the best upcoming anime, trending shows, and your all-time favorites.",
    url: "https://xan-ime.vercel.app",
    type: "website",
    images: [
      {
        url: "/XAN.png",
        width: 1200,
        height: 630,
        alt: "Xanime - Your Ultimate Source for Anime Information",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Xanime | Latest Anime News, Reviews, Character Profiles & Anime Database",
    description:
      "Find the latest anime news, detailed reviews, character profiles, and explore a comprehensive anime database at Xanime. Stay up-to-date on everything anime!",
    image: "/XAN.png",
  },
  verification: {
    google: "3HVkP15Jzws0Mps4Mdbsy5pVZI1c9NOk4pXCqjZ_5x0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-screen bg-zinc-950">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
