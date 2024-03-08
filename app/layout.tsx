import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/(navigation)/Navbar";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oslo's vennegjeng",
  description: "Finn venner i Oslo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={
            inter.className +
            "flex h-screen w-full mx-auto bg-gradient-radial from-[#55657b] to-[#222831]"
          }
        >
          <Navbar />

          <div className="h-full sm:h-[90%] ">{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
