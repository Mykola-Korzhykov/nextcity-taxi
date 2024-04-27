import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer";

import "aos/dist/aos.css";
import "@styles/global.scss";
import { FC, ReactNode } from "react";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Такси междугороднее Россошь",
  description:
    "Сервис заказа такси в городе Россошь. Заказать такси по номеру ",
};

type Props = Readonly<{
  children: ReactNode;
}>;

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
