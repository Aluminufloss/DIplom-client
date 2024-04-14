import type { Metadata } from "next";

import ThemeClientProvider from "@/providers/ThemeProvider";
import GlobalStylesProvider from "@/providers/GlobalStylesProvider";

import { Poppins } from "next/font/google";
import StyledComponentsRegistry from "./registry";

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
      <link rel="icon" href="/images/app_icon.ico" sizes="24x24" />
      <StyledComponentsRegistry>
        <GlobalStylesProvider />
        <ThemeClientProvider>
          <body className={inter.className}>{children}</body>
        </ThemeClientProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
