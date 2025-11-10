import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
//import "./globals.css";
import Providers from "components/Providers"; // importa el provider cliente
import { Navbar } from "components/layout/Navbar";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "UnitPoints - Earn & Govern.",
  description: "A gamified reward platform on Polkadot Asset Hub",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          {/*<Navbar />*/}
          <main className="pt_20">{children}</main>
        </Providers>

      </body>
    </html>
  );
}

/*import type React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
//import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "UnitPoints - Earn & Govern.",
  description: "A gamified reward platform on Polkadot Asset Hub",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        
      </body>
    </html>
  );
}*/
