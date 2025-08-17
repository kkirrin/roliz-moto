"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGetNewsQuery } from "@/redux/api/news.api";
import formatDate from "@/app/utils/formatDate";

function NewsListPage() {
  const { data, isLoading } = useGetNewsQuery();
  const [visibleNews, setVisibleNews] = useState(4);
  const [windowWidth, setWindowWidth] = useState(0);

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

  useEffect(() => {
    // Обновляем количество видимых новостей при изменении ширины окна
    if (windowWidth >= 1280) {
      setVisibleNews(8);
    } else if (windowWidth >= 768) {
      setVisibleNews(6);
    } else {
      setVisibleNews(4);
    }
  }, [windowWidth]);

  if (isLoading) {
    return <div>Загрузка новостей...</div>;
  }

  if (!data || !Array.isArray(data.data)) {
    return <div>Не удалось загрузить новости.</div>;
  }

  const handleShowMore = () => {
    if (windowWidth >= 1280) {
      setVisibleNews((prev) => prev + 8);
    } else if (windowWidth >= 768) {
      setVisibleNews((prev) => prev + 6);
    } else {
      setVisibleNews((prev) => prev + 4);
    }
  };

  const visibleNewsItems = data.data.slice(0, visibleNews);
  const hasMoreNews = visibleNews < data.data.length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm font-light mb-4">
        <Link href="/" className="text-gray-light hover:underline">
          Главная
        </Link>{" "}
        / Новости
      </div>

      {/* Title */}
      <h1 className="text-[28px] font-semibold mb-8">Новости и мероприятия</h1>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleNewsItems.map((newsItem) => (
          <Link href={`/routes/pages/news/${newsItem.id}`} key={newsItem.id}>
            <article className="overflow-hidden flex flex-col h-full rounded-xl">
              {/* Image */}
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
                <span className="text-base font-light text-gray-light mt-4">
                  {formatDate(
                    newsItem.attributes.date || newsItem.attributes.publishedAt
                  )}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Show More Button */}
      {hasMoreNews && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-yellow-default hover:bg-yellow-dark text-black font-medium rounded-md transition-colors duration-300"
          >
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsListPage;
