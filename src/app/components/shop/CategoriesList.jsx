import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/css/shop.module.css";
import { useParams } from "next/navigation";
import { Loader } from "@/app/components/micro/Loader";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";

const CategoriesList = ({ categoryList = null }) => {
  const params = useParams();
  const id = params?.slug?.[0] || null;
  
  // Делаем запрос только когда categoryList === null
  const { isLoading, data } = useGetCategoriesQuery(undefined, {
    skip: categoryList !== null
  });
 
  // Оригинальная логика для обычных категорий
  const category = data?.data?.find((item) => item.id == id);

  // Если передан categoryList, используем его
  if (categoryList && categoryList.data) {
    if (categoryList.data.length > 0) {
      return (
        <>
          {categoryList.data
            .filter((item) => !item.attributes.parent.data)
            .sort((a, b) => {
              const order = [
                "мотоциклы",
                "велосипеды",
                "экипировка",
                "запчасти",
              ];
              const nameA = a.attributes.name.toLowerCase();
              const nameB = b.attributes.name.toLowerCase();

              const indexA = order.indexOf(nameA);
              const indexB = order.indexOf(nameB);

              if (indexA === -1 && indexB === -1) return 0;
              if (indexA === -1) return 1;
              if (indexB === -1) return -1;

              return indexA - indexB;
            })
            .map((item) => (
            <Link
            key={`key_catlist_${item.id}`}
            href={`/routes/shop/${item.id}`}
            className="py-2 px-4 rounded-md bg-white-default  hover:bg-black transition-all duration-300"
            >
              <p className={styles.textWhite}>{item.attributes.name}</p>
            </Link>
            ) 
          )}
        </>
      );
    }
  
    return null;
  }

  // Если categoryList === null, используем данные из API
  if (isLoading) return <Loader />;

  if (typeof data !== "undefined" &&
      data.data &&
      category?.attributes?.childs?.data) {
    return (
      <>
        {category.attributes.childs.data.map((item) => (
          <Link
            key={`key_catlist_${item.id}`}
            href={`/routes/shop/${item.id}`}
            className="py-2 px-4 rounded-md bg-white-default  hover:bg-black transition-all duration-300"
          >
            <p className={styles.textWhite}>{item.attributes.name}</p>
          </Link>
        ))}
      </>
    );
  }

  return null;
};

export default CategoriesList;