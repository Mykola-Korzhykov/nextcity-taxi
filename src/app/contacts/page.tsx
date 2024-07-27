import Contacts from "@components/sections/Contacts/Contacts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
};

const ContactsPage = () => {
  return (
    <div className="next-page" data-aos="fade-up">
      <Contacts />
    </div>
  );
};

export default ContactsPage;
