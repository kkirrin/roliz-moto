"use client";

import React from "react";
import Image from "next/image";
import { useStater } from "@/hooks/useStater";
import { useGetPlusesQuery } from "@/redux/api/pluses.api";
import styles from "@/app/css/mainpage.module.css";
import { Loader } from "@/app/components/micro/Loader";
import { useEffect } from "react";

const Pluses = ({}) => {
  const { isLoading, error, data } = useGetPlusesQuery();

  useEffect(() => {});

  return (
    <section className={`${styles.plusesContainer}`}>
      {isLoading ? (
        <Loader />
      ) : data ? (
        data.data.map((item, index) => {
          if (!item.attributes) return;

          return (
            <div key={`key_pluses_${index}`} className={`${styles.onePlus}`}>
              <Image
                unoptimized
                src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.Icon.data.attributes.url}`}
                fill
                alt={item.attributes.Icon.data.attributes.alternativeText || ''}
              />
              <p>{item.attributes.Text}</p>
            </div>
          );
        })
      ) : (
        <h3>Ошибка получения данных :(</h3>
      )}
    </section>
  );
};

export default Pluses;
