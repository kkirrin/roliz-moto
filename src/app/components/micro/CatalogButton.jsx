"use client";

import React, { useEffect, useState } from "react";
import { useStater } from "@/hooks/useStater";
import styles from "@/app/css/header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";
import NavCategories from "./NavCategories";

const CatalogButton = ({}) => {
  const [status, setStatus] = useState(false);
  const { mobile } = useStater("main");

  const { isLoading, error, data } = useGetCategoriesQuery();

  // console.log("data cat", data);

  useEffect(() => {
    window.addEventListener("scroll", (evt) => {
      if (status) setStatus(!status);
    });
    return window.removeEventListener("scroll", () => {});
  }, [status]);

  return (
    <>
      <div
        onClick={() => {
          if (mobile) return;
          setStatus(!status);
        }}
        onTouchStart={() => {
          if (!mobile) return;
          setStatus(!status);
        }}
        className={`${styles.containerCatalog} ${
          status ? styles.activeCatalog : styles.nonActiveCatalog
        }`}
      >
        <Button />
      </div>

      <div
        className={`absolute bg-white-default z-10 rounded-xl transition-all md:w-[300px] ${
          status ? 'top-20 left-0' : 'hidden'
        }`}
      >

        <NavCategories data={data} isLoading={isLoading} burgerSetter={setStatus} />

        {/* <div className="flex flex-col md:gap-5 xl:gap-7 xl:p-8 xl:pr-14">
          {!isLoading ? (
            typeof data != "undefined" && data.data != "undefined" ? (
              data.data.map((item) => {
                if (!item.attributes.parent.data) {
                  return (
                    <Link
                      key={`key_catalog_button_${item.id}`}
                      href={`/routes/shop/${item.id}`}
                      className="flex items-center md:gap-3 xl:gap-5 md:text-sm md:font-bold xl:text-xl hover:opacity-50 transition-all"
                    >
                      {item.attributes.icon.data ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.icon.data.attributes.url}`}
                          alt={"Изображение категории " + item.attributes.name}
                          className="xl:w-8 h-auto"
                        />
                      ) : null}
                      <h4>{item.attributes.name}</h4>
                    </Link>
                  );
                }
              })
            ) : null
          ) : (
            <h2>Загрузка</h2>
          )}
        </div> */}
      </div>
    </>
  );
};

const Button = ({}) => {
  return (
    <div className="flex gap-3 bg-yellow-default p-[13px] rounded-[10px] lg:px-7 lg:py-3 lg:rounded-xl">
      <div className={`${styles.buttonCatalogIcon}`}>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <h4 className="hidden text-base font-semibold lg:block">Каталог</h4>
    </div>
  );
};

export default CatalogButton;
