import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToaterProvider from "@/provider/ToastProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";

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
  title:
    "Airbnb | Holiday Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
  description: `${
    new Date().getUTCDate
  }-Find the perfect place to stay at an amazing price in 191 countries. Belong anywhere with Airbnb.`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${nunito.className} ${poppoins.className}`}>
        <Navbar currentUser={currentUser} />
        <ToaterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
