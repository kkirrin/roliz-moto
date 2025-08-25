"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useFilters } from "@/hooks/useStater";
import { useSelector } from "react-redux";
import { useGetProductOnPageQuery } from "@/redux/api/products.api";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { Loader } from "@/app/components/micro/Loader";

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

  // --- ИСПРАВЛЕНИЕ №1: УДАЛЕН ПРОБЛЕМНЫЙ useEffect ---
  // Этот useEffect возвращал старые баги и мешал правильной работе.

  // Вместо него оставляем только безопасный сброс флага при смене фильтров
  useEffect(() => {
    // При смене фильтров мы предполагаем, что для нового набора могут быть товары
    setHasMoreProducts(true);
  }, [categoryFilter, sortingMode]);

  useEffect(() => {
    setPageNumber(1);
    setAllProducts([]);
    setHasMoreProducts(true);
  }, [sortingMode, setPageNumber]);



  // --- ОБРАБОТКА НОВЫХ ДАННЫХ ---
  useEffect(() => {
    if (!data?.data || data?.data.length === 0) return;
    
    const newProducts = data.data;

    if (pageNumber === 1) {
      setAllProducts(newProducts);
    } else {
      setAllProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNewProducts];
      });
    }

    // --- ИСПРАВЛЕНИЕ №2: ПРАВИЛЬНАЯ ЛОГИКА ОПРЕДЕЛЕНИЯ КОНЦА СПИСКА ---
    // Если API вернуло МЕНЬШЕ товаров, чем мы просили, значит, это ТОЧНО конец.
    if (newProducts.length < itemsPerPage) {
      setHasMoreProducts(false);
    }
    
  }, [data, pageNumber, itemsPerPage]);


  useEffect(() => {
    if (data?.data.length === 0) {
      setHasMoreProducts(false);
    }

    // Этот хук теперь не сработает лишний раз, потому что hasMoreProducts станет false вовремя
    if (inView && !isFetching && hasMoreProducts) {
      setPageNumber(prevPage => prevPage + 1);
    }
  }, [inView, isFetching, hasMoreProducts, setPageNumber, data]);

  
  if (isLoading && allProducts.length === 0) return <Loader />;
  if (allProducts.length === 0 && !isLoading) return <p>Товары не найдены</p>;

  return (
    <>
      <style jsx global>{`
        .product-card-wrapper { animation: fadeIn 0.5s ease-out forwards; }
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