'use client'
import React, {Suspense, useEffect} from 'react'
import Image from 'next/image'

import {useRouter} from 'next/navigation'

import { Forms } from '@/app/components/Forms'
import {Loader} from "@/app/components/micro/Loader";

import {useGetDeliveryQuery} from "@/redux/api/pages.api";

import styles from '@/app/css/mainpage.module.css'

export default function Page({}) {

  const {isLoading, error, data} = useGetDeliveryQuery();

  const router = useRouter();

  useEffect(() => {},[data])

  return (
    <>
    <main className={`${styles.main} ${styles.contentpage} ${styles.deliverypage}`}>


      <h1>Доставка и оплата</h1>

      <div className = {`${styles.fullText}`}>
        {
          (isLoading) ? <Loader /> :
              (data)  ? <div className={`${styles.bit50Text}`} dangerouslySetInnerHTML = {{__html: `${data.data.attributes.MainText}`}}>

              </div> : ' Ошибка получения данных. Проверьте интернет'
        }
      </div>

    </main>
    </>
  )
}
