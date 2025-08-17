"use client";

import Image from "next/image";
import styles from "@/app/css/mainpage.module.css";
import stylesCart from "@/app/css/cart.module.css";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

import { numberForText } from "@/app/workers/simpleWorker";

import Delivery from "@/app/components/shop/Delivery";

const errorMessageInput = "Введите коррекные данные";

export default function Page({}) {
  //Инициализация количества, веса и суммы
  let tempTotalSum = 0;
  let tempTotalWeight = 0;
  let tempTotalProducts = 0;

  const router = useRouter();
  const cart = useStater("cart");
  const { removeAll, removeItems } = useActions();
  const formRef = useRef();
  const [buttonText, setButtonText] = useState("Оформить");
  const [selectAll, setSelectAll] = useState(false);
  //Разово получаем все данные по сумме, весу и общему количеству

  const [totalWeight, setTotalWeight] = useState(tempTotalWeight);
  const [totalSum, setTotalSum] = useState(tempTotalSum);
  const [totalProducts, setTotalProducts] = useState(tempTotalProducts);
  const [forDelete, setForDelete] = useState([]);

  /**
   * Получаем данные из forwardRef формы
   * returns {formData}
   */
  const getAllData = () => {
    let canSend = true;
    let dataForm = formRef.current.elements;
    dataForm = Array.from(dataForm);

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
            ////console.log("Ошибка в данных формы")
          }
        }
      }
    });

    allData.Items = cart;
    if (!allData.Delivery) allData.Delivery = "Не указан";
    if (!allData.PaymentMethod) allData.Delivery = "Не указан";
    ////console.log(allData)
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
      )
        .then((res) => {
          if (res.ok) {
            removeAll("");
            setButtonText("Заказ создан");
            setTimeout(() => {
              setButtonText("Оформить");
            }, 2500);
          } else {
            console.error("Ошибка при создании заказа:", res.statusText);
            setButtonText("Ошибка при отправке");
          }
        })
        .catch((error) => {
          console.error("Ошибка сети:", error);
          setButtonText("Ошибка сети");
        });
    } else {
      setButtonText("Укажите данные");
      setTimeout(() => {
        setButtonText("Оформить");
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

  useEffect(() => {}, [cart, forDelete]);
  useEffect(() => {
    toDelete();
  }, [selectAll]);
  useEffect(() => {
    cart.forEach((item, index) => {
      tempTotalSum += item.price * item.quantityForBuy;
      tempTotalWeight += item.attributes
        ? item.attributes.find((item) => item.name == "Вес")?.value
        : 0 * item.quantityForBuy;
      tempTotalProducts += item.quantityForBuy;
    });
    setTotalWeight(tempTotalWeight);
    setTotalProducts(tempTotalProducts);
    setTotalSum(tempTotalSum);
  }, [cart.length]);

  return (
    <>
      <main className={styles.main}>
        <div className={`${styles.headerRow}`}>
          <h1>Корзина</h1>
          <p>
            {totalProducts ? totalProducts : 0}{" "}
            {totalProducts ? numberForText(totalProducts) : numberForText(0)}
          </p>
        </div>
        <div className={`${styles.headerRow}`}>
          <div className={`${styles.selectedRow}`}>
            <input
              onClick={() => setSelectAll(!selectAll)}
              type="checkbox"
              name="selectAll"
              id="selectAll"
              value={selectAll}
              onChange={() => setSelectAll(!selectAll)}
            />
            <span>Выбрать все</span>
          </div>
          <div className={`${styles.selectedRow}`}>
            <div className={`${styles.iconBlock}`}>
              <Image unoptimized src="/exit.svg" alt="exit" fill />
            </div>
            <span onClick={deleteSelected} className={styles.deleteSelected}>
              Удалить выбранное
            </span>
          </div>
        </div>

        <section className={stylesCart.mainCartBlock}>
          <div className={stylesCart.mainLeftBlock}>
            {cart.map((item, index) => {
              return (
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
                />
              );
            })}
          </div>
          <article className={stylesCart.mainRightBlock}>
            <div className={`${stylesCart.totalSumBlock}`}>
              <div className={`${stylesCart.rowTotalSumUp}`}>
                <p>
                  Всего{" "}
                  {`${totalProducts ? totalProducts : 0} 
                                 ${
                                   totalProducts
                                     ? numberForText(totalProducts)
                                     : numberForText(0)
                                 } 
                                 * 
                                 ${totalWeight} кг`}
                </p>

                <h5>{totalSum} ₽</h5>
              </div>

              <div className={`${stylesCart.rowTotalSumUp}`}>
                <span>Скидка</span>
                <span>Нет</span>
              </div>

              <div className={`${stylesCart.rowTotalSumUp}`}>
                <h4>Итого</h4>
                <h4>{totalSum} ₽</h4>
              </div>

              <button
                onClick={
                  buttonText == "Оформить" && cart && cart[0]
                    ? getAllData
                    : null
                }
                className={`${stylesCart.buttonOrder}`}
              >
                {buttonText}
              </button>
            </div>
          </article>
        </section>

        <Delivery ref={formRef} />
      </main>
    </>
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
  //console.log(product.attributes)
  const [quantity, setQuantity] = useState(product.quantityForBuy);

  const { removeAll, removeItems } = useActions();

  const minus = (e) => {
    const weight = product.attributes
      ? product.attributes.find((item) => item.name == "Вес")?.value
      : 0;
    if (quantity > 1) setQuantity(quantity - 1);
    setTotalSum(Number.parseFloat(totalSum) - Number.parseFloat(product.price));
    setTotalWeight(Number.parseFloat(totalWeight) - Number.parseFloat(weight));
    setTotalProducts(totalProducts - 1);
  };
  const plus = (e) => {
    const weight = product.attributes
      ? product.attributes.find((item) => item.name == "Вес")?.value
      : 0;
    if (quantity < product.stock) setQuantity(quantity + 1);
    setTotalSum(Number.parseFloat(totalSum) + Number.parseFloat(product.price));
    setTotalWeight(Number.parseFloat(totalWeight) + Number.parseFloat(weight));
    setTotalProducts(totalProducts + 1);
  };

  if (!product) return null;

  useEffect(() => {}, [quantity]);

  useEffect(() => {}, [selectAll]);

  return (
    <article
      key={`keyCartProduct_${product.id}`}
      className={`${stylesCart.cartProduct}`}
    >
      <div className={`${stylesCart.selectProductBlock}`}>
        <input
          onClick={(evt) => {
            toDelete(Number.parseInt(evt.target.value));
            setSelecteAll(false);
          }}
          type="checkbox"
          name={`selectPRoduct_${index}`}
          value={product.id}
          checked={selectAll ? selectAll : null}
          id={`selectPRoduct_${index}`}
        />
      </div>
      <div className={`${stylesCart.cartProductImage}`}>
        <Image
          unoptimized
          src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${
            process.env.NEXT_PUBLIC_URL_API
          }${!Array.isArray(product.image) ? product.image : product.image[0]}`}
          alt={product.title}
          fill
        />
      </div>
      <div className={`${stylesCart.cartProductColumn}`}>
        <h3 className={`${stylesCart.cartProductName}`}>{product.title}</h3>
        <p>
          Вес:{" "}
          {`${
            product?.attributes
              ? product.attributes.find((item) => item.name == "Вес")?.value
              : 0
          }`}{" "}
          кг
        </p>

        <div className={`${stylesCart.selectedRow}`}>
          <div className={`${stylesCart.iconBlock}`}>
            <Image unoptimized src="/exit.svg" alt="exit" fill />
          </div>
          <span onClick={() => removeItems(product.id)}>Удалить</span>
        </div>
      </div>
      <div className={`${stylesCart.cartProductColumn}`}>
        <h3 className={`${stylesCart.cartProductPrice}`}>
          {product.price * quantity} ₽
        </h3>

        <div className={`${stylesCart.productCardQuntity}`}>
          <button onClick={minus} className={`${stylesCart.productCardButton}`}>
            <Image
              unoptimized
              src={"/minus.svg"}
              alt="Кнопка для уменьшения количества товара"
              fill
            />
          </button>
          <p>{quantity}</p>
          <button onClick={plus} className={`${stylesCart.productCardButton}`}>
            <Image
              unoptimized
              src={"/plus.svg"}
              alt="Кнопка для увеличения количества товара"
              fill
            />
          </button>
        </div>
      </div>
    </article>
  );
};
