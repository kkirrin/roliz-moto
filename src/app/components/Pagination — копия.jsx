"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useFilters, useMain } from "@/hooks/useStater";
import { useSelector } from "react-redux";

import styles from "@/app/css/shop.module.css";
import { useGetProductOnPageQuery } from "@/redux/api/products.api";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { Loader } from "@/app/components/micro/Loader";

const Pagination = ({
  setPageNumber = (f) => f,
  pageNumber = 1,
  categories = [0],
}) => {
  const mobile = useMain();
  const { slug } = useParams();
  const filters = useFilters();

  const sortingMode = useSelector((state) => state.sorting.sortingMode);

  const [selectPage, setSelectPage] = useState(pageNumber);
  // Кол-во товаров на странице
  const step = 9;

  const initialCategory = useMemo(() => {
    // Специальный случай для категории Экипировка
    if (slug && slug[0] === "91") {
      return [92, 88];
    }
    // Для остальных категорий
    return slug && !filters[0]?.values?.[0] ? [slug[0]] : categories;
  }, [slug, filters, categories]);

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);

  const queryParams = useMemo(
    () => ({
      page: selectPage,
      catId: false,
      pageSize: step,
      filters: Array.isArray(categoryFilter) ? categoryFilter : false,
      sortOrder: sortingMode,
    }),
    [selectPage, categoryFilter, sortingMode]
  );

  const { isLoading, data } = useGetProductOnPageQuery(queryParams);

  // Фильтруем товары с ценой больше 0
  const filteredProducts =
    data?.data.filter((product) => product.attributes.price > 0) || [];

  // Убираем товары без фото (ВРЕМЕННО!!)
  const productsWithPhoto = filteredProducts.filter((product) => {
    return product?.attributes?.imgs?.data !== null;
  });

  console.log("productsWithPhoto:", productsWithPhoto);

  // Общее кол-во страниц на основе отфильтрованных товаров
  // const totalPages = Math.ceil(filteredProducts.length / step); 
  
  const totalPages = Math.ceil(productsWithPhoto.length / step); // Временно, потом вернуть filteredProducts

  useEffect(() => {
    if (selectPage > totalPages) {
      setSelectPage(totalPages);
    }
  }, [totalPages]);

  // Обработка изменения страницы
  useEffect(() => {
    setPageNumber(selectPage);
  }, [selectPage, slug, categoryFilter]);

  // Обработка изменения фильтров
  useEffect(() => {
    if (!filters[0]?.values?.[0]) return;

    const newFilters = Array.isArray(filters[0].values)
      ? filters[0].values
      : Array.from(filters[0].values);

    setCategoryFilter(newFilters);
    setSelectPage(1);
    setPageNumber(1);
  }, [filters[0]?.values]);

  // Обработка изменения режима сортировки
  useEffect(() => {
    setSelectPage(1);
    setPageNumber(1);
  }, [sortingMode]);

  // Обработчики кликов
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data.meta.pagination.pageCount) {
      setSelectPage(newPage);
    }
  };

  const renderPageButtons = () => {
    if (!data) return null;

    const totalPages = data.meta.pagination.pageCount;
    const range = 2; // Количество страниц до и после текущей

    let pages = [];

    // Добавляем первую страницу, если текущая страница больше чем 2
    if (selectPage > range + 1) {
      pages.push(1);
      if (selectPage > range + 2) {
        pages.push("..."); // Добавляем многоточие, если пропущены страницы
      }
    }

    // Добавляем страницы вокруг текущей
    for (
      let i = Math.max(1, selectPage - range);
      i <= Math.min(totalPages, selectPage + range);
      i++
    ) {
      pages.push(i);
    }

    // Добавляем последнюю страницу, если текущая страница меньше чем последняя минус 1
    if (selectPage < totalPages - range) {
      if (selectPage < totalPages - range - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return <span key={`dots_${index}`}>...</span>;
      }

      return (
        <button
          key={`pagination_${page}`}
          onClick={() => handlePageChange(page)}
          onTouchStart={() => handlePageChange(page)}
          className={`${
            selectPage === page
              ? styles.activePagination
              : styles.noActivePagination
          }`}
        >
          {page}
        </button>
      );
    });
  };

  if (isLoading) return <Loader />;
  // if (filteredProducts.length === 0) return <p>Товары не найдены</p>;
  if (productsWithPhoto.length === 0) return <p>Товары не найдены</p>; // Временно, потом вернуть filteredProducts

  return (
    <>
    {/* Временно, потом вернуть filteredProducts */}
      {productsWithPhoto.map((product, index) => (
        <ProductCard key={`${product.id}_${index}`} item={product} />
      ))}

      <div className="mt-10 col-span-3 items-baseline" role="navigation">
        <a href="#shop-container" className="flex justify-center gap-4">
          <button
            onClick={() => handlePageChange(selectPage - 1)}
            onTouchStart={() => handlePageChange(selectPage - 1)}
            className="w-10 h-10"
          >
            {"<"}
          </button>

          {renderPageButtons()}

          <button
            onClick={() => handlePageChange(selectPage + 1)}
            onTouchStart={() => handlePageChange(selectPage + 1)}
            className="w-10 h-10"
          >
            {">"}
          </button>
        </a>
      </div>
    </>
  );
};

export default Pagination;
