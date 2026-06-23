import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata = {
  title: "Infinite Story - Start a story, pass the pen, see where the world takes it.",
  description: "Collaborative storytelling for the digital age.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${lora.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
