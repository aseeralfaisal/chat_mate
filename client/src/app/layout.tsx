import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

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
  title: "Chat Mate",
  description: "A Video Chat Web App",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) => {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
