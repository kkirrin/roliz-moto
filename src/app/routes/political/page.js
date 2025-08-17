'use client'

import React from 'react'
import Image from 'next/image'
import styles from '@/app/css/mainpage.module.css'

import {useRouter} from 'next/navigation'

export default function Page({}) {
  const router = useRouter();

  return (
    <>
    <main className={`${styles.main} ${styles.contentpage}`}>
      <h3>Политика конфиденциальности</h3>
    </main>
    </>
  )
}
