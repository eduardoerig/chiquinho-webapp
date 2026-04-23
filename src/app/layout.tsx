import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Preloader } from "@/components/ui/Preloader";
import "./globals.css";
import { getSettings } from "@/utils/settings";
import { FranchiseProvider } from "@/context/FranchiseContext";
import Script from "next/script";

export const dynamic = "force-dynamic";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings.general_site_name || "Chiquinho Sorvetes";
  const siteDescription = settings.seo_description || "Com receita exclusiva, mais de 100 opções no cardápio e mais de 1000 lojas pelo Brasil.";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://chiquinho.com.br"),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    icons: {
      icon: "/imagens_originais/cropped-chiquinho-icone-1-270x270.png",
    },
    openGraph: {
      title: siteName,
      description: siteDescription,
      siteName: siteName,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: "/imagens_originais/chiquinho-logo-horizontal.png",
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
      images: ["/imagens_originais/chiquinho-logo-horizontal.png"],
    },
  };
}

export const viewport = {
  themeColor: "#A8151F",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const gaId = settings.marketing_ga_id;
  const pixelId = settings.marketing_pixel_id;

  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="antialiased font-sans">
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel */}
        {pixelId && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        <Preloader />
        <FranchiseProvider settings={settings}>
          {children}
        </FranchiseProvider>
      </body>
    </html>
  );
}
