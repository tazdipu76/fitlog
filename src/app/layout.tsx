import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "FitLog — Train With Intent",
  description: "Gym workout tracker built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0F1115] text-white antialiased min-h-screen flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid #2a2a2a",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}