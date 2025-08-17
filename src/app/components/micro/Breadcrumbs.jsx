"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";
import { getCategoryPath } from "@/app/utils/getCategoryTitle";

export default function Breadcrumbs() {
  const { slug } = useParams();
  const { data, isLoading } = useGetCategoriesQuery();

  const categoryId = slug?.[0];

  // Если данные загружаются или нет ID категории, показываем только "Главная"
  if (isLoading || !categoryId || !data?.data) {
    return (
      <nav className="py-4">
        <ul className="flex text-sm font-light items-center space-x-2 list-[none]">
          <li>
            <Link href="/" className="text-gray-light hover:text-gray-dark">
              Главная
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  // Получаем путь для текущей категории
  const categoryPath = getCategoryPath(data.data, categoryId);
  // console.log("categoryPath:", categoryPath);

  if (!categoryPath) return null;

  // Находим текущую категорию для получения ID родителя
  const currentCategory = data.data.find(
    (cat) => cat.id.toString() === categoryId
  );
  const parentId = currentCategory?.attributes?.parent?.data?.id;

  // Функция для получения URL в зависимости от позиции в хлебных крошках
  const getLinkUrl = (index) => {
    switch (index) {
      case 0: // Главная
        return "/";
      case 1: // Каталог
        return "/routes/shop";
      case 2: // Родительская категория
        return parentId ? `/routes/shop/${parentId}` : categoryPath.url;
      default:
        return categoryPath.url;
    }
  };

  return (
    <nav className="py-4">
      <ul className="flex text-sm font-light items-center space-x-2 list-[none]">
        {categoryPath.breadcrumbs.map((title, index) => (
          <React.Fragment key={index}>
            {index > 0 && <li className="text-black">/</li>}
            <li>
              <Link
                href={getLinkUrl(index)}
                className={`${
                  index === categoryPath.breadcrumbs.length - 1
                    ? "text-black cursor-default"
                    : "text-gray-light hover:text-gray-dark"
                }`}
              >
                {title}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}
