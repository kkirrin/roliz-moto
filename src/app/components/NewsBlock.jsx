import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useGetNewsQuery } from "@/redux/api/news.api";
import formatDate from "../utils/formatDate";
import styles from "@/app/css/news.module.css";

function NewsBlock() {
  const { data, isLoading } = useGetNewsQuery();
  const [windowWidth, setWindowWidth] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Сколько показывать новостей на странице
  const getItemsPerPage = (width) => {
    if (width >= 1280) return 4;
    if (width >= 768) return 3;
    return 1;
  };

  // По сколько новостей скроллить при нажатии на стрелку
  const getItemsToScroll = (width) => {
    if (width >= 1280) return 4;
    if (width >= 768) return 3;
    return 1;
  };

  const itemsPerPage = getItemsPerPage(windowWidth);
  const itemsToScroll = getItemsToScroll(windowWidth);

  useEffect(() => {
    // Убедимся, что startIndex не превышает максимально возможный для текущего размера
    const maxStartIndex = Math.max(0, (data?.data.length || 0) - itemsPerPage);
    setStartIndex(Math.min(startIndex, maxStartIndex));
  }, [itemsPerPage, data]);

  if (isLoading) {
    return <div>Загрузка новостей...</div>;
  }

  if (!data || !Array.isArray(data.data)) {
    return <div>Не удалось загрузить новости.</div>;
  }

  const newsItems = data.data;
  const totalNews = newsItems.length;
  const visibleNewsItems = newsItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsToScroll));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(totalNews - itemsPerPage, prevIndex + itemsToScroll)
    );
  };

  const showPrevButton = startIndex > 0;
  const showNextButton = startIndex + itemsPerPage < totalNews;

  return (
    <section className="mt-14 xl:mt-[100px]">
      {/* Title and Navigation */}
      <div className="flex justify-between items-center mb-5 md:mb-6 xl:mb-10">
        <h1 className="text-[28px] font-semibold">Новости и мероприятия</h1>
        {/* Стрелки */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/routes/pages/news"
            className="flex items-center gap-2 ml-4"
          >
            <p className="text-lg text-gray-light">Посмотреть все</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
            >
              <path
                d="M1 1.5L6 6.5L1 11.5"
                stroke="#ACACAC"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* News Grid */}
      {/* Используем flexbox и overflow-hidden/scroll для свайпа на мобильных */}
      {/* На md и выше grid будет работать как обычная сетка */}
      <div className="flex md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-4 scrollbar-hide">

        {visibleNewsItems.map((newsItem) => (
          <Link
            href={`/routes/pages/news/${newsItem.id}`}
            key={newsItem.id}
            className="min-w-[280px] sm:min-w-0"
          >
            <article className={`${styles.newsItem} overflow-hidden flex flex-col h-full rounded-xl`}>
              <div className="relative w-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_FRONT}${newsItem.attributes.image.data.attributes.url}`}
                  alt={newsItem.attributes.title}
                  className="object-cover transition-transform duration-300 hover:scale-105 w-full h-auto rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="pt-5 flex flex-col flex-grow justify-between">
                {/* Title */}
                <div className="flex gap-14">
                  <h2 className="text-base font-bold text-gray-900 mb-2 leading-tight">
                    {newsItem.attributes.title}
                  </h2>
                  <div className="flex justify-center w-9 h-9 bg-yellow-default hover:bg-yellow-dark transition-all rounded-md flex-shrink-0">
                    <img
                      src="/icon/Arrow.svg"
                      alt="иконка стрелка"
                      className="w-5"
                    />
                  </div>
                </div>

                {/* Date */}
                <span className="text-base font-light text-gray-light mt-4 mb-4">
                  {formatDate(
                    newsItem.attributes.date || newsItem.attributes.publishedAt
                  )}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Стрелки для всех экранов */}
      <div className="flex justify-center mt-8 space-x-4">
        {/* Кнопка Назад */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={!showPrevButton}
          >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L9 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        {/* Кнопка Вперед */}
        {/* Убираем условный рендеринг */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={!showNextButton} // Кнопка будет задизейблена, когда showNextButton ложно
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
      </div>
    </section>
  );
}

export default NewsBlock;
