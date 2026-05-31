import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "CarAdvisor — Find Your Perfect Car",
  description: "Answer 5 questions and get a personalized car shortlist matched to your budget, needs, and priorities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-[var(--font-geist-sans)] bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
