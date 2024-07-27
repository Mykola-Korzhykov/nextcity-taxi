import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";

import "aos/dist/aos.css";
import "@styles/global.scss";
import { FC, ReactNode, useEffect } from "react";
import Loader from "@components/ui/Loader/Loader";
import { hideLoader } from "@store/slices/loaderSlice";
import { useAppDispatch } from "@store/hook";
import Aos from "aos";
import ProviderLayout from "@components/layout/ProviderLayout";
import getConfig from "../../next-seo.config";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

type Props = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = getConfig();
export const viewport: Viewport = {
  themeColor: "#f6110f",
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
};

export default RootLayout;
