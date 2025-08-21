"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFilters, useMain } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";
import { usePathname, useSearchParams } from "next/navigation";
import { useGetMainCategoriesQuery } from "@/redux/api/main-categories.api";
import styles from "@/app/css/mainpage.module.css";
import stylesShop from "@/app/css/shop.module.css";
import Filters from "@/app/components/shop/Filters";
import CategoriesList from "@/app/components/shop/CategoriesList";
import Pagination from "@/app/components/Pagination";
import Breadcrumbs from "@/app/components/micro/Breadcrumbs";
import Sorting from "@/app/components/micro/Sorting";
import { Loader } from "@/app/components/micro/Loader";
import { useCustomers } from "@/hooks/useStater";

export default function Page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const { viewMode } = useSelector((state) => state.view);
  const sortingMode = useSelector((state) => state.sorting);

  const { isLoading, data } = useGetMainCategoriesQuery();

  const categoryName = (() => {
    if (pathname.endsWith("/shop")) {
      return "Каталог";
    }
  })();


  const { mobile } = useMain("main");
  const [showFilters, setShowFilters] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [forPartners, setForPartners] = useState(false);
  const { toggleModal } = useActions();

  const filters = useFilters();
    // Получаем данные пользователя
  const customer = useCustomers();
  const isAuthenticated = customer?.authStatus;

  // useEffect(() => {
  //   const urlForPartners = searchParams.get('forPartners');
    
  //   if (urlForPartners === 'true' && forPartners) {
  //     // Проверяем доступ
  //     console.log(customer?.type)
  //     if (customer?.type === "Оптовый покупатель") {
  //       setForPartners(true);
  //       console.log("Автоматически включен режим для партнеров");
        
        
  //       // Убираем параметр из URL после обработки
  //       const newUrl = new URL(window.location);
  //       newUrl.searchParams.delete('forPartners');
  //       window.history.replaceState({}, '', newUrl);
      
  //     } else {
  //       // Если нет доступа, убираем параметр из URL
  //       const newUrl = new URL(window.location);
  //       newUrl.searchParams.delete('forPartners');
  //       window.history.replaceState({}, '', newUrl);
  //     }
  //   }
  // }, [searchParams, forPartners, customer?.type]);


  useEffect(() => {
    const urlForPartners = searchParams.get('forPartners');

    if (forPartners) {
      // Если пользователь не авторизован
      if (customer.type !== "Оптовый покупатель") {
        toggleModal("modals_auth");
        setForPartners(false); // Возвращаем в обычный режим
        return;
      }

      // Если пользователь не имеет статус "Оптовый покупатель"
      if (customer.type !== "Оптовый покупатель") {
        toggleModal("modals_auth");
        setForPartners(false); // Возвращаем в обычный режим
        return;
      }
    }

    if(urlForPartners === 'true' && forPartners) {
      setForPartners(true);
    }
  }, [forPartners, customer, toggleModal, searchParams]);

  useEffect(() => {
    if (!isLoading && data) {
    }
  }, [data, isLoading]);

  if (isLoading) return <Loader />;

  return (
    <main className={`${styles.main} ${stylesShop.shopPage}`}>
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[40px] font-semibold">{categoryName}</h1>
        
        {/* Кнопка переключения режима */}
        <div className="flex items-center gap-4">
          {forPartners && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Режим для партнеров</span>
            </div>
          )}
          
          <button 
            onClick={() => setForPartners(!forPartners)}
            className={`px-4 py-2 font-medium transition-all duration-200  flex gap-3 bg-yellow-default p-[13px] rounded-[10px] lg:px-7 lg:py-3 lg:rounded-xl${
              forPartners 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {forPartners ? 'Обычный режим' : 'Оптовым покупателям'}
          </button>
        </div>
      </div>

      <section className={stylesShop.rowCats}>
        <CategoriesList categoryList={data} />
      </section>
      
      <Sorting forPartners={forPartners}/>

      <section className={stylesShop.shopContainer}>
        <div className={stylesShop.filtersContainer}>
          {filters.length > 0 ? (
            <div className={stylesShop.buttonFiltersContainer}>
              {mobile && (
                <button
                  style={{ opacity: showFilters ? "0" : "1" }}
                  onTouchStart={() => setShowFilters(!showFilters)}
                >
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15 10.5C15.7538 10.4998 16.4874 10.2565 17.0919 9.80609C17.6963 9.35568 18.1393 8.72226 18.355 7.99997H21C21.2652 7.99997 21.5196 7.89461 21.7071 7.70708C21.8946 7.51954 22 7.26519 22 6.99997C22 6.73476 21.8946 6.4804 21.7071 6.29287C21.5196 6.10533 21.2652 5.99997 21 5.99997H18.355C18.139 5.27805 17.6958 4.64507 17.0914 4.19504C16.487 3.74502 15.7536 3.50195 15 3.50195C14.2464 3.50195 13.513 3.74502 12.9086 4.19504C12.3042 4.64507 11.861 5.27805 11.645 5.99997H3C2.73478 5.99997 2.48043 6.10533 2.29289 6.29287C2.10536 6.4804 2 6.73476 2 6.99997C2 7.26519 2.10536 7.51954 2.29289 7.70708C2.48043 7.89461 2.73478 7.99997 3 7.99997H11.645C11.8607 8.72226 12.3037 9.35568 12.9081 9.80609C13.5126 10.2565 14.2462 10.4998 15 10.5ZM3 16C2.73478 16 2.48043 16.1053 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5195 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H5.145C5.36103 18.7219 5.80417 19.3549 6.40858 19.8049C7.013 20.2549 7.74645 20.498 8.5 20.498C9.25355 20.498 9.987 20.2549 10.5914 19.8049C11.1958 19.3549 11.639 18.7219 11.855 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5195 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1053 21.2652 16 21 16H11.855C11.639 15.2781 11.1958 14.6451 10.5914 14.195C9.987 13.745 9.25355 13.502 8.5 13.502C7.74645 13.502 7.013 13.745 6.40858 14.195C5.80417 14.6451 5.36103 15.2781 5.145 16H3Z"
                      fill="#262626"
                    />
                  </svg>
                  <p>Фильтр по параметрам</p>
                </button>
              )}
              {showFilters && (
                <div
                  onTouchStart={() => setShowFilters(!showFilters)}
                  className={stylesShop.closeFilters}
                >
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                  >
                    <path
                      d="M0.671875 0.671631L11.9856 11.9853"
                      stroke="#262626"
                    />
                    <path
                      d="M1.01562 12.3284L12.3293 1.01466"
                      stroke="#262626"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`${stylesShop.headyFilters} ${
                  showFilters
                    ? stylesShop.showFilters
                    : stylesShop.hiddenFilters
                }`}
              >
                {filters.map((item, index) => (
                  <Filters
                    setPageNumber={setPageNumber}
                    key={`key_filter${index}`}
                    filter={item}
                  />
                ))}
              </div>
            </div>
          ) : (
            <h3>По какой-то причине фильтры отсутствуют</h3>
          )}
        </div>
        {forPartners ? (
           <div 
                data-category="catalogue"
                className="flex flex-col gap-6"
              >
                <Pagination
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  forPartners={forPartners}
                />
              </div>
        ) : (
            <div className="ml-10 w-full">
              <div 
                data-category="catalogue"
                className={
                  viewMode === "grid" 
                    ? "flex flex-col gap-10 md:grid md:grid-cols-3 xl:gap-4 items-center" 
                    : "flex flex-col gap-6"
                }
              >
                <Pagination
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  forPartners={forPartners}
                />
              </div>
            </div>
          )}
      </section>
    </main>
  );
}
