"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useGetContactsQuery } from "@/redux/api/contacts.api";
import { useGetMainCategoriesQuery } from "@/redux/api/main-categories.api";
import styles from "@/app/css/footer.module.css";
import { ProductRow } from "@/app/components/shop/ProductRow";
import { CallBack } from "@/app/components/micro/CallBack";
import Socials from "@/app/components/micro/Socials";
import Cookies from "./Cookies/Cookies";

export const Footer = ({ }) => {
  const { isLoading: contactsLoading, data: contactsData } =
    useGetContactsQuery();
  const { isLoading: categoriesLoading, data: categoriesData } =
    useGetMainCategoriesQuery();

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => { }, [contactsData]);

  return (
    <footer className={`pt-10 ${styles.footerContainer}`}>
      {/* <ProductRow category={process.env.NEXT_PUBLIC_VELOPART_ID} place="" /> */}

      <div className="flex flex-col gap-5">
        <div className="">
          <h3>Мы в соцсетях</h3>
          <Socials />
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-start">
            <CallBack />
          </div>
          {!contactsLoading &&
            typeof contactsData !== "undefined" &&
            contactsData.data && (
              <div className="flex flex-col">
                <a href={`mailto:${contactsData.data[0].attributes.MainEmail}`}>
                  {contactsData.data[0].attributes.MainEmail}
                </a>
                <a href={`mailto:${contactsData.data[0].attributes.MainEmail}`}>
                  Написать нам
                </a>
              </div>
            )}
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col gap-3">
          <h5>Roliz.Ru</h5>
          <p className="text-xs font-light !text-gray-light">
            Оптовая и розничная продажа мотоциклов,
            <br /> запчастей, велосипедов и экипировки.
          </p>
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${!contactsLoading
              ? typeof contactsData != "undefined" && contactsData.data
                ? contactsData.data[0].attributes.MainAdress
                : null
              : null
              }`}
            className="text-sm !text-gray-light"
          >
            {typeof contactsData != "undefined" && contactsData.data
              ? contactsData.data[0].attributes.MainAdress
              : null}
          </a>
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${!contactsLoading
              ? typeof contactsData != "undefined" && contactsData.data
                ? contactsData.data[0].attributes.OfficeUssur
                : null
              : null
              }`}
            className="text-sm !text-gray-light"
          >
            {typeof contactsData != "undefined" && contactsData.data
              ? contactsData.data[0].attributes.OfficeUssur
              : null}
          </a>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <h5>Клиентам</h5>
            <Link
              href={`${"/routes/pages/delivery"}`}
              className="!text-gray-light font-light"
            >
              Доставка и оплата
            </Link>
            <Link
              href={`${"/routes/pages/about"}`}
              className="!text-gray-light font-light"
            >
              О компании
            </Link>
            <Link
              href={`${"/routes/pages/opt"}`}
              className="!text-gray-light font-light"
            >
              Оптовым покупателям
            </Link>
            <Link
              href={`${"/routes/pages/contacts"}`}
              className="!text-gray-light font-light"
            >
              Контакты
            </Link>
          </div>
          {/* Каталог меню */}
          <div className="">
            <h5>Каталог</h5>
            <ul className="flex flex-col gap-2 pt-2">
              {!categoriesLoading
                ? typeof categoriesData != "undefined" && categoriesData.data
                  ? categoriesData.data.map((item) => {
                    if (!item.attributes.parent.data) {
                      return (
                        <li key={item.id}>
                          <Link
                            href={`/routes/shop/${item.id}`}
                            className="!text-gray-light font-light cursor-pointer hover:transition-all 
                              group"
                          >
                            {item.attributes.name}
                          </Link>
                        </li>
                      );
                    }
                  })
                  : null
                : null}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col !md:flex-row gap-2 justify-between text-sm my-16">
        <div className=''>
          <p>
            <span>ООО Roliz © {year} </span>
            все права защищены
          </p>
        </div>
        <Link href="/routes/political">Политика конфиденциальности</Link>
        <Link href="https://inside360.ru/" target="_blank" className="inside_link" >Разработки сайта <span>INSIDE360</span></Link>
      </div>
      <Cookies />
    </footer>
  );
};
