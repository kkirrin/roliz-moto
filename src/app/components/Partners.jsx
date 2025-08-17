'use client'

import Image from 'next/image'

import { useStater } from "@/hooks/useStater"
import {useGetPartnersQuery} from "@/redux/api/partners.api"

import styles from "@/app/css/mainpage.module.css"

import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";

export const Partners = ({}) => {

    //const data = useStater('partners');

    const {isLoading, error, data} = useGetPartnersQuery();
    useEffect(() => {
        //console.log(data)
    })
    return(
        <section className = {`${styles.partnersContainer}`}>
            {
                (isLoading) ? <Loader /> :
                    (data) ? data.data.map((item, index) => {
                        if(!item.attributes) return

                                return(
                                    <div key = {`partKey_${index}`} className = {`${styles.partner}`}>
                                        <Image unoptimized src = {`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.Logo.data.attributes.url}`} alt = {item.attributes.Logo.data.attributes.alt} fill />
                                    </div>
                                )
                            })
                : <h3>Ошибка получения данных :(</h3>
            }
        </section>
    )
}
