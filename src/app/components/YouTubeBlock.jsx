'use client'

import React, { useEffect, useState } from 'react'
import Image from "next/image";

import {useStater} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

import styles from '@/app/css/mainpage.module.css'

const YouTubeBlock = ({}) => {

    useEffect(() => {

    })

    return(
        <section className={`${styles.youtubeContainers}`}>
            <Image unoptimized src = {`/youtube.png`} alt = '' fill />
            <div className={`${styles.buttonToYouTube}`}>
            <a href = "https://www.youtube.com/@ekonika-moto" target="_blank">
                <svg className={styles.svgLink} xmlns="https://www.w3.org/2000/svg" viewBox="0 0 67 67" fill="none">
                    <g clipPath="url(#clip0_443_19671)">
                        <path d="M0 33.5C0 14.9985 14.9985 0 33.5 0C52.0015 0 67 14.9985 67 33.5C67 52.0015 52.0015 67 33.5 67C14.9985 67 0 52.0015 0 33.5Z" fill="#FECC00"/>
                        <path d="M50.6199 25.2272C50.209 23.6485 48.9981 22.4054 47.4606 21.9834C44.6742 21.2167 33.5 21.2167 33.5 21.2167C33.5 21.2167 22.3258 21.2167 19.5393 21.9834C18.0017 22.4054 16.7908 23.6485 16.3799 25.2272C15.6334 28.0885 15.6334 34.0583 15.6334 34.0583C15.6334 34.0583 15.6334 40.028 16.3799 42.8895C16.7908 44.4682 18.0017 45.7113 19.5393 46.1334C22.3258 46.9 33.5 46.9 33.5 46.9C33.5 46.9 44.6742 46.9 47.4606 46.1334C48.9981 45.7113 50.209 44.4682 50.6199 42.8895C51.3667 40.028 51.3667 34.0583 51.3667 34.0583C51.3667 34.0583 51.3667 28.0885 50.6199 25.2272Z" fill="#262626"/>
                        <path d="M30.15 40.2V29.0333L39.0834 34.6168L30.15 40.2Z" fill="#FECC00"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_443_19671">
                            <rect width="67" height="67" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                
                    <h4>На канал</h4>
                    <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 8 12" fill="none">
                            <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </a>
            </div>
        </section>
    )
}

export default  YouTubeBlock;
