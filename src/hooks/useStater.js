import { useSelector } from "react-redux";

export const useFilters = (select) => {
  const filters = useSelector((state) => state.filters);
  return filters;
};
export const useCustomers = (select) => {
  const result = useSelector((state) => state.customers);
  return result;
};

export const useMain = () => {
  const result = useSelector((state) => state.main);
  return result;
};

export const useStater = (select) => {
  // Вызываем все useSelector в начале для соблюдения правил хуков
  const pages = useSelector((state) => state.pages);
  const menu = useSelector((state) => state.menu);
  const slides = useSelector((state) => state.slides);
  const partners = useSelector((state) => state.partners);
  const service = useSelector((state) => state.service);
  const products = useSelector((state) => state.products);
  const category = useSelector((state) => state.category);
  const bestsales = useSelector((state) => state.bestsales);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const deliveriesTerms = useSelector((state) => state.deliveriesTerms);
  const forPartners = useSelector((state) => state.forPartners);

  // Возвращаем нужную часть state
  switch (select) {
    case "pages": //Страницы
      return pages;

    case "menu": //Навигация
      return menu;

    case "slides": //Слайдер
      return slides;

    case "partners": //Партнеры
      return partners;

    case "services": //Услуги
      return service;

    case "products": //Товары
      return products;

    case "category":
      return category;

    case "bestsales": //Самые продаваемые
      return bestsales;

    case "cart": //Корзина
      return cart;

    case "user": //Пользователь
      return user;

    case "deliveriesTerms": //Способы доставки и оплаты
      return deliveriesTerms;

    case "forPartners": //Для партнеров
      return forPartners;

    default:
      //console.log('Неопознанный вызов состояния');
      return false;
  }
};
