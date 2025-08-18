"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
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
  const { slug } = useParams();
  const filters = useFilters();

  const sortingMode = useSelector((state) => state.sorting.sortingMode);

  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  // Количество товаров на странице
  const itemsPerPage = 12;

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
      page: currentPage,
      catId: false,
      pageSize: itemsPerPage,
      sortOrder: sortingMode,
      filters: Array.isArray(categoryFilter) ? categoryFilter : false,
    }),
    [currentPage, categoryFilter, sortingMode, itemsPerPage]
  );

  const { isLoading, data } = useGetProductOnPageQuery(queryParams);
  


  // Intersection Observer для отслеживания конца списка
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5, // Увеличиваем порог срабатывания
    rootMargin: '100px',
    delay: 300, // Добавляем задержку перед срабатыванием
  });



  // Обработка изменения страницы
  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage, setPageNumber]);

    // Обработка новых данных - добавляем к существующим
  useEffect(() => {
    console.log('Data changed:', {
      data: data?.data,
      loadingMore,
      currentPage,
      hasMoreProducts
    });

    if (!data?.data || loadingMore) return;

    const newProducts = data.data;
    console.log('Adding new products:', {
      newProductsCount: newProducts.length,
      currentPage
    });
    
    if (currentPage === 1) {
      // Первая страница - заменяем все товары
      setAllProducts(newProducts);
    } else {
      // Последующие страницы - добавляем к существующим
      setAllProducts(prev => {
        console.log('Previous products:', prev.length);
        const updatedProducts = [...prev, ...newProducts];
        console.log('Updated products:', updatedProducts.length);
        return updatedProducts;
      });
    }
    
    // Проверяем, есть ли еще товары для загрузки
    setHasMoreProducts(newProducts.length === itemsPerPage);
    setLoadingMore(false);
  }, [data, currentPage, itemsPerPage, loadingMore]);

  // Обработка изменения фильтров
  useEffect(() => {
    if (!filters[0]?.values?.[0]) return;

    const newFilters = Array.isArray(filters[0].values)
      ? filters[0].values
      : Array.from(filters[0].values);

    setCategoryFilter(newFilters);
    setCurrentPage(1);
    setPageNumber(1);
    setAllProducts([]);
    setHasMoreProducts(true);
    setLoadingMore(false);
  }, [filters[0]?.values, setPageNumber]);

    


  // Обработка изменения режима сортировки
  useEffect(() => {
    setCurrentPage(1);
    setPageNumber(1);
    setAllProducts([]);
    setHasMoreProducts(true);
    setLoadingMore(false);
  }, [sortingMode, setPageNumber]);

  // Автоматическая загрузка следующей страницы при достижении конца списка
  useEffect(() => {
    let timeoutId;
    
    if (inView && hasMoreProducts && !isLoading && !loadingMore) {
      timeoutId = setTimeout(() => {
        setLoadingMore(true);
        setCurrentPage(prev => prev + 1);
      }, 300); // Добавляем задержку между запросами
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [inView, hasMoreProducts, isLoading, loadingMore]);



  if (isLoading && allProducts.length === 0) return <Loader />;
  if (allProducts.length === 0 && !isLoading) return <p>Товары не найдены</p>;
  
  console.log('Rendering with products:', allProducts.length);

  return (
    <>
      {/* Товары */}
      {allProducts.map((product, index) => {
        console.log('Rendering product:', index, product.id);
        return (
          <ProductCard 
            key={`${product.id}_${index}`} 
            item={product} 
          />
        );
      })}
      
      {/* Индикатор загрузки и триггер для подгрузки */}
      <div 
        ref={loadMoreRef} 
        style={{ 
          gridColumn: '1 / -1',
          height: '60px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          width: '100%'
        }}
      >
        {loadingMore && <Loader />}
        {!loadingMore && hasMoreProducts && <div>Прокрутите вниз для загрузки еще</div>}
      </div>
      
      {/* Индикатор окончания списка */}
      {!hasMoreProducts && allProducts.length > 0 && (
        <div 
          style={{ 
            gridColumn: '1 / -1',
            textAlign: 'center', 
            padding: '20px', 
            color: '#666',
            width: '100%'
          }}
        >
          Все товары загружены ({allProducts.length} шт.)
        </div>
      )}
    </>
  );
};

export default Pagination;
