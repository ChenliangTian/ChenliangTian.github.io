import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Fonts are loaded via @import in globals.css:
//   Heading: Didot (system) → Bodoni Moda (Google Fonts)
//   Body:    Avenir Next (system) → Inter (Google Fonts)

export const metadata: Metadata = {
  title: {
    default: "Chenliang Tian - PhD Student in Computer Science at WashU",
    template: "%s | Chenliang Tian"
  },
  description: "Chenliang Tian is a PhD student in Computer Science & Engineering at Washington University in St. Louis, researching quantum networking.",
  keywords: [
    "Chenliang Tian",
    "Chenliang",
    "Tian",
    "WashU",
    "Washington University",
    "PhD student",
    "Computer Science",
    "Quantum Networking",
    "Network Security",
    "Quantum Computing",
    "Research",
  ],
  authors: [{ name: "Chenliang Tian" }],
  creator: "Chenliang Tian",
  publisher: "Chenliang Tian",
  metadataBase: new URL('https://chenliangtian.github.io'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chenliangtian.github.io',
    title: 'Chenliang Tian - PhD Student in Computer Science at WashU',
    description: 'PhD student researching quantum networking at Washington University in St. Louis.',
    siteName: 'Chenliang Tian',
    images: [
      {
        url: '/images/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Chenliang Tian',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chenliang Tian - PhD Student in Computer Science',
    description: 'PhD student researching quantum networking.',
    images: ['/images/profile.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'aJLEfIffn_p_fxpRqb3XoEvbovNKbWcVx8uQb720USI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://chenliangtian.github.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Chenliang Tian",
              url: "https://chenliangtian.github.io",
              image: "https://chenliangtian.github.io/images/profile.jpeg",
              jobTitle: "PhD Student",
              worksFor: {
                "@type": "Organization",
                name: "Washington University in St. Louis",
                url: "https://wustl.edu"
              },
              alumniOf: {
                "@type": "Organization",
                name: "Washington University in St. Louis"
              },
              knowsAbout: [
                "Quantum Networking",
                "Network Security",
                "Computer Science",
                "Quantum Computing"
              ],
              sameAs: [
                "https://github.com/ChenliangTian",
              ],
              email: "chenliang.t@wustl.edu"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Chenliang Tian",
              "alternateName": ["Chenliang Tian's PhD Page", "Chenliang's Log"],
              "url": "https://chenliangtian.github.io/"
            })
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
