"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/app/css/mainpage.module.css";
import { useActions } from "@/hooks/useActions";
import { ProductRow } from "./components/shop/ProductRow";
import { Slider } from "./components/Slider";
import Pluses from "./components/Pluses";
import InfiniteSales from "@/app/components/micro/InfiniteSales";
import NewsBlock from "./components/NewsBlock";
import { Forms } from "./components/Forms";
import {
  useGetProductOnPageQuery,
  useGetProductsQuery,
} from "@/redux/api/products.api";
import { useStater } from "@/hooks/useStater";
import BigNavButtons from "@/app/components/BigNavButtons";
import YouTubeBlock from "@/app/components/YouTubeBlock";
import Head from "next/head";
import { Services } from "./components/Services";
import NavCatalogue from "./components/micro/NavCatalogue";
import { ConsultForm } from "./components/Forms";
// import Consult from "./components/Consult";
// import News from "./components/News";

export default function Home() {
  const [statusLoad, setStatusLoad] = useState(false);
  const { getDataProducts } = useActions();
  const { products } = useStater("products");
  const { setScreenSize } = useActions();
  const { isLoading, data } = useGetProductOnPageQuery({
    page: 0,
    catId: false,
    pageSize: 1,
  });

  useEffect(() => {
    !isLoading ? (data ? getDataProducts(data.data, true) : null) : null;
  }, [isLoading]);

  useEffect(() => {
    if (!statusLoad) {
      setStatusLoad(true);
    }
  });

  return (
    <>
      <main className={styles.main}>
        <Slider />
        {/* <Pluses /> */}
        <NavCatalogue />
        <ProductRow
          category={process.env.NEXT_PUBLIC_MOTO_ID}
          place="main"
          bestSales={true}
        />
        <div className={` ${styles.darkBlock}`}>
          <InfiniteSales />
          {/* <ProductRow category={process.env.NEXT_PUBLIC_VELO_ID} place="" /> */}
          <BigNavButtons />
        </div>
        <NewsBlock />
        <div className="my-16">
          <ConsultForm />
        </div>
        {/* <ProductRow category={process.env.NEXT_PUBLIC_HEAD_ID} place="" /> */}
        {/* <YouTubeBlock /> */}
        {/* <ProductRow category={process.env.NEXT_PUBLIC_VELO_ID} place="" /> */}
      </main>
    </>
  );
}
