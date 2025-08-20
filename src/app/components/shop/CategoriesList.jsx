import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/css/shop.module.css";
import { useParams } from "next/navigation";
import { Loader } from "@/app/components/micro/Loader";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";

const CategoriesList = ({ forPartners = false, partnerCategories = [] }) => {
  const { isLoading, data } = useGetCategoriesQuery();
  const params = useParams();
  const id = params?.slug?.[0] || null;

  // Если это для партнеров, показываем специальные категории
  if (forPartners) {
    if (isLoading) return <Loader />;

    if (!partnerCategories || partnerCategories.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500">Категории для партнеров не найдены</p>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-3">
        {partnerCategories.map((category) => (
          <Link
            key={`partner_cat_${category.id}`}
            href={`/routes/shop/${category.id}`}
            className="py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
          >
            <p>{category.name}</p>
          </Link>
        ))}
      </div>
    );
  }

  // Оригинальная логика для обычных категорий
  const category = data?.data?.find((item) => item.id == id);

  if (isLoading) return <Loader />;

  return (
    <>
      {typeof data !== "undefined" &&
      data.data &&
      category?.attributes?.childs?.data
        ? category.attributes.childs.data.map((item) => (
            <Link
              key={`key_catlist_${item.id}`}
              href={`/routes/shop/${item.id}`}
              className="py-2 px-4 rounded-md bg-white-default  hover:bg-black transition-all duration-300"
            >
              <p className={styles.textWhite}>{item.attributes.name}</p>
            </Link>
          ))
        : null}
    </>
  );
};

export default CategoriesList;