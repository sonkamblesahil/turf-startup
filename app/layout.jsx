import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TurfBook - Book Your Perfect Sports Turf",
  description:
    "Find and book the best sports turfs in your city. Organize tournaments, manage bookings, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
