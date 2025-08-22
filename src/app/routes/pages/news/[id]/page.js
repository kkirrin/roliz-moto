"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetNewsIdQuery } from "@/redux/api/news.api";
import formatDate from "@/app/utils/formatDate";
import styles from "@/app/css/news.module.css";


function SingleNewsPage({ params }) {
  const resolvedParams = React.use(params);
  const { data, isLoading } = useGetNewsIdQuery(resolvedParams.id);

  if (isLoading) {
    return <div>Загрузка новостей...</div>;
  }

  if (!data?.data?.attributes) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Новость не найдена
          </h1>
          <Link
            href="/routes/pages/news"
            className="text-blue-600 hover:underline"
          >
            Вернуться к списку новостей
          </Link>
        </div>
      </div>
    );
  }

  const newsData = data.data.attributes;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-light font-light mb-4">
        <Link href="/" className="hover:underline">
          Главная
        </Link>{" "}
        /
        <Link href="/routes/pages/news" className="hover:underline ml-1">
          Новости
        </Link>{" "}
        /<span className="ml-1 text-black">{newsData.title}</span>
      </div>
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        {newsData.title}
      </h1>
      {/* Main Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
        {newsData.image?.data?.attributes?.url ? (
          <Image
            src={`/api/proxy-image?url=${encodeURIComponent(`http://${process.env.NEXT_PUBLIC_URL_API}${newsData.image.data.attributes.url}`)}`}
            alt={newsData.title}
            fill
            className={`object-cover w-full h-full`}
          />
        ) : (
          <div className="w-full h-full bg-gray-light flex items-center justify-center">
            <span className="text-gray-500">Изображение отсутствует</span>
          </div>
        )}
      </div>
      {/* Text Content */}
      <div className="prose max-w-none mb-8">
        <p>{newsData.text}</p>
      </div>
      {/* Date */}
      <div className="text-sm text-gray-light">{formatDate(newsData.publishedAt)}</div>
    </div>
  );
}

export default SingleNewsPage;
