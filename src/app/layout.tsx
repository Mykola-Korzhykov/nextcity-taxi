"use client";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";

import "aos/dist/aos.css";
import "@styles/global.scss";
import { FC, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import store from "@store/store";
import Loader from "@components/ui/Loader/Loader";
import { hideLoader } from "@store/slices/loaderSlice";
import { useAppDispatch } from "@store/hook";
import Aos from "aos";
import Layout from "@components/layout/Layout";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

// export const metadata: Metadata = {
//   title: "Такси междугороднее Россошь",
//   description:
//     "Сервис заказа такси в городе Россошь. Заказать такси по номеру ",
// };

type Props = Readonly<{
  children: ReactNode;
}>;

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider store={store}>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
