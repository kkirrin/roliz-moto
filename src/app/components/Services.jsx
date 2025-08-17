"use client";

import React, { useEffect } from "react";
import { useGetWarrantyQuery } from "@/redux/api/pages.api";

export const Services = ({}) => {
  const { isLoading, data } = useGetWarrantyQuery();

  useEffect(() => {}, [data]);

  if (isLoading) return <>Загрузка ...</>;

  return (
    <section className="flex bg-blue-500">
      {/* <p>{data.data.attributes.plainText}</p> */}
      <p dangerouslySetInnerHTML={{ __html: data.data.attributes.textHtml }}></p>
    </section>
  );
};
