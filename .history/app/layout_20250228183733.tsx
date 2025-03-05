import "./globals.css";
import { Providers } from "@/redux/Provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

const archivoBlack = Alta({
  weight: "400",
  variable: "--font-archivo-black",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} overflow-x-hidden`}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6XV8R4XZKS"
          id="google-analytics"
        >
          {` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-6XV8R4XZKS');`}
        </Script>
        <Script async id="google-analytics1">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10818390066');
          `}
        </Script>
        <ToastContainer />
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
