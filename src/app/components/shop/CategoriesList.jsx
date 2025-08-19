import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/css/shop.module.css";
import { useParams } from "next/navigation";
import { Loader } from "@/app/components/micro/Loader";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";

const CategoriesList = () => {
  const { isLoading, data } = useGetCategoriesQuery();
  console.log(data);
  const params = useParams();
  const id = params?.slug?.[0] || null;

  // объект текущей категории
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
