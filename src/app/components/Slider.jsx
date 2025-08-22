"use client";
import React from "react";
import { useEffect, useState } from "react";

import TestComponent from './TestComponent'
import Image from "next/image";
import { Forms } from "@/app/components/Forms";


import styles from "@/app/css/slider.module.css";

import { useStater } from "@/hooks/useStater";

import { Loader } from "@/app/components/micro/Loader";

import { useGetSlidersQuery } from "@/redux/api/pages.api";
import Link from "next/link";

export const Slider = ({ }) => {
  const slides = useStater("slides");

  const [selectSlide, setSelectSlide] = useState(0);
  const [sliderSpeed, setSliderSpeed] = useState(3000);
  const [isPaused, setIsPaused] = useState(false);

  const { isLoading, error, data } = useGetSlidersQuery();

  const nextSlide = () => {
    if (!data || isPaused) return false;
    if (selectSlide < data.data.length - 1) {
      setSelectSlide(selectSlide + 1);
    } else {
      setSelectSlide(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, sliderSpeed);
    return () => clearInterval(interval);
  }, [selectSlide, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className={`${styles.section} flex flex-row flex-nowrap relative overflow-hidden my-4 rounded-[17px] bg-[linear-gradient(142deg,rgba(0,0,0,0.39)_0%,rgba(0,0,0,0.00)_100%),lightgray_-2.779px_-40.945px/100.373%_130.723%_no-repeat]`}>
      {!isLoading && data ? (
        data?.data ? (
          data.data.map((slide, index) => {

            return (
              <article
                style={
                  index === 0
                    ? { marginLeft: `-${selectSlide * 100}%` }
                    : null
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={`slidekey_${index}`}
                className={`${styles.sliderItem}`}
              >
                <div className="flex flex-col gap-2 p-8 md:px-12 md:py-9 xl:px-20 xl:py-16 xl:gap-4 ">
                  <h2 className="text-[22px] md:text-3xl xl:text-[55px] md:leading-[1] xl:leading-[1.2] font-semibold md:w-[380px] xl:w-[655px] text-shadow-sm">
                    {slide.attributes.header}
                  </h2>
                  <p className="text-base xl:text-2xl">
                    {slide.attributes.desc}
                  </p>

                  {slide.attributes.isButtonVisible && (
                    <button className="font-semibold bg-yellow-default hover:bg-yellow-dark rounded-lg py-3 px-12 w-fit transition-all">
                      <Link href={`${slide.attributes.href}`}>
                        Выбрать в каталоге
                      </Link>
                    </button>
                  )}
                </div>

                <div className={`${styles.sliderBg}`}>
                  <Image
                    src={`/api/proxy-image?url=${encodeURIComponent(`http://${process.env.NEXT_PUBLIC_URL_API}${slide.attributes.src.data.attributes.url}`)}`}
                    blurDataURL={`/api/proxy-image?url=${encodeURIComponent(`http://${process.env.NEXT_PUBLIC_URL_API}${slide.attributes.src.data.attributes.url}`)}`}
                    placeholder="blur"
                    quality={75}
                    priority
                    alt="image"
                    fill />
                </div>
              </article>
            );
          })
        ) : (
          <h3>Слайдеры отсутствуют</h3>
        )
      ) : (
        <Loader />
      )}
      <SliderController slides={slides} setSelectSlide={setSelectSlide} data={data} />

      {/* <TestComponent /> */}
    </section>
  );
};

const SliderController = ({ slides, setSelectSlide = (f) => f, data }) => {
  return (
    <div className="w-full h-7 xl:h-10 absolute bottom-0 flex justify-center">
      {data?.data && data?.data.length > 1
        ? data?.data.map((slide, index) => {
          // if (index > slides.length - data.data.length) return;
          return (
            <div
              onClick={() => {
                setSelectSlide(index);
              }}
              key={`dotKey_${index}`}
              className="w-3 h-3 bg-gray-dark hover:bg-yellow-dark cursor-pointer transition-all duration-300 rounded-full z-[9] hover:scale-[1.2] [&:not(:first-child)]:ml-[10px]"
            ></div>
          );
        })
        : null}
    </div>
  );
};
