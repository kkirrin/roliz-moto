"use client";

import React, { useEffect, useState } from "react";

import { useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

import { useGetCategoriesQuery } from "@/redux/api/categories.api";

const CategoryName = ({ id = -1 }) => {
  const { isLoading, error, data } = useGetCategoriesQuery();

  useEffect(() => {}, [data]);

  return (
    <h1>
      {id !== "Магазин"
        ? !isLoading
          ? data && data.data
            ? ((data) => {
                //console.log(data)
                if (Array.isArray(data.data)) {
                  return data.data.find((item) => item.id == id)?.attributes
                    .name;
                } else {
                  return "Категория не найдена";
                }
              })(data)
            : ""
          : ""
        : "Магазин"}
    </h1>
  );
};

export default CategoryName;
