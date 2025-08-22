"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCustomers, useMain, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";
import styles from "@/app/css/cart.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Forms } from "@/app/components/Forms";
import { useSelector, useDispatch } from "react-redux";
import { setSideCart } from "@/redux/reducers/sideReducer";
import QuantityCard from "../micro/QuantityCard";

export const Cart = ({ inBurger = false }) => {
  const data = useStater("cart");
  // const { mobile } = useMain("main");
  const [scroll, setScroll] = useState(0);
  const [showFixCart, setShowFixCart] = useState(false);
  const [mobile, setMobile] = useState(false);

  const dispatch = useDispatch();
  const sideCart = useSelector((state) => state.side.sideCart);
  const toggleSideCart = () => {
    dispatch(setSideCart(!sideCart));
  };

  useEffect(() => {
    if (window) {
      const handleScroll = () => {
        setScroll(window.scrollY);
        setShowFixCart(scroll > 400);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [scroll]);

  useEffect(() => {
    if (sideCart) {
      document.documentElement.classList.add("lock");
    } else {
      document.documentElement.classList.remove("lock");
    }
  }, [sideCart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobile(window.innerWidth <= 768);

      const handleResize = () => {
        setMobile(window.innerWidth <= 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const renderCartIcon = (mobile, inBurger) => {
    if (mobile) {
      if (!inBurger) {
        return (
          <svg
            xmlns="https://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
          >
            <g clipPath="url(#clip0_868_5930)">
              <path
                d="M10.6355 20.8183C10.6355 21.6797 9.93471 22.3805 9.07329 22.3805C8.21188 22.3805 7.51107 21.6797 7.51107 20.8183C7.51107 19.9569 8.21188 19.2561 9.07329 19.2561C9.93471 19.2561 10.6355 19.9567 10.6355 20.8183ZM18.7634 19.256C17.902 19.256 17.2012 19.9568 17.2012 20.8183C17.2012 21.6797 17.902 22.3805 18.7634 22.3805C19.6248 22.3805 20.3256 21.6797 20.3256 20.8183C20.3256 19.9568 19.6248 19.256 18.7634 19.256ZM22.3705 5.75926C22.2645 5.63175 22.1072 5.55803 21.9414 5.55781L5.28044 5.53991L4.17404 1.04525C4.11239 0.795342 3.88826 0.619629 3.63098 0.619629H1.05931C0.75034 0.619629 0.5 0.869969 0.5 1.17894C0.5 1.48791 0.75034 1.73825 1.05931 1.73825H3.19249L6.37714 14.6759L6.8551 16.9288C7.04871 17.8421 7.86699 18.505 8.80066 18.505H19.5748C19.8838 18.505 20.1341 18.2547 20.1341 17.9457C20.1341 17.6367 19.8838 17.3864 19.5748 17.3864H8.80066C8.39215 17.3864 8.03408 17.0963 7.94953 16.6967L7.61306 15.1105H20.3977C20.6678 15.1105 20.8992 14.9174 20.9479 14.6518L22.4909 6.21763C22.5207 6.05457 22.4767 5.88655 22.3705 5.75926Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_868_5930">
                <rect
                  width="22"
                  height="22"
                  fill="white"
                  transform="translate(0.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        );
      } else {
        return (
          <div className={`${styles.burgerCart}`}>
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
            >
              <g clipPath="url(#clip0_868_5930)">
                <path
                  d="M10.6355 20.8183C10.6355 21.6797 9.93471 22.3805 9.07329 22.3805C8.21188 22.3805 7.51107 21.6797 7.51107 20.8183C7.51107 19.9569 8.21188 19.2561 9.07329 19.2561C9.93471 19.2561 10.6355 19.9567 10.6355 20.8183ZM18.7634 19.256C17.902 19.256 17.2012 19.9568 17.2012 20.8183C17.2012 21.6797 17.902 22.3805 18.7634 22.3805C19.6248 22.3805 20.3256 21.6797 20.3256 20.8183C20.3256 19.9568 19.6248 19.256 18.7634 19.256ZM22.3705 5.75926C22.2645 5.63175 22.1072 5.55803 21.9414 5.55781L5.28044 5.53991L4.17404 1.04525C4.11239 0.795342 3.88826 0.619629 3.63098 0.619629H1.05931C0.75034 0.619629 0.5 0.869969 0.5 1.17894C0.5 1.48791 0.75034 1.73825 1.05931 1.73825H3.19249L6.37714 14.6759L6.8551 16.9288C7.04871 17.8421 7.86699 18.505 8.80066 18.505H19.5748C19.8838 18.505 20.1341 18.2547 20.1341 17.9457C20.1341 17.6367 19.8838 17.3864 19.5748 17.3864H8.80066C8.39215 17.3864 8.03408 17.0963 7.94953 16.6967L7.61306 15.1105H20.3977C20.6678 15.1105 20.8992 14.9174 20.9479 14.6518L22.4909 6.21763C22.5207 6.05457 22.4767 5.88655 22.3705 5.75926Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_868_5930">
                  <rect
                    width="22"
                    height="22"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <PriceCard />
            <QuantityCard quantityItems={data.length} />
          </div>
        );
      }
    } else {
      return (
        <>
          <svg
            xmlns="https://www.w3.org/2000/svg"
            width="22"
            height="23"
            viewBox="0 0 22 23"
            fill="none"
          >
            <g clipPath="url(#clip0_931_4384)">
              <path
                d="M10.1355 20.8183C10.1355 21.6797 9.43471 22.3805 8.57329 22.3805C7.71188 22.3805 7.01107 21.6797 7.01107 20.8183C7.01107 19.9569 7.71188 19.2561 8.57329 19.2561C9.43471 19.2561 10.1355 19.9567 10.1355 20.8183ZM18.2634 19.256C17.402 19.256 16.7012 19.9568 16.7012 20.8183C16.7012 21.6797 17.402 22.3805 18.2634 22.3805C19.1248 22.3805 19.8256 21.6797 19.8256 20.8183C19.8256 19.9568 19.1248 19.256 18.2634 19.256ZM21.8705 5.75926C21.7645 5.63175 21.6072 5.55803 21.4414 5.55781L4.78044 5.53991L3.67404 1.04525C3.61239 0.795342 3.38826 0.619629 3.13098 0.619629H0.559311C0.25034 0.619629 0 0.869969 0 1.17894C0 1.48791 0.25034 1.73825 0.559311 1.73825H2.69249L5.87714 14.6759L6.3551 16.9288C6.54871 17.8421 7.36699 18.505 8.30066 18.505H19.0748C19.3838 18.505 19.6341 18.2547 19.6341 17.9457C19.6341 17.6367 19.3838 17.3864 19.0748 17.3864H8.30066C7.89215 17.3864 7.53408 17.0963 7.44953 16.6967L7.11306 15.1105H19.8977C20.1678 15.1105 20.3992 14.9174 20.4479 14.6518L21.9909 6.21763C22.0207 6.05457 21.9767 5.88655 21.8705 5.75926Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_931_4384">
                <rect
                  width="22"
                  height="22"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <PriceCard />
          <QuantityCard quantityItems={data.length} />
        </>
      );
    }
  };

  // закрывает по клику на esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        toggleSideCart();
      }
    };
    if (sideCart) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
  }, [sideCart, toggleSideCart]);

  return (
    <>
      <div
        onClick={() => !mobile && toggleSideCart()}
        onTouchStart={() => toggleSideCart()}
        className={`${styles.headerCart} ${styles.cartIcon}`}
      >
        {renderCartIcon(mobile, inBurger)}
      </div>
      {/* Плавающая кнопка корзины*/}
      {/* {showFixCart && (
        <div
          onClick={() => !mobile && toggleSideCart()}
          onTouchStart={() => mobile && toggleSideCart()}
          className={`${styles.fixedCart} ${styles.cartIcon} ${
            sideCart ? styles.hideFixedCart : styles.showFixedCart
          }`}
        >
          {mobile ? (
            !inBurger ? (
              <svg
                xmlns="https://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <g clipPath="url(#clip0_868_5930)">
                  <path
                    d="M10.6355 20.8183C10.6355 21.6797 9.93471 22.3805 9.07329 22.3805C8.21188 22.3805 7.51107 21.6797 7.51107 20.8183C7.51107 19.9569 8.21188 19.2561 9.07329 19.2561C9.93471 19.2561 10.6355 19.9567 10.6355 20.8183ZM18.7634 19.256C17.902 19.256 17.2012 19.9568 17.2012 20.8183C17.2012 21.6797 17.902 22.3805 18.7634 22.3805C19.6248 22.3805 20.3256 21.6797 20.3256 20.8183C20.3256 19.9568 19.6248 19.256 18.7634 19.256ZM22.3705 5.75926C22.2645 5.63175 22.1072 5.55803 21.9414 5.55781L5.28044 5.53991L4.17404 1.04525C4.11239 0.795342 3.88826 0.619629 3.63098 0.619629H1.05931C0.75034 0.619629 0.5 0.869969 0.5 1.17894C0.5 1.48791 0.75034 1.73825 1.05931 1.73825H3.19249L6.37714 14.6759L6.8551 16.9288C7.04871 17.8421 7.86699 18.505 8.80066 18.505H19.5748C19.8838 18.505 20.1341 18.2547 20.1341 17.9457C20.1341 17.6367 19.8838 17.3864 19.5748 17.3864H8.80066C8.39215 17.3864 8.03408 17.0963 7.94953 16.6967L7.61306 15.1105H20.3977C20.6678 15.1105 20.8992 14.9174 20.9479 14.6518L22.4909 6.21763C22.5207 6.05457 22.4767 5.88655 22.3705 5.75926Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_868_5930">
                    <rect
                      width="22"
                      height="22"
                      fill="white"
                      transform="translate(0.5 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <>
                <QuantityCard quantityItems={data.length} />

                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                    stroke="black"
                    strokeOpacity="0.9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                    stroke="black"
                    strokeOpacity="0.9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                    stroke="black"
                    strokeOpacity="0.9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )
          ) : (
            <>
              <QuantityCard quantityItems={data.length} />

              <svg
                xmlns="https://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                  stroke="black"
                  strokeOpacity="0.9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                  stroke="black"
                  strokeOpacity="0.9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                  stroke="black"
                  strokeOpacity="0.9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </div>
      )} */}
      <section
        className={`${styles.sideCartContainer} ${sideCart ? styles.showSideCart : styles.hideSideCart
          }`}
      >
        <SideContent inBurger={inBurger} />
      </section>
      <div
        onClick={() => !mobile && toggleSideCart()}
        className={`${styles.darkSideBackground} ${sideCart ? styles.actBack : styles.disBack
          }`}
      ></div>
    </>
  );
};

export const SideContent = ({ inBurger = false }) => {
  //Инициализация количества, веса и суммы
  let tempTotalSum = 0;
  let tempTotalWeight = 0;
  let tempTotalProducts = 0;

  const router = useRouter();
  const cart = useStater("cart");
  const mobile = useStater("main");
  const customer = useCustomers();

  const { removeAll, removeItems } = useActions();
  const formRef = useRef(null);

  const [buttonText, setButtonText] = useState("Оформить");
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

    allData.Items = cart;
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
            setButtonText("Оформить");
          }, 2500);
        }
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

  useEffect(() => { }, [cart, forDelete]);
  useEffect(() => {
    toDelete();
  }, [selectAll]);

  useEffect(() => {
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
  }, [cart.length]);

  const dispatch = useDispatch();
  const sideCart = useSelector((state) => state.side.sideCart);
  const toggleSideCart = () => {
    dispatch(setSideCart(!sideCart));
  };

  return (
    <section className="p-10 h-full flex flex-col justify-between">
      <div className={`${styles.upSideCart}`}>
        <div>
          <p>Корзина</p>
          <p>({totalProducts ? totalProducts : 0})</p>
        </div>

        <div
          onClick={() => {
            if (!mobile) {
              toggleSideCart();
            }
          }}
          onTouchStart={() => {
            if (mobile) {
              toggleSideCart();
            }
          }}
          className={`${styles.exitSideCart}`}
        >
          <p>Закрыть</p>
          <svg
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            fill="none"
          >
            <g opacity="0.6">
              <rect
                x="12.2139"
                y="1.60742"
                width="1.66667"
                height="15"
                transform="rotate(45 12.2139 1.60742)"
                fill="#212121"
              />
              <rect
                x="13.3927"
                y="12.2139"
                width="1.66667"
                height="15"
                transform="rotate(135 13.3927 12.2139)"
                fill="#212121"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="h-1/2 overflow-y-auto scroll-smooth overflow-hidden scrollbar-thin">
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

      {!toOrder ? (
        <section className={`${styles.sideOrderBlock} `}>
          <button
            className="w-full bg-yellow-default rounded-md py-3 active:bg-yellow-dark cursor-pointer disabled:opacity-60 disabled:cursor-default"
            onClick={() => {
              if (!mobile && cart.length > 0 && isChecked) {
                setToOrder(!toOrder);
              }
            }}
            onTouchStart={() => {
              if (mobile && cart.length > 0 && isChecked) {
                setToOrder(!toOrder);
              }
            }}
            disabled={!isChecked}
          >
            Оформить
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
    </section>
  );
};

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
  const { removeAll, removeItems } = useActions();
  const customer = useCustomers();

  const minus = (e) => {
    if (isNaN(product.stock) || quantity <= 1) return;

    const weight =
      product.attributes?.find((item) => item.name === "Вес")?.value || 0;
    const price =
      customer.type === "Оптовый покупатель"
        ? product.priceOpt || product.price
        : product.price;

    // Уменьшаем количество только если оно больше 1
    setQuantity(quantity - 1);
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
      setQuantity(quantity + 1);
      setTotalSum(Number.parseFloat(totalSum) + Number.parseFloat(price));
      setTotalWeight(
        Number.parseFloat(totalWeight) + Number.parseFloat(weight)
      );
      setTotalProducts(totalProducts + 1);
    }
  };

  if (!product) return null;

  useEffect(() => { }, [quantity]);

  useEffect(() => { }, [selectAll]);

  return (
    <article
      key={`keyCartProduct_${product.id}`}
      className={`${styles.cartProduct}`}
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
        <div className={`${styles.productCardQuntity}`}>
          <button onClick={minus} className={`${styles.productCardButton}`}>
            <Image
              unoptimized
              src={"/minus.svg"}
              alt="Кнопка для уменьшения количества товара"
              fill
            />
          </button>
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

const PriceCard = ({ }) => {
  //Инициализация количества, веса и суммы
  let tempTotalSum = 0;
  let tempTotalWeight = 0;
  let tempTotalProducts = 0;

  const [totalWeight, setTotalWeight] = useState(tempTotalWeight);
  const [totalSum, setTotalSum] = useState(tempTotalSum);
  const [totalProducts, setTotalProducts] = useState(tempTotalProducts);
  const [forDelete, setForDelete] = useState([]);

  const cart = useStater("cart");
  const customer = useCustomers();

  useEffect(() => { }, [cart]);
  useEffect(() => { }, [totalSum, totalProducts]);

  useEffect(() => {
    cart.forEach((item, index) => {
      tempTotalSum +=
        customer.type == "Оптовый покупатель"
          ? item.priceOpt
            ? item.priceOpt * item.quantityForBuy
            : item.price * item.quantityForBuy
          : item.price * item.quantityForBuy;
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
      <p key={`counterKeys_${tempTotalSum}`} className={`${styles.countItems}`}>
        {totalSum}₽
      </p>
    </>
  );
};

/* КОРЗИНА НА СТРАНИЦУ
        <Link className = {`${styles.linkCard}`} href = "/routes/shop/cart" >
            <div key = {`headerCartKey`} className = {`${styles.headerCart} ${styles.cartIcon}`}>

                    <svg xmlns="https://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                        <g clipPath="url(#clip0_545_4937)">
                            <path d="M10.1355 20.8183C10.1355 21.6797 9.43471 22.3805 8.57329 22.3805C7.71188 22.3805 7.01107 21.6797 7.01107 20.8183C7.01107 19.9569 7.71188 19.2561 8.57329 19.2561C9.43471 19.2561 10.1355 19.9567 10.1355 20.8183ZM18.2634 19.256C17.402 19.256 16.7012 19.9568 16.7012 20.8183C16.7012 21.6797 17.402 22.3805 18.2634 22.3805C19.1248 22.3805 19.8256 21.6797 19.8256 20.8183C19.8256 19.9568 19.1248 19.256 18.2634 19.256ZM21.8705 5.75926C21.7645 5.63175 21.6072 5.55803 21.4414 5.55781L4.78044 5.53991L3.67404 1.04525C3.61239 0.795342 3.38826 0.619629 3.13098 0.619629H0.559311C0.25034 0.619629 0 0.869969 0 1.17894C0 1.48791 0.25034 1.73825 0.559311 1.73825H2.69249L5.87714 14.6759L6.3551 16.9288C6.54871 17.8421 7.36699 18.505 8.30066 18.505H19.0748C19.3838 18.505 19.6341 18.2547 19.6341 17.9457C19.6341 17.6367 19.3838 17.3864 19.0748 17.3864H8.30066C7.89215 17.3864 7.53408 17.0963 7.44953 16.6967L7.11306 15.1105H19.8977C20.1678 15.1105 20.3992 14.9174 20.4479 14.6518L21.9909 6.21763C22.0207 6.05457 21.9767 5.88655 21.8705 5.75926Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_545_4937">
                                <rect width="22" height="22" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                        </defs>
                    </svg>

                    <PriceCard priceItems={data}/>
                    <QuntityCard quantityItems={data.length}/>

            </div>
        </Link>
 */
