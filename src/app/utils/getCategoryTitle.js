import { useGetCategoriesQuery } from "@/redux/api/categories.api";

const getCategoryPath = (categories, categoryId) => {
  if (!categories || !categoryId) return null;

  const category = categories.find(
    (cat) => cat.id.toString() === categoryId.toString()
  );
  if (!category) return null;

  const path = {
    url: `/routes/${categoryId}`,
    breadcrumbs: ["Главная", "Каталог"],
  };

  // Если у категории есть родитель
  if (category.attributes.parent?.data) {
    const parent = categories.find(
      (cat) => cat.id === category.attributes.parent.data.id
    );
    if (parent) {
      path.breadcrumbs.push(parent.attributes.name);
    }
  }

  // Добавляем название текущей категории
  path.breadcrumbs.push(category.attributes.name);

  return path;
};

export { getCategoryPath };
