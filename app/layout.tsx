import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import ModalProvider from "@/provider/ModalProvider";
import ToaterProvider from "@/provider/ToastProvider";
import getCurrentUser from "@/actions/getCurrentUser";

import "./globals.css";

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["cyrillic", "latin", "vietnamese"],
});

const poppoins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "devanagari"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://airbnb-psi-liart.vercel.app/"),
  title:
    "Airbnb | Holiday Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
  description: `Find the perfect place to stay at an amazing price in 191 countries. Belong anywhere with Airbnb.`,
  applicationName: "Airbnb Clone",
  keywords: [
    "Airbnb Clone",
    "Holiday Rentals",
    "Cabins",
    "Beach Houses",
    "Unique Homes",
    "Experiences",
    "Vacation Rentals",
    "Apartments",
    "Beach Rentals",
    "Cabin Rentals",
    "Condo Rentals",
    "Beach House Rentals",
    "Vacation Home Rentals",
    "Vacation Rentals by Owner",
  ],
  authors: [
    {
      name: "Saikat Samanta",
      url: "https://portfolio-one-gilt-34.vercel.app/",
    },
  ],
  publisher: "Vercel",
  openGraph: {
    title:
      "Airbnb | Holiday Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
    description:
      "Find the perfect place to stay at an amazing price in 191 countries. Belong anywhere with Airbnb.",
    url: "https://airbnb-psi-liart.vercel.app/",
    type: "website",
    locale: "en_IN",
    siteName: "Airbnb Clone",
    images: [
      {
        url: "https://github.com/psykat1116/Airbnb/blob/master/public/OpenGraph.png?raw=true",
        width: 1200,
        height: 630,
        alt: "Airbnb Clone",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head>
      <script async src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={`${nunito.className} ${poppoins.className}`}>
        <Navbar currentUser={currentUser} />
        <ToaterProvider />
        <ModalProvider />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
