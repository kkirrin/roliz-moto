"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import styles from "@/app/css/sales.module.css";
import { useGetSalesQuery } from "@/redux/api/sales.api";
import { useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";
import { Loader } from "@/app/components/micro/Loader";

const InfiniteSales = ({ speed = 0 }) => {
  const { isLoading, data } = useGetSalesQuery();

  useEffect(() => {});

  return (
    <div className={`${styles.salesContainer} ${styles.fullWidth}`}>
      <Marquee autoFill={true}>
        {!isLoading ? (
          typeof data != "undefined" &&
          data.data &&
          Array.isArray(data.data) ? (
            data.data.map((item, index) => {
              return (
                <div
                  key={`key_sales_${item.id}`}
                  className={`${styles.oneSale}`}
                >
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="5"
                    height="6"
                    viewBox="0 0 5 6"
                    fill="none"
                  >
                    <circle cx="2.5" cy="3" r="2.5" fill="#262626" />
                  </svg>
                  <h3>{item.attributes.name}</h3>
                </div>
              );
            })
          ) : null
        ) : (
          <Loader />
        )}
      </Marquee>
    </div>
  );
};

export default InfiniteSales;
