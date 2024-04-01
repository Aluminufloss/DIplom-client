import type { Metadata } from "next";

import ThemeClientProvider from "@/providers/ThemeProvider";
import GlobalStylesProvider from "@/providers/GlobalStylesProvider";

import { Poppins } from "next/font/google";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ManageryApp",
  description: "Managery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalStylesProvider />
      <ThemeClientProvider>
        <body className={inter.className}>{children}</body>
      </ThemeClientProvider>
    </html>
  );
}
