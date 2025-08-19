"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useFilters } from "@/hooks/useStater";
import { useSelector } from "react-redux";
import { useGetProductOnPageQuery } from "@/redux/api/products.api";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { Loader } from "@/app/components/micro/Loader";

// HOC для анимации (без изменений)
const AnimatedProductCard = React.memo(({ item }) => {
  return (
    <div className="product-card-wrapper">
      <ProductCard item={item} />
    </div>
  );
});
AnimatedProductCard.displayName = 'AnimatedProductCard';


const Pagination = ({
  // Переименовываем пропсы для ясности
  pageNumber = 1,
  setPageNumber = (f) => f,
  categories = [0],
}) => {
  const { slug } = useParams();
  const filters = useFilters();
  const sortingMode = useSelector((state) => state.sorting.sortingMode);

  const [allProducts, setAllProducts] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // Количество товаров на странице
  const itemsPerPage = 6;

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // Загружаем заранее
  });

  // --- ЛОГИКА ФИЛЬТРОВ И СОРТИРОВКИ ---
  // (Без существенных изменений)
  const initialCategory = useMemo(() => {
    if (slug && slug[0] === "91") return [92, 88];
    return slug && !filters[0]?.values?.[0] ? [slug[0]] : categories;
  }, [slug, filters, categories]);

  const categoryFilter = useMemo(() => {
    if (!filters[0]?.values?.[0]) return initialCategory;
    return Array.isArray(filters[0].values) ? filters[0].values : Array.from(filters[0].values);
  }, [filters[0]?.values, initialCategory]);

  // --- ИЗМЕНЕНИЕ: Используем pageNumber из пропсов напрямую ---
  const queryParams = useMemo(() => ({
    page: pageNumber,
    pageSize: itemsPerPage,
    sortOrder: sortingMode,
    filters: Array.isArray(categoryFilter) ? [...categoryFilter] : false,
    catId: false,
  }), [pageNumber, categoryFilter, sortingMode, itemsPerPage]);

  const { data, isLoading, isFetching } = useGetProductOnPageQuery(queryParams, {
    refetchOnFocus: false,
  });

  // --- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: Логика сброса списка ---
  // Этот useEffect теперь реагирует на изменение фильтров И на сброс pageNumber до 1
  useEffect(() => {
    // Если изменились фильтры или сортировка, родительский компонент
    // должен сбросить pageNumber на 1. Мы здесь просто реагируем на это.
    if (pageNumber === 1) {
      setAllProducts([]);
      setHasMoreProducts(true); // Сбрасываем флаг, чтобы можно было снова загружать
    }
  }, [categoryFilter, sortingMode, pageNumber]); // pageNumber добавлен в зависимости


  // --- ОБРАБОТКА НОВЫХ ДАННЫХ ---
  useEffect(() => {
    if (!data?.data) return;

    const newProducts = data.data;

    // Если это первая страница, заменяем товары.
    // Иначе - добавляем, избегая дубликатов.
    if (pageNumber === 1) {
      setAllProducts(newProducts);
    } else {
      setAllProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNewProducts];
      });
    }

    setHasMoreProducts(newProducts.length === itemsPerPage);
    
  }, [data, pageNumber, itemsPerPage]); // Добавляем pageNumber для надежности


  // --- ЛОГИКА ПОДГРУЗКИ ---
  useEffect(() => {
    // Если триггер видим, не идет загрузка и есть еще товары - запрашиваем следующую страницу
    if (inView && !isFetching && hasMoreProducts) {
      // Вызываем сеттер из родительского компонента
      setPageNumber(prevPage => prevPage + 1);
    }
  }, [inView, isFetching, hasMoreProducts, setPageNumber]);


  if (isLoading && pageNumber === 1) return <Loader />;
  if (allProducts.length === 0 && !isLoading) return <p>Товары не найдены</p>;

  return (
    <>
      <style jsx global>{`
        .product-card-wrapper {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {allProducts.map((product) => (
        <AnimatedProductCard key={product.id} item={product} />
      ))}

      {/* Индикатор загрузки и триггер */}
      <div
        ref={loadMoreRef}
        style={{
          gridColumn: '1 / -1',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isFetching && <Loader />}
      </div>

      {/* Индикатор окончания списка */}
      {!hasMoreProducts && allProducts.length > 0 && (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: '#666' }}>
          Все товары загружены ({allProducts.length} шт.)
        </div>
      )}
    </>
  );
};

export default Pagination;