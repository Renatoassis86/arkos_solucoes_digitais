import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0C0F",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://studio.arkosintelligence.com"),
  title: "ARKOS — Soluções Digitais, Sites e Plataformas",
  description:
    "A ARKOS desenvolve sites rápidos, plataformas sob medida e inteligência de dados orientadas a conversão real.",
  keywords: [
    "criação de sites",
    "landing pages",
    "desenvolvimento web",
    "sistemas web",
    "plataformas sob medida",
    "ARKOS",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://studio.arkosintelligence.com",
    siteName: "ARKOS Soluções Digitais",
    title: "ARKOS — Soluções Digitais, Sites de Alta Conversão e Plataformas",
    description:
      "Desenvolvemos sites de alta conversão, portais corporativos e plataformas sob medida para empresas que buscam autoridade e vendas.",
    images: [
      {
        url: "/assets/hero_workspace.jpg",
        width: 1200,
        height: 630,
        alt: "ARKOS Soluções Digitais — Arquitetura de Software e Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARKOS — Soluções Digitais e Sites de Alta Conversão",
    description:
      "Sites rápidos, plataformas sob medida e engenharia de software para o seu negócio.",
    images: ["/assets/hero_workspace.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${dmMono.variable} ${dmSerifDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
