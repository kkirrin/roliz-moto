"use client";
import React, { Suspense, useEffect } from "react";
import Image from "next/image";
import { useGetOptPageQuery, useGetPartnersQuery } from "@/redux/api/pages.api";
import { Loader } from "@/app/components/micro/Loader";
import styles from "@/app/css/mainpage.module.css";
import { Partners } from "@/app/components/main/Partners/Partners";

export default function Page({ }) {
  const { isLoading, error, data } = useGetOptPageQuery();
  const { isLoading: isLoadingPartners, error: errorPartners, data: dataPartners } = useGetPartnersQuery();

  useEffect(() => { }, [data]);
  useEffect(() => { }, [dataPartners]);

  console.log('dataPartners', dataPartners);

  return (
    <main
      className={`${styles.main} ${styles.contentpage} ${styles.contentpageOpt}`}
    >
      <h1>Оптовым покупателям</h1>

      <section className={`${styles.imagesPageContainer}`}>
        {isLoading && !error ? (
          <Loader />
        ) : data ? (
          <article
            className={`${styles.imageItem}`}
            key={`keyImage_${data.id}`}
          >
            <Image
              unoptimized
              src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${data.data.attributes.MainImage.data.attributes.url}`}
              alt={`altImage_${data.id}`}
              fill
            />
          </article>
        ) : (
          <article
            className={`${styles.imageItem}`}
            key={`keyImage_BADIMAGE`}
          >
            <Image
              unoptimized
              src={"/noImage.svg"}
              alt={`altImage_${"Нет изображения"}`}
              width={50}
              height={50}
            />
          </article>
        )}
      </section>

      <div className={`${styles.fullText}`}>
        {isLoading && !error ? (
          <Loader />
        ) : data ? (
          <div
            className={`${styles.bit50Text}`}
            dangerouslySetInnerHTML={{
              __html: `${data.data.attributes.MainText}`,
            }}
          ></div>
        ) : (
          " Ошибка получения данных"
        )}
      </div>


      <Partners />

    </main>
  );
}
