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
  const state = useSelector((state) => state);

  switch (select) {
    case "pages": //Страницы
      const pages = state.pages;
      return pages;

    case "menu": //Навигация
      const menu = state.menu;
      return menu;

    case "slides": //Слайдер
      const slides = state.slides;
      return slides;

    case "partners": //Партнеры
      const partners = state.partners;
      return partners;

    case "services": //Услуги
      const service = state.service;
      return service;

    case "products": //Товары
      const products = state.products;
      return products;

    case "category":
      const category = state.category;
      return category;

    case "bestsales": //Самые продаваемые
      const bestsales = state.bestsales;
      return bestsales;

    case "cart": //Корзина
      const cart = state.cart;
      return cart;

    case "user": //Пользователь
      const user = state.user;
      return user;

    case "deliveriesTerms": //Способы доставки и оплаты
      const { deliveriesTerms } = state;
      return deliveriesTerms;

    default:
      //console.log('Неопознанный вызов состояния');
      return false;
  }
};
