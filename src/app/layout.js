"use client";

import "@/app/css/globals.css";
import { Inter } from "next/font/google";
import { Geologica } from 'next/font/google'


const inter = Inter({ subsets: ["latin"] });
const geologica = Geologica({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap'
 }) 

//Redux
import { ReduxWrapper } from "@/app/ReduxWrapper";
//Components
import { Header } from "@/app/components/main/Header";
import { Footer } from "@/app/components/main/Footer";
import Modals from "@/app/components/Modals";
import React, { useState } from "react";
import FloatingConsultButton from "@/app/components/FloatingConsultButton";
import Modal from "@/app/components/Modal";
import { ConsultForm } from "@/app/components/Forms";

export default function RootLayout({ children }) {
  const [isConsultModalOpen, setConsultModalOpen] = useState(false);

  const handleOpenConsultForm = () => {
    setConsultModalOpen(true);
  };

  const handleCloseConsultForm = () => {
    setConsultModalOpen(false);
  };

  return (
    <ReduxWrapper>
      <html lang="ru">
        <head>
          <title>ROLIZ - Лучший магазин мототехники и велосипедов</title>
          <meta
            name="description"
            content="ROLIZ - Лучший магазин мототехники и велосипедов. Оригинальные запчасти для всей мото и вело техники."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://roliz-moto.ru/favicon.png"
          />
        </head>
        <body className={geologica.className}>
            {" "}
            <Header />
            {children}
            <Modals />
            <FloatingConsultButton onOpenConsultForm={handleOpenConsultForm} />
            <Modal isOpen={isConsultModalOpen} onClose={handleCloseConsultForm}>
              <ConsultForm />
            </Modal>
            <Footer />
        </body>
      </html>
    </ReduxWrapper>
  );
}
