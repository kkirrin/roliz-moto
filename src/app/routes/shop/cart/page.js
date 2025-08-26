"use client";

import { useState, useEffect, useRef } from "react";
import { useCustomers, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";
import styles from "@/app/css/cart.module.css";
import Image from "next/image";
import { Forms } from "@/app/components/Forms";
import Link from "next/link";

export default function CartPage() {
  //Инициализация количества, веса и суммы
  let tempTotalSum = 0;
  let tempTotalWeight = 0;
  let tempTotalProducts = 0;

  const cart = useStater("cart");
  const customer = useCustomers();

  const { removeAll, removeItems } = useActions();
  const formRef = useRef(null);

  const [buttonText, setButtonText] = useState("Оформить заказ");
  const [selectAll, setSelectAll] = useState(false);
  //Разово получаем все данные по сумме, весу и общему количеству

  const [totalWeight, setTotalWeight] = useState(tempTotalWeight);
  const [totalSum, setTotalSum] = useState(tempTotalSum);
  const [totalProducts, setTotalProducts] = useState(tempTotalProducts);
  const [forDelete, setForDelete] = useState([]);

  const [toOrder, setToOrder] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Убедитесь, что переменная `errorMessageInput` определена
  const errorMessageInput = "Ошибка ввода";

  /**
   * Получаем данные из forwardRef формы
   * returns {formData}
   */
  const getAllData = () => {
    let canSend = true;
    let dataForm = formRef.current.elements;
    dataForm = Array.from(dataForm);

    console.log("dataForm ", dataForm);

    const allData = {};
    setButtonText("Отправка...");
    dataForm.forEach((item, index) => {
      if (item.type === "checkbox") {
        if (item.checked) {
          switch (item.name) {
            case "delivery":
              allData.Delivery = item.value;
              break;
            case "payer":
              allData.PaymentMethod = item.value;
              break;
            default:
            //console.log("Ошибка в данных формы")
          }
        }
      }

      if (
        item.type === "text" ||
        item.type === "number" ||
        item.type === "name" ||
        item.type === "tel"
      ) {
        if (
          item.required &&
          (item.value === "" || item.value === errorMessageInput)
        ) {
          item.value = errorMessageInput;
          formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          canSend = false;
        } else {
          switch (item.name) {
            case "name":
              allData.Name = item.value;
              break;
            case "address":
              allData.Address = item.value;
              break;
            case "comments":
              allData.Comment = item.value;
              break;
            case "phone":
              allData.Phone = item.value;
              break;
            case "email":
              allData.Email = item.value;
              break;
            default:
          }
        }
      }
    });

    // Создаем массив товаров с полной информацией (включая количество)
    allData.Items = cart.map((item) => ({
      id: item.id,
      title: item.title,
      price: customer.type === "Оптовый покупатель" ? (item.priceOpt || item.price) : item.price,
      quantitySales: item.quantityForBuy,
      totalPrice: (customer.type === "Оптовый покупатель" ? (item.priceOpt || item.price) : item.price) * item.quantityForBuy
    }));
    
    // Добавляем общую информацию о заказе
    allData.TotalItems = cart.reduce((sum, item) => sum + item.quantityForBuy, 0);
    allData.TotalPrice = cart.reduce((sum, item) => {
      const price = customer.type === "Оптовый покупатель" ? (item.priceOpt || item.price) : item.price;
      return sum + (price * item.quantityForBuy);
    }, 0);
    
    if (!allData.Delivery) allData.Delivery = "Не указан";
    if (!allData.PaymentMethod) allData.Delivery = "Не указан";
    if (canSend) {
      const sending = fetch(
        `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_SENDORDER}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_JWT_ORDER,
          },
          body: JSON.stringify(allData),
        }
      ).then((res) => {
        if (res.status == 200) {
          removeAll("");
          setButtonText("Заказ создан");
          setTimeout(() => {
            setButtonText("Оформить заказ");
          }, 2500);
        }
      });
    } else {
      setButtonText("Укажите данные");
      setTimeout(() => {
        setButtonText("Оформить заказ");
      }, 1000);
      canSend = true;
    }
  };

  const toDelete = (id = -1) => {
    if (!selectAll) {
      setForDelete([...forDelete, id]);
      return;
    }
    setForDelete(cart.map((item) => item.id));
  };

  const deleteSelected = () => {
    removeItems(forDelete);
    setForDelete([]);
  };

  useEffect(() => { }, [cart, forDelete]);
  useEffect(() => {
    toDelete();
  }, [selectAll]);

  useEffect(() => {
    // Сбрасываем переменные перед вычислением
    let tempTotalSum = 0;
    let tempTotalWeight = 0;
    let tempTotalProducts = 0;

    cart.forEach((item) => {
      const price =
        customer.type === "Оптовый покупатель"
          ? item.priceOpt || item.price
          : item.price;
      const weight = item.attributes
        ? item.attributes.find((attr) => attr.name === "Вес")?.value || 0
        : 0;

      tempTotalSum += price * item.quantityForBuy;
      tempTotalWeight += weight * item.quantityForBuy;
      tempTotalProducts += item.quantityForBuy;
    });

    setTotalWeight(tempTotalWeight);
    setTotalProducts(tempTotalProducts);
    setTotalSum(tempTotalSum);
  }, [cart, customer.type]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте товары в корзину для оформления заказа</p>
          <Link 
            href="/routes/shop" 
            className="bg-yellow-default text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-dark transition-colors"
          >
            Перейти к покупкам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок страницы */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Корзина</h1>
          <p className="text-gray-600">Товаров в корзине: {totalProducts}</p>
        </div>
    

        {/* Список товаров */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Товары в корзине</h2>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => setSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Выбрать все</span>
                </label>
                {forDelete.length > 0 && (
                  <button
                    onClick={deleteSelected}
                    className="text-red-600 hover:text-red-800 text-sm underline"
                  >
                    Удалить выбранные ({forDelete.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <SingleItem
                key={`keyProductInCart_${index}_${item.id}`}
                selectAll={selectAll}
                totalSum={totalSum}
                toDelete={toDelete}
                setTotalSum={setTotalSum}
                totalWeight={totalWeight}
                setTotalWeight={setTotalWeight}
                totalProducts={totalProducts}
                setTotalProducts={setTotalProducts}
                setSelecteAll={setSelectAll}
                product={item}
                index={index}
                quantity={item.quantityForBuy}
              />
            ))}
          </div>
        </div>

        {/* Итоговая сумма */}
        <section className={styles.totalSum}>
          <div className={`${styles.totalSumRow}`}>
            <h5>Всего</h5>
            <h5>{totalSum} ₽</h5>
          </div>
          <p>
            {customer.type === "Оптовый покупатель" ? (
               <>
                *Указана оптовая цена, сумма может отличаться от итоговой. Конечную
                стоимость уточняйте у менеджера.
               </>
            ): (
              <>
                *Указана розничная цена, сумма может отличаться от итоговой. Конечную
                стоимость уточняйте у менеджера.
              </>
            )}
          </p>
        </section>

        {/* Блок оформления заказа */}
        {!toOrder ? (
          <section className={`${styles.sideOrderBlock} `}>
            <button
              className="w-full bg-yellow-default rounded-md py-3 active:bg-yellow-dark cursor-pointer disabled:opacity-60 disabled:cursor-default"
              onClick={() => {
                if (cart.length > 0 && isChecked) {
                  setToOrder(!toOrder);
                }
              }}
              disabled={!isChecked}
            >
              {buttonText}
            </button>
            <div className="mt-4 flex items-start">
              <input
                type="checkbox"
                id="agreement"
                className="mt-1"
                onChange={(e) =>
                  cart.length > 0 && setIsChecked(e.target.checked)
                }
              />
              <label className="pl-2" htmlFor="agreement">
                {isExpanded ? (
                  <p className="max-h-[200px] overflow-y-auto m-0">
                    Настоящим подтверждаю, что я ознакомлен и согласен на
                    обработку персональных данных. Я, своей волей и в своем
                    интересе даю согласие на обработку, в том числе на сбор,
                    систематизацию, накопление, хранение (уточнение, обновление,
                    изменение), использование, передачу третьим лицам,
                    обезличивание, блокирование и уничтожение моих персональных
                    данных — фамилии, имени, отчества, номера контактного
                    телефона, адреса электронной почты, ООО «Эконика», юридический
                    адрес: 692519, г.Уссурийск, ул.Володарского, 9 пом. 13 (далее
                    — «Продавец»), с целью предоставления мне товаров и услуг
                    (продуктов), включая, но не ограничиваясь: идентификацией,
                    осуществление доставки, предоставление сервисных услуг,
                    распространения информационных и рекламных сообщений (по SMS,
                    электронной почте, телефону, иным средствам связи), получения
                    обратной связи. Настоящим, я также даю свое согласие на
                    трансграничную передачу моих персональных данных, в том числе
                    на территории иностранных государств, не включенных в
                    перечень, утвержденный Приказом Роскомнадзора от 15.03.2013 N
                    274 (ред. от 29.10.2014) «Об утверждении перечня иностранных
                    государств, не являющихся сторонами Конвенции Совета Европы о
                    защите физических лиц при автоматизированной обработке
                    персональных данных и обеспечивающих адекватную защиту прав
                    субъектов персональных данных», для выполнения вышеуказанных
                    целей обработки персональных данных. Подтверждаю, что
                    персональные данные и иные сведения, относящиеся ко мне
                    (фамилия, имя, отчество, номер контактного телефона, адрес
                    электронной почты) предоставлены мною Продавцу путем внесения
                    их при регистрации на сайте roliz-moto.ru добровольно и
                    являются достоверными. Я извещен о том, что в случае
                    недостоверности предоставленных персональных и сведений
                    Продавец оставляет за собой право прекратить обслуживание
                    посредством сайта roliz-moto.ru. Я согласен, что мои
                    персональные данные будут обрабатываться способами,
                    соответствующими целям обработки персональных данных, без
                                    возможности принятия решения на основании исключительно
                                    автоматизированной обработки моих персональных данных.
                                    Согласие дается мной на 10 лет с момента регистрации на сайте
                                    roliz-moto.ru и до моего сведения доведено, что по истечении
                                    данного срока мое согласие автоматически продлевается на 10
                                    лет. Настоящее согласие может быть отозвано мной в любой
                                    момент путем направления письменного требования в адрес
                                    Продавца. Адрес электронной почты Продавца:
                                    magazin@roliz-moto.ru
                  </p>
                ) : (
                  <>
                    <p className="m-0">
                      Настоящим подтверждаю, что я ознакомлен и согласен на
                      обработку персональных данных.
                    </p>
                  </>
                )}
                <button onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? (
                    <p className="underline ">Скрыть</p>
                  ) : (
                    <p className="underline ">Подробнее</p>
                  )}
                </button>
              </label>
            </div>
          </section>
        ) : (
          // показываем форму для заказа
          <section className={`${styles.sideOrderBlock}`}>
            <Forms customer={customer} place={"order"} />
          </section>
        )}
      </div>
    </div>
  );
}

const SingleItem = ({
  selectAll,
  totalSum,
  totalProducts,
  totalWeight,
  toDelete,
  setTotalSum,
  setTotalWeight,
  setTotalProducts,
  setSelecteAll,
  product,
  index,
}) => {
  //product.attributes.weight
  const [quantity, setQuantity] = useState(product.quantityForBuy);
  const { removeAll, removeItems, updateQuantity } = useActions();
  const customer = useCustomers();

  const minus = (e) => {
    if (isNaN(product.stock) || quantity <= 1) return;

    const weight =
      product.attributes?.find((item) => item.name === "Вес")?.value || 0;
    const price =
      customer.type === "Оптовый покупатель"
        ? product.priceOpt || product.price
        : product.price;

    const newQuantity = quantity - 1;

    // Уменьшаем количество только если оно больше 1
    setQuantity(newQuantity);
    updateQuantity({ id: product.id, quantitySales: newQuantity });
    setTotalSum(Number.parseFloat(totalSum) - Number.parseFloat(price));
    setTotalWeight(Number.parseFloat(totalWeight) - Number.parseFloat(weight));
    setTotalProducts(totalProducts - 1);
  };

  const plus = (e) => {
    if (isNaN(product.stock)) return;

    const weight =
      product.attributes?.find((item) => item.name === "Вес")?.value || 0;
    const price =
      customer.type === "Оптовый покупатель"
        ? product.priceOpt || product.price
        : product.price;

    // Увеличиваем количество только если оно меньше запаса
    if (quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity({ id: product.id, quantitySales: newQuantity });
      setTotalSum(Number.parseFloat(totalSum) + Number.parseFloat(price));
      setTotalWeight(
        Number.parseFloat(totalWeight) + Number.parseFloat(weight)
      );
      setTotalProducts(totalProducts + 1);
    }
  };

  useEffect(() => { }, [quantity]);
  useEffect(() => { }, [selectAll]);

  // Синхронизируем локальное состояние с Redux store
  useEffect(() => {
    setQuantity(product.quantityForBuy);
  }, [product.quantityForBuy]);

  if (!product) return null;

  return (
    <article
      key={`keyCartProduct_${product.id}`}
      className={`${styles.cartProduct} ${styles.cartProductPage}`}
    >
      <div className={`${styles.cartProductImage}`}>
        {product ? (
          Array.isArray(product?.image[0]) ? (
            <Image
              unoptimized
              src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${product?.image[0]}`}
              alt={product.title}
              fill
            />
          ) : (
            <Image
              unoptimized
              src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_FRONT}${product?.image}`}
              alt={product.title}
              fill
            />
          )
        ) : null}
      </div>
      <div className={`${styles.cartProductColumn}`}>
        <p className={`${styles.cartProductName}`}>{product.title}</p>
        <div className={`${styles.productCardQuntity} ${styles.productCardQuntityPage}`}>
          <button onClick={minus} className={`${styles.productCardButton}`}>
            <Image
              unoptimized
              src={"/minus.svg"}
              alt="Кнопка для уменьшения количества товара"
              fill
            />
          </button>
          {/* ============================================== */}
          <p className="text-sm">{quantity}</p>
          <button onClick={plus} className={`${styles.productCardButton}`}>
            <Image
              unoptimized
              src={"/plus.svg"}
              alt="Кнопка для увеличения количества товара"
              fill
            />
          </button>
        </div>
      </div>
      <div className={`${styles.cartProductColumn}`}>
        <p className={`${styles.cartProductPrice}`}>
          {customer.type == "Оптовый покупатель"
            ? product.priceOpt
              ? product.priceOpt * quantity
              : product.price * quantity
            : product.price * quantity}{" "}
          ₽
        </p>
        <div className={`${styles.selectedRow}`}>
          <p
            onClick={() => removeItems(product.id)}
            className="text-sm text-gray-light hover:text-gray-dark transition-all"
          >
            Удалить
          </p>
        </div>
      </div>
    </article>
  );
};
