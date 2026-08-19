import type { Metadata } from "next";
import { Inter, DM_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARKOS — Digital Strategy, Products, Engineering, Data & AI",
  description:
    "A ARKOS identifica problemas e oportunidades de negócio e projeta, desenvolve, implanta, mede e evolui soluções digitais capazes de gerar resultados reais.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${dmMono.variable} ${dmSerifDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
