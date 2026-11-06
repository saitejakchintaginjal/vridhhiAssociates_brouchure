import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vridhhiassociates.com"),
  title: "Vridhhi Associates | Waterproofing and construction in Hubballi",
  description:
    "Vridhhi Associates offers waterproofing for terraces, walls, bathrooms and tanks in Hubballi, for residential and commercial projects.",
  openGraph: {
    title: "Vridhhi Associates | Waterproofing in Hubballi",
    description:
      "Construction and waterproofing company in Hubballi, Karnataka. Precision, durability and on time execution.",
    images: ["/logo.jpg"],
    type: "website",
  },
  icons: { icon: "/logo.jpg" },
};

export const viewport: Viewport = { themeColor: "#0f2a52" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="body-4 fixed left-4 top-4 z-80 -translate-y-24 rounded-lg bg-aqua px-3 py-2 text-navy-deep transition-transform duration-300 ease-brand focus:translate-y-0"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
