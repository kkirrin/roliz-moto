"use client";

import Image from "next/image";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetAboutAsQuery } from "@/redux/api/pages.api";

import styles from "@/app/css/mainpage.module.css";

import { Loader } from "@/app/components/micro/Loader";

const imageData = [, "/noImage.svg"];

export default function Page({ }) {
  const { isLoading, error, data } = useGetAboutAsQuery();
  const router = useRouter();

  useEffect(() => { }, [data]);

  return (
    <>
      <main className={`${styles.main} ${styles.contentpage}`}>
        <h1>О компании</h1>
        <section className={`${styles.imagesPageContainer}`}>
          {isLoading ? (
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
                alt={`altImage_${"Нет изображения. Проверьте соединение"}`}
                width={50}
                height={50}
              />
            </article>
          )}
        </section>

        <div className={`${styles.fullText}`}>
          {isLoading ? (
            <Loader />
          ) : data ? (
            <div
              className={`${styles.bit50Text}`}
              dangerouslySetInnerHTML={{
                __html: `${data.data.attributes.MainText}`,
              }}
            ></div>
          ) : (
            " Ошибка получения данных. Проверьте интернет"
          )}
        </div>
      </main>
    </>
  );
}

/*  БЛОК ПРЕИМУЩЕСТВа

        <section className = {`${styles.advantagesContainer}`}>
            {
                (isLoading) ? <Loader /> :
                    (data) ?
                        <div className = {`${styles.advantageItem}`} key = {`keyAdvantages_${data.id}`}>
                            <h3> {">"} {data.data.attributes.oneNumber} лет</h3>
                            <p>{data.data.attributes.firstText}</p>
                        </div>
                        : <h3>Ошибка получения данных</h3>
            }
            {
                (isLoading) ? <Loader /> :
                    (data) ?
                        <div className = {`${styles.advantageItem}`} key = {`keyAdvantages_${data.id}`}>
                            <h3> {data.data.attributes.secondNumber} </h3>
                            <p>{data.data.attributes.secondText}</p>
                        </div>
                        : <h3>Ошибка получения данных</h3>
            }
            {
                (isLoading) ? <Loader /> :
                    (data) ?
                        <div className = {`${styles.advantageItem}`} key = {`keyAdvantages_${data.id}`}>
                            <h3> {data.data.attributes.threeNumber} </h3>
                            <p>{data.data.attributes.threeText}</p>
                        </div>
                        : <h3>Ошибка получения данных</h3>
            }
        </section>

 */

/* ВЕРХНИЙ БЛОК

        <div className = {`${styles.upBlock}`}>

                    <div className = {`${styles.left}`}>
                        <h2>Громкий и интернесный <br /> заголовок про <strong> компанию </strong></h2>
                    </div>
                    <div className = {`${styles.right}`}>
                        <p>
                          Согласно предыдущему, рекламное сообщество консолидирует культурный креатив. Взаимодействие корпорации и клиента
                        </p>
                    </div>

        </div>
*/
