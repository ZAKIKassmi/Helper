import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Provider } from 'react-wrap-balancer'

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Helper",
  description: "Helper is a platoform that allows both individual to manage their blood donations and blood centers to have a stable number of donation each week.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider>
        <div className="max-w-[90rem] m-auto">
          {children}
          <Toaster position="bottom-right" richColors/>
        </div>
      </Provider>
        </body>
    </html>
  );
}
