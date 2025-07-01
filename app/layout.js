import { Geist, Geist_Mono, Fleur_De_Leah } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fleurDeLeah = Fleur_De_Leah({
  variable: "--font-fleur-de-leah",
  subsets: ["latin"],
  weight: "400",
});

// const cedarvilleCursive = Cedarville_Cursive({
//   variable: "--font-cedarville-cursive",
//   subsets: ["latin"],
//   weight: "400",
// });

export const metadata = {
  title: "Casamento André & Diovana",
  description: "Casamento André & Diovana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${fleurDeLeah.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
