'use client'
import React, {Suspense, useEffect} from 'react'
import Image from 'next/image'
import styles from '@/app/css/mainpage.module.css'

import {useRouter} from 'next/navigation'

import { Forms } from '@/app/components/Forms'
import {Loader} from "@/app/components/micro/Loader";
import {useGetContactsQuery} from "@/redux/api/contacts.api";


export default function Page({}) {

  const {isLoading, error, data} = useGetContactsQuery();

  const router = useRouter();

  useEffect(() => {
    //console.log(data)
  },[data])

  return (
    <>
    <main className={`${styles.main} ${styles.contentpage}`}>

      <section className={`${styles.mapContainer}`}>
        {
          (!isLoading) ?
              (typeof data != 'undefined' && data.data[0]) ? <Suspense fallback={<Loader />}><iframe src={`${data.data[0].attributes.MapLink}`} frameBorder="1" allowFullScreen="true"></iframe></Suspense>
                  : <h3>Ошибка получения данных: Страница: Контакты</h3>
                      : <h3>Нет связи с сервером</h3>
        }
      </section>

      <section className={`${styles.conactsContainer}`}>
        {
          (!isLoading) ?
              (typeof data != 'undefined' && data.data[0]) ?
                  <>
                    <section className={`${styles.infoContainer} ${styles.infoSection}`} key={data.data[0].attributes.id}>
                      <div className = {`${styles.wrapperTitle}`}>
                        <h2 className={`${styles.infoTitle}`}>Реквизиты</h2>
                      </div>
                      <div className = {`${styles.wrapperInfoContent}`}>
                        <div className={`${styles.infoContent}`} dangerouslySetInnerHTML={{__html: data.data[0].attributes.Requisites}}></div>
                      </div>
                    </section>
                    <section className={`${styles.infoContainer} ${styles.infoSection}`} key={data.data[0].attributes.id}>
                      <div className = {`${styles.wrapperTitle}`}>
                        <h2 className={`${styles.infoTitle}`}>Телефоны</h2>
                      </div>
                      <div className = {`${styles.wrapperInfoContent}`}>
                        <div className={`${styles.infoContent} ${styles.forMarginTop}`} dangerouslySetInnerHTML={{__html: data.data[0].attributes.AllTels}}></div>
                        <div className={`${styles.infoContent}`} dangerouslySetInnerHTML={{__html: data.data[0].attributes.WorkTime}}></div>
                      </div>
                    </section>
                    <section className={`${styles.infoContainer} ${styles.infoSection}`} key={data.data[0].attributes.id}>
                      <div className = {`${styles.wrapperTitle}`}>
                        <h2 className={`${styles.infoTitle}`}>Электронная почта</h2>
                      </div>
                      <div className = {`${styles.wrapperInfoContent}`}>
                        <div className={`${styles.infoContent}`} dangerouslySetInnerHTML={{__html: data.data[0].attributes.ManyMail}}></div>
                      </div>
                    </section>
                  </>
                  : <h3>Ошибка получения данных: Страница: Контакты</h3>
                  : <h3>Нет связи с сервером</h3>
        }
      </section>

    </main>
    </>
  )
}
