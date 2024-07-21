"use client";
import { FC, ReactNode, useEffect } from "react";
import Loader from "@components/ui/Loader/Loader";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useAppDispatch } from "@store/hook";
import Aos from "aos";
import "aos/dist/aos.css";
import { hideLoader } from "@store/slices/loaderSlice";
import { Montserrat } from "next/font/google";

type Props = {
  children: ReactNode;
};

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const Layout: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideLoader());
      Aos.init({ duration: 500 });
      window.scrollTo(0, 0);
    }, 2000);
  }, [dispatch]);

  return (
    <div className={`next-layout ${montserrat.className}`}>
      <Loader />
      <>
        <div style={{ flex: "1 0 auto" }}>
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
      </>
    </div>
  );
};

export default Layout;
