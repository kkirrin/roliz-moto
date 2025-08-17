"use client";
import React, { useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/css/shop.module.css";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { Loader } from "@/app/components/micro/Loader";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";
import { useGetProductOnPageQuery } from "@/redux/api/products.api";

export const ProductRow = React.memo(
  ({ category = 0, place = "main", bestSales }) => {
    const refScroll = useRef();

    const handleMove = useCallback((start, end) => {
      if (!start || !end) return;
      const scrollOffset = refScroll.current.getBoundingClientRect().width;
      refScroll.current.scrollLeft +=
        start > end ? scrollOffset : -scrollOffset;
    }, []);

    //обработка клика по стрелкам
    const handleArrowClick = useCallback((direction) => {
      const scrollOffset = refScroll.current.getBoundingClientRect().width;
      refScroll.current.scrollLeft +=
        direction === "right" ? scrollOffset : -scrollOffset;
    }, []);

    return (
      <section className={`${styles.productContainer}`}>
        <div className={`${styles.upBlock}`}>
          <LoadingCategory category={category} bestSales={bestSales} />
        </div>
        <div className="relative ">
          <Image
            src="/icon/ArrowRightWhite.svg"
            alt="arrow-right"
            width={45}
            height={45}
            className="absolute top-[15%] -left-6 z-10 rotate-180 cursor-pointer rounded-full shadow-[0_0_15px_0_rgba(0,0,0,0.15)] transition-all"
            onClick={() => handleArrowClick("left")}
          />
          <Image
            src="/icon/ArrowRightWhite.svg"
            alt="arrow-right"
            width={45}
            height={45}
            className="absolute top-[15%] -right-6 z-10 cursor-pointer rounded-full shadow-[0_0_15px_0_rgba(0,0,0,0.15)] transition-all"
            onClick={() => handleArrowClick("right")}
          />
          <div
            // onMouseDown={(evt) => handleMove(evt.clientX, null)}
            // onMouseUp={(evt) => handleMove(null, evt.clientX)}
            ref={refScroll}
            className={`${styles.downBlock}  overflow-x-auto 
            [&::-webkit-scrollbar]:rounded-full
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar]:h-1
          

`}
          >
            <LoadingProducts category={category} />
          </div>
        </div>
      </section>
    );
  }
);

const LoadingCategory = React.memo(({ category, bestSales }) => {
  const { isLoading, data } = useGetCategoriesQuery();

  const categoryName = React.useMemo(() => {
    if (bestSales) return "Популярные товары";
    if (!isLoading && data?.data) {
      const categoryItem = data.data.find((item) => {
        return item.id.toString() === category;
      });

      return categoryItem
        ? categoryItem.attributes.name
        : "Категория не найдена";
    }
    return null;
  }, [isLoading, data, category, bestSales]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={`${styles.left}`}>
        <h2>{categoryName}</h2>
      </div>
      <div className={`${styles.right}`}>
        <Link href={`/routes/shop/${category}`}>
          В каталог
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
          >
            <path
              d="M1 1.5L6 6.5L1 11.5"
              stroke="#ACACAC"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </>
  );
});

const LoadingProducts = React.memo(({ category = 79 }) => {
  const { isLoading, data } = useGetProductOnPageQuery({
    page: 0,
    filters: category ? [category] : false,
    pageSize: 30,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data) {
    return <p>Товары не найдены</p>;
  }

  return (
    <>
      {data.data.map((item) => (
        <ProductCard key={item.id} item={item} viewMode="grid" />
      ))}
    </>
  );
});
