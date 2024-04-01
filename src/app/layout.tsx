import ThemeClientProvider from "@/theme/ThemeProvider";
import type { Metadata } from "next";
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
      <ThemeClientProvider>
        <body className={inter.className}>{children}</body>
      </ThemeClientProvider>
    </html>
  );
}
