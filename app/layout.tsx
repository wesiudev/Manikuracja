import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Providers } from "@/redux/Provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`lg:pl-[300px] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="googleads">{`gtag('config', 'AW-10818390066');`}</Script>
        <div className="fixed left-0 top-0 w-full h-screen infinite-bg z-[-1]"></div>
        <ToastContainer />
        <Providers>
          <Nav />
          <div className="p-3 lg:p-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
