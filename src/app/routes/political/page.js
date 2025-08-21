'use client'

import React from 'react';
import { useGetPolicyQuery } from "@/redux/api/pages.api";
import styles from '@/app/css/mainpage.module.css'

export default function Page({ }) {
  const { isLoading, error, data } = useGetPolicyQuery();

  console.log('data', data);

  return (
    <>
      <main className={`${styles.main} ${styles.contentpage}`}>
        <h1>Политика конфиденциальности</h1>
        <div className={styles.policy_text} dangerouslySetInnerHTML={{ __html: data?.data?.attributes?.content }} />
      </main>
    </>
  )
}
