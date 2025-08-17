"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

import styles from "@/app/css/mainpage.module.css";

const BigNavButtons = ({}) => {
  useEffect(() => {});

  return (
    <section className="grid grid-rows-2 pt-10 md:grid-cols-2 md:grid-rows-1 gap-y-5 md:gap-y-0 md:gap-x-3 text-white-default text-lg lg:text-[34px] ">
      <Link href={`/routes/pages/opt`}>
        <article className="relative flex flex-col gap-3 lg:gap-7 bg-[url('/images/opt.png')] bg-cover bg-center rounded-2xl p-6 min-h-[260px] lg:min-h-[430px] ">
          <div className="flex justify-between uppercase ">
            <h3 className=" ">Оптовикам</h3>
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
            >
              <path
                d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.2929L18.3431 0.928934C17.9526 0.538409 17.3195 0.538409 16.9289 0.928934C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM1 9L24 9L24 7L1 7L1 9Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <ul className="text-white text-[10px] font-normal leading-[1.2] lg:text-lg lg:leading-[1] space-y-3 lg:space-y-5">
              <li className="grid grid-cols-[16px_125px] gap-3">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5">
                  <img src="/icon/check-black.svg" className="w-full h-full"/>
                </div>
                <p>Выгодные предложения по ценам на товары</p>
              </li>
              <li className="grid grid-cols-[16px_125px] gap-3">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5">
                  <img src="/icon/check-black.svg" className="w-full h-full"/>
                </div>
                <p>Персональный менеджер</p>
              </li>
              <li className="grid grid-cols-[16px_125px] gap-3">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5">
                  <img src="/icon/check-black.svg" className="w-full h-full"/>
                </div>
                <p>Бесперебойные поставки товаров</p>
              </li>
            </ul>
          </div>
        </article>
      </Link>
      <Link href={`/routes/pages/opt`}>
        <article className="relative flex flex-col gap-3 lg:gap-7 bg-[url('/images/delivery.png')] bg-cover bg-center rounded-2xl p-6 min-h-[260px] lg:min-h-[430px] ">
          <div className="flex justify-between uppercase ">
            <h3 className=" ">Доставка</h3>
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
            >
              <path
                d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.2929L18.3431 0.928934C17.9526 0.538409 17.3195 0.538409 16.9289 0.928934C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM1 9L24 9L24 7L1 7L1 9Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <ul className="text-white text-[10px] font-normal leading-[1.1] lg:text-lg lg:leading-[1] space-y-3 lg:space-y-5">
              <li className="grid grid-cols-[16px_155px] lg:grid-cols-[20px_270px] items-center gap-3">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5">
                  <img src="/icon/check-yellow.svg" className="w-full h-full" />
                </div>
                <p>Доставка в любой город РФ</p>
              </li>
              <li className="grid grid-cols-[16px_155px] lg:grid-cols-[20px_270px]  gap-3">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5">
                  <img src="/icon/check-yellow.svg" className="w-full h-full" />
                </div>

                <p>
                  Работаем с многими транспортными компаниями: Почта России,
                  CDEK, ТРАНС ТРЕК-ДВ, ПЭК, Энергия, Тройка ДВ и другие
                </p>
              </li>
            </ul>
          </div>
        </article>
      </Link>
    </section>
  );
};

export default BigNavButtons;
