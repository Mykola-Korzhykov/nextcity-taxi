import Rules from "@components/sections/Rules/Rules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Соглашение",
};

const Agreement = () => {
  return (
    <div className="next-page" data-aos="fade-up">
      <Rules />
    </div>
  );
};

export default Agreement;
