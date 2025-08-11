import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RBAC App",
  description: "RBAC demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
