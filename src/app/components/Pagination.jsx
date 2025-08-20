"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useFilters } from "@/hooks/useStater";
import { useSelector } from "react-redux";
import { useGetProductOnPageQuery } from "@/redux/api/products.api";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { Loader } from "@/app/components/micro/Loader";

// HOC для анимации (без изменений)
const AnimatedProductCard = React.memo(({ item, forPartners }) => {
  return (
    <div className="product-card-wrapper">
      <ProductCard item={item} forPartners={forPartners} />
    </div>
  );
});
AnimatedProductCard.displayName = 'AnimatedProductCard';


const Pagination = ({
  pageNumber = 1,
  setPageNumber = (f) => f,
  categories = [0],
  forPartners = false,
}) => {
  const { slug } = useParams();
  const filters = useFilters();
  const sortingMode = useSelector((state) => state.sorting.sortingMode);
  

  const [allProducts, setAllProducts] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const itemsPerPage = 6;

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px',
  });

  // Логика фильтров и сортировки (без изменений)
  const initialCategory = useMemo(() => {
    if (slug && slug[0] === "91") return [92, 88];
    return slug && !filters[0]?.values?.[0] ? [slug[0]] : categories;
  }, [slug, filters, categories]);

  const categoryFilter = useMemo(() => {
    if (!filters[0]?.values?.[0]) return initialCategory;
    return Array.isArray(filters[0].values) ? filters[0].values : Array.from(filters[0].values);
  }, [filters[0]?.values, initialCategory]);

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

  // --- ИЗМЕНЕНИЕ №1: Убираем преждевременную очистку ---
  // Вместо очистки списка, мы просто сбрасываем флаг 'hasMoreProducts',
  // чтобы пагинация могла начаться заново для нового списка.
  useEffect(() => {
    setHasMoreProducts(true);
  }, [categoryFilter, sortingMode]);

  useEffect(() => {
    setPageNumber(1);
    setAllProducts([]);
    setHasMoreProducts(true);
}, [sortingMode, setPageNumber]);


  // --- ОБРАБОТКА НОВЫХ ДАННЫХ (логика замены/добавления) ---
  useEffect(() => {
    // Ждем, пока данные действительно придут
    if (!data?.data) return;

    const newProducts = data.data;

    // Если это первая страница (т.е. фильтры изменились),
    // мы ПОЛНОСТЬЮ ЗАМЕНЯЕМ старый список новым.
    // Это и есть ключ к решению проблемы "мерцания".
    if (pageNumber === 1) {
      setAllProducts(newProducts);
    } else {
      // Иначе, как и раньше, добавляем новые товары к существующим, избегая дубликатов.
      setAllProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNewProducts];
      });
    }

    setHasMoreProducts(newProducts.length === itemsPerPage);
    
  }, [data, pageNumber, itemsPerPage]); // Зависимости те же


  // --- ЛОГИКА ПОДГРУЗКИ (без изменений) ---
  useEffect(() => {
    if (inView && !isFetching && hasMoreProducts) {
      setPageNumber(prevPage => prevPage + 1);
    }
  }, [inView, isFetching, hasMoreProducts, setPageNumber]);

  // --- ИЗМЕНЕНИЕ №2: Улучшенное условие для полноэкранного лоадера ---
  // Показываем его только при САМОЙ ПЕРВОЙ загрузке, когда на экране еще ничего нет.
  if (isLoading && allProducts.length === 0) return <Loader />;
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
        <AnimatedProductCard key={product.id} item={product} forPartners={forPartners} />
      ))}

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
        {/*
          Этот лоадер будет появляться при подгрузке следующих страниц И
          при смене фильтров (пока старые товары еще на экране).
          Это отличный UX-индикатор.
        */}
        {isFetching && <Loader />}
      </div>

      {!hasMoreProducts && allProducts.length > 0 && (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: '#666' }}>
          Все товары загружены ({allProducts.length} шт.)
        </div>
      )}
    </>
  );
};

export default Pagination;