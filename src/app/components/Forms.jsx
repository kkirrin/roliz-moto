"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSideCart } from "@/redux/reducers/sideReducer";

import { v4 as uuidv4 } from "uuid";

import { useActions } from "@/hooks/useActions";
import styles from "@/app/css/forms.module.css";
import { useCustomers, useStater } from "@/hooks/useStater";

const handlePhoneInput = (e) => {
  // Удаляем все нецифровые символы
  let value = e.target.value.replace(/\D/g, '');

  // Если ввод начинается не с 7, добавляем +7
  if (!value.startsWith('7') && value.length > 0) {
    value = '7' + value;
  }

  // Ограничиваем длину (1 для 7 + 10 цифр)
  if (value.length > 11) {
    value = value.substring(0, 11);
  }

  // Форматируем значение
  if (value.length > 1) {
    e.target.value = `+7${value.substring(1)}`;
  } else if (value.length === 1) {
    e.target.value = '+7';
  } else {
    e.target.value = '';
  }
};


export const Forms = ({ customer = {}, place = "main", idItems = 0 }) => {
  const formRef = useRef();
  const [place2, setPlace] = useState(place);

  const [infoMessage, setInfoMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(formRef.current);

    const validateResult = validateForms(dataForm, formRef);
    //console.log(validateResult)

    if (!validateResult) return;

    const formJSON = {};

    dataForm.forEach(function (value, key) {
      formJSON[key] = value;
    });

    //console.log(formJSON)

    //Отправка данных
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_CALLBACK}/`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_JWT_ORDER,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formJSON,
        }),
      }
    );

    if (await request) {
      const result = await request.json();
      if (result.id) {
        setInfoMessage("Ошибка :(");
      } else {
        setInfoMessage("Заявка отправлена!");
        setTimeout(() => {
          setInfoMessage("");
        }, 1000000);
      }
    }
  };
  useEffect(() => {
    ////console.log(infoMessage)
  }, [infoMessage]);

  switch (place2) {
    case "callback":
      return (
        <form
          className={`${styles.formOrder} ${styles.romanTheBestEpta}`}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          ref={formRef}
        >
          {!infoMessage ? (
            <>
              <h3>Мы Вам перезвоним!</h3>
              <input type="name" name="name" placeholder="Имя" />
              <input type="tel" name="tel" placeholder="Телефон" />
              <input type="text" name="text" placeholder="Комментарий" />
              <button onClick={(e) => handleSubmit(e)} type="submit">
                {infoMessage ? infoMessage : "Отправить"}
              </button>
            </>
          ) : (
            <h3> Скоро Вам позвонит менеджер!</h3>
          )}
        </form>
      );
      break;
    case "slider":
      return (
        <form
          onSubmit={handleSubmit}
          className={`${styles.sliderForm}`}
          ref={formRef}
        >
          <h3>оставьте заявку</h3>
          <input type="name" name="name" placeholder="Имя" />
          <input type="tel" name="tel" placeholder="Телефон" />
          <input type="text" name="text" placeholder="Комментарий" />
          <button onClick={handleSubmit} type="submit">
            Отправить
          </button>
        </form>
      );
      break;
    case "reviews":
      return (
        <ReviewsForm place={place2} setPlace={setPlace} idItems={idItems} />
      );
      break;
    case "main":
      return (
        <div className={`${styles.mainContainerForm}`}>
          <form
            id="mainForm"
            onSubmit={handleSubmit}
            className={`${styles.mainForm}`}
            ref={formRef}
          >
            <h3>заполните заявку</h3>
            <p>
              Свяжемся с вами и бесплатно проконсультируем по любым вопросам
            </p>
            <div>
              <input type="name" name="name" placeholder="Имя" />
              <input type="tel" name="tel" placeholder="Телефон" />
            </div>
            <button type="submit">Отправить</button>
          </form>
        </div>
      );
      break;
    case "order":
      return <OrderForm place={place2} setPlace={setPlace} idItems={idItems} />;
      break;
    case "product":
      return <AskForm place={place2} setPlace={setPlace} idItems={idItems} />;
      break;
    ///Формы регистрации
    case "modals_reg":
      return <RegForm place={place2} setPlace={setPlace} />;
      break;
    ///Формы регистрации
    case "modals_auth":
      return <AuthForm place={place2} setPlace={setPlace} />;
      break;
    case "recovery_pass":
      return <RecForm place={place2} setPlace={setPlace} />;
      break;
    case "consult":
      return <ConsultForm place={place2} setPlace={setPlace} />;
      break;
    default:
      <form ref={formRef}></form>;
  }
};

const ReviewsForm = ({ place = "", setPlace = (f) => f, idItems = 0 }) => {
  if (!idItems) return false;
  const formRef = useRef();

  const { auth, removeAll, toggleModal } = useActions();

  const customer = useCustomers();

  const [infoMessage, setInfoMessage] = useState(""),
    [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    if (!idItems) return;
    e.preventDefault();

    if (!formRef.current[0].value || !formRef.current[0].value) {
      return false;
    }

    const tempItems = [];
    const dataForm = new FormData(formRef.current);

    const validateResult = validateForms(dataForm, formRef);

    if (!validateResult) return;
    //console.log(validateResult)

    const formJSON = {};

    dataForm.forEach(function (value, key) {
      formJSON[key] = value;
    });

    if (customer.authStatus) {
      formJSON.product = {
        connect: [idItems],
      };
      formJSON.customer = {
        connect: [customer.id],
      };
      formJSON.Name = customer.name;
    } else {
      return;
    }
    //console.log(formJSON)
    //Отправка данных
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_REVIEWS}/`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_JWT_REVIEWS,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formJSON,
        }),
      }
    );

    if (await request) {
      const result = await request.json();
      if (result.id) {
        setInfoMessage("Ошибка :(");
      } else {
        setInfoMessage("Отзыв отправлен!");
        removeAll();
        setTimeout(() => {
          setInfoMessage("");
        }, 1000);
      }
    }
  };

  useEffect(() => {
    ////console.log(infoMessage)
  }, [infoMessage]);
  return (
    <>
      {infoMessage ? (
        <h2>Спасибо за отзыв!</h2>
      ) : (
        <>
          <h2>Хотите оставить отзыв о товаре?</h2>
          <form
            className={`${styles.formOrder}`}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <label htmlFor="FullText">Текст отзыва</label>
            <input type="tеxtarea" name="FullText" placeholder="" />
            <label htmlFor="FullText">Оценка от 1 до 5</label>
            <input type="number" min={1} max={5} name="Stars" />
            <button onClick={(f) => f} type="submit">
              Отправить
            </button>
          </form>
        </>
      )}
    </>
  );
};

const AskForm = ({ place = "", setPlace = (f) => f, idItems = 0 }) => {
  const formRef = useRef();

  const { auth, removeAll, toggleModal } = useActions();

  const customer = useCustomers();

  const [infoMessage, setInfoMessage] = useState(""),
    [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current[0].value || !formRef.current[0].value) {
      return false;
    }

    const tempItems = [];
    const dataForm = new FormData(formRef.current);

    const validateResult = validateForms(dataForm, formRef);

    if (!validateResult) return;
    //console.log(validateResult)

    const formJSON = {};

    dataForm.forEach(function (value, key) {
      formJSON[key] = value;
    });

    if (customer.authStatus) {
      formJSON.Customers = {
        connect: [customer.id != -1 ? customer.id : 3],
      };
      if (idItems) {
        formJSON.tovar = {
          connect: [idItems],
        };
      }
    }

    //Отправка данных
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_ASKES}/`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_JWT_ORDER,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formJSON,
        }),
      }
    );

    if (await request) {
      const result = await request.json();
      if (result.id) {
        setInfoMessage("Ошибка создания заказа :(");
      } else {
        setInfoMessage("Заказ успешно создан!");
        removeAll();
        setTimeout(() => {
          setInfoMessage("");
        }, 1000);
      }
    }
  };
  useEffect(() => {
    ////console.log(infoMessage)
  }, [infoMessage]);
  return (
    <>
      {infoMessage ? (
        <h2>Спасибо за вопрос! Мы с Вами скоро свяжемся!</h2>
      ) : (
        <>
          <h2>Есть вопросы по заказу?</h2>
          <p>
            Напишите, какая информация вас интересует и мы ответим в ближайшее
            время
          </p>
          <form
            className={`${styles.formOrder}`}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <label htmlFor="name">Имя</label>
            <input type="name" name="name" placeholder="Имя" />
            <label htmlFor="tel">Телефон</label>
            <input type="tel" name="tel" placeholder="Телефон" />
            <label htmlFor="ask">Вопрос</label>
            <input type="tеxtarea" name="ask" placeholder="" />
            <button onClick={(f) => f} type="submit">
              Отправить
            </button>
          </form>
        </>
      )}
    </>
  );
};

const OrderForm = ({ place = "", setPlace = (f) => f, idItems = 0 }) => {
  const formRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const sideCart = useSelector((state) => state.side.sideCart);
  const toggleSideCart = () => {
    dispatch(setSideCart(!sideCart));
  };
  const { removeAll } = useActions();
  const cart = useStater("cart");
  const customer = useCustomers();
  const [infoMessage, setInfoMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const validateResult = validateForms(formData, formRef);
    if (!validateResult) return;

    const tempItems = cart.map((item) => item.id);
    if (tempItems.length === 0) return;

    formData.append("to", process.env.NEXT_PUBLIC_MAIL_FOR_ORDERS);
    formData.append("OrderStatus", "Необработаный");
    formData.append("Address", customer.address || "Уточнить адрес");
    formData.append("PriceDelivery", "Уточнить цену доставки");
    formData.append("OrderNumber", uuidv4());

    const formJSON = Object.fromEntries(formData.entries());
    formJSON.OrderItems = { connect: tempItems };
    formJSON.Customers = { connect: [customer.id !== -1 ? customer.id : 3] };

    try {
      const response = await fetch(
        // `http://localhost:1338/api/orders`,
        `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_SENDORDER}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_ORDER}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formJSON }),
        }
      );

      const result = await response.json();
      if (result.error) {
        setInfoMessage("Ошибка создания заказа :(");
      } else {
        // setInfoMessage("Заказ успешно создан!");
        removeAll();
        toggleSideCart();
        setTimeout(() => {
          router.push("/routes/pages/thanks");
        }, 1000);
      }
    } catch (error) {
      setInfoMessage("Ошибка при отправке заказа.");
    }
  };

  return (
    <form
      key={`key_form_order_${customer.id !== -1 ? -1 : customer.id}`}
      className="mt-10 transition-all "
      // className={styles.formOrder}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h3>Оформление заказа</h3>
      <p className="my-5">
        Введите свои контактные данные, чтобы наш менеджер связался с вами и
        утвердил заказ
      </p>
      {!infoMessage ? (
        <>
          <div className="flex flex-col gap-4">
            <input
              className="pl-5 py-2.5 rounded border border-gray-600 w-full bg-transparent"
              type="text"
              name="Name"
              placeholder="Имя"
              defaultValue={customer.name || ""}
              onClick={() => (formRef.current[0].value = customer.name)}
            />
            <input
              className="pl-5 py-2.5 rounded border border-gray-600 w-full bg-transparent"
              type="tel"
              name="Phone"
              placeholder="Телефон"
              defaultValue={customer.tel || ""}
              onInput={handlePhoneInput}
              onClick={() => (formRef.current[1].value = customer.tel)}
            />
            <button
              type="submit"
              className="rounded-md w-full py-3 bg-yellow-default border-none text-base flex justify-center items-center text-center font-semibold cursor-pointer whitespace-nowrap"
            >
              Отправить
            </button>
          </div>
        </>
      ) : (
        <h3>{infoMessage}</h3>
      )}
    </form>
  );
};

export default OrderForm;

const AuthForm = ({ place = "", setPlace = (f) => f }) => {
  const formRef = useRef();

  const { auth, removeAll, toggleModal } = useActions();

  const [infoMessage, setInfoMessage] = useState(""),
    [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(formRef.current);

    const validateResult = validateForms(dataForm, formRef);

    if (!validateResult) return false;

    dataForm.append("to", process.env.NEXT_PUBLIC_MAIL_FOR_ORDERS);
    //Отправка данных
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_AUTH}`,
      {
        method: "POST",
        body: dataForm,
      }
    );

    if (await request.ok) {
      const result = await request.json();
      if (result.data.status != "undefined" && result.data.status == "error") {
        setInfoMessage("Ошибка авторизации. Неверный логин или пароль.");
      } else if (result.data.status == "success") {
        setInfoMessage("Авторизация успешна!");
        setTimeout(() => {
          toggleModal();
          setInfoMessage("");
        }, 1000);
        auth(result.data.userdata[0]);
      }
    }
  };

  return (
    <form
      className={`${styles.formOrder}`}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h3>Вход в аккаунт</h3>
      {infoMessage ? (
        <span style={{ textAlign: "center", display: "block", margin: "auto" }}>
          {infoMessage}
        </span>
      ) : (
        <>
          <p>
            У вас нет акаунта?
            <strong
              onClick={() => {
                setPlace("modals_reg");
              }}
            >
              Зарегистрируйтесь
            </strong>
          </p>
          <label htmlFor="tel">Номер телефона</label>
          <input type="tel" name="tel" placeholder="Номер телефона" />
          <label htmlFor="password">Пароль</label>
          <div>
            <input
              type={`${showPass ? "text" : "password"}`}
              name="password"
              placeholder="Пароль"
            />
            <svg
              onClick={() => {
                setShowPass(!showPass);
              }}
              xmlns="https://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                stroke="#ACACAC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{ textAlign: "center", display: "block", margin: "auto" }}
          >
            {infoMessage}
          </span>
          <span
            onClick={() => {
              setPlace("recovery_pass");
            }}
          >
            Забыли пароль?
          </span>
          <button onClick={(f) => f} type="submit">
            Отправить
          </button>
        </>
      )}
    </form>
  );
};

const RegForm = ({ place = "", setPlace = (f) => f }) => {
  const formRef = useRef();

  const { auth } = useActions();
  const { toggleModal } = useActions();

  const [infoMessage, setInfoMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(formRef.current);
    dataForm.append("to", process.env.NEXT_PUBLIC_MAIL_FOR_ORDERS);

    const validateResult = validateForms(dataForm, formRef);

    if (!validateResult) return false;

    //Отправка данных
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_REG}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_JWT_ORDER,
        },
        body: dataForm,
      }
    );
    if (await request.ok) {
      const result = await request.json();
      //console.log(result)
      if (result.data.status == "error") {
        setInfoMessage(
          result.data?.message ? result.data?.message : "Неизвестная ошибка"
        );
      } else if (result.data.status == "success") {
        setInfoMessage("Регистрация успешна!");
        setTimeout(() => {
          toggleModal();
        }, 2000);
        auth(result.data.userdata[0]);
      }
    }
  };
  return (
    <form
      className={`${styles.formOrder} ${styles.formRegistration}`}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h3>Регистрация</h3>
      <p>
        У вас уже есть аккаунт?
        <strong
          onClick={() => {
            setPlace("modals_auth");
          }}
        >
          Войдите
        </strong>
      </p>
      <label htmlFor="tel">Телефон</label>
      <input type="tel" name="tel" placeholder="" />
      <label htmlFor="email">Электронная почта</label>
      <input type="email" name="email" placeholder="" />
      <label htmlFor="name">ФИО</label>
      <input type="name" name="name" placeholder="" />
      <label htmlFor="password">Придумайте пароль</label>
      <input type="password" name="password" placeholder="" />
      <span>{infoMessage}</span>
      <button onClick={(f) => f} type="submit">
        Отправить
      </button>
    </form>
  );
};

const RecForm = ({ place = "", setPlace = (f) => f }) => {
  const formRef = useRef();

  const { auth } = useActions();
  const customer = useCustomers();
  const { toggleModal } = useActions();

  const [infoMessage, setInfoMessage] = useState("");
  const [stageRec, setStageRec] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(formRef.current);
    dataForm.append("to", process.env.NEXT_PUBLIC_MAIL_FOR_ORDERS);

    const validateResult = validateForms(dataForm, formRef);

    if (!validateResult) return false;
    setStageRec(2);
    //Отправка данных
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_RECOVERY}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_JWT_ORDER,
        },
        body: dataForm,
      }
    );
    if (await request.ok) {
      const result = await request.json();
      //console.log(result)
      if (result.data.status == "error") {
        setInfoMessage(
          result.data?.message ? result.data?.message : "Неизвестная ошибка"
        );
      } else if (result.data.status == "success") {
        setInfoMessage("Регистрация успешна!");
        setTimeout(() => {
          toggleModal();
        }, 2000);
        auth(result.data.userdata[0]);
      }
    }
  };
  switch (stageRec) {
    case 1:
      return (
        <form
          className={`${styles.formOrder} ${styles.formRegistration}`}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <h3>Восстановление пароля</h3>
          <label htmlFor="email">Электронная почта</label>
          <input type="email" name="email" placeholder="Введите вашу почту" />
          <label htmlFor="name">Имя</label>
          <input type="name" name="name" placeholder="Только Ваше имя" />
          <span>{infoMessage}</span>
          <button onClick={(f) => f} type="submit">
            Отправить
          </button>
        </form>
      );
      break;
    case 2:
      return (
        <div className={styles.recoveryEnd}>
          <h2>
            На ваш Емейл <br /> направлено письмо
          </h2>
          <p>
            На {formRef.current[0].value} отправлено письмо с ссылкой <br />
            для сброса пароля. Пожалуйста, проверьте почту.
          </p>
          <p>
            Если вы не получили письмо, вероятно, указан <br />
            неверный адрес или письмо случайно попало <br />
            Спам.
          </p>
          <p>
            Если возникнут вопросы или проблемы, напишите нам <br />
            на inforoliz@business.com. Мы приложим все усилия, <br />
            чтобы помочь вам!
          </p>
          <button
            onClick={() => {
              setPlace("modals_auth");
            }}
            type="submit"
          >
            Хорошо!
          </button>
        </div>
      );
      break;
    default:
      <h3>Что-то пошло не так</h3>;
  }
};

export const ConsultForm = ({ place = "", setPlace = (f) => f }) => {
  const formRef = useRef(null);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const validateResult = validateForms(formData, formRef);
    if (!validateResult) {
      setInfoMessage("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    if (!isConsentChecked) {
      setInfoMessage(
        "Пожалуйста, дайте согласие на обработку персональных данных."
      );
      return;
    }

    const formJSON = {};
    formData.forEach(function (value, key) {
      formJSON[key] = value;
    });

    formJSON.ConsentChecked = isConsentChecked;

    const sendEndpoint = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_CONSULT}/`;

    try {
      const response = await fetch(sendEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_CONSULT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formJSON }),
      });

      const result = await response.json();

      if (result.error) {
        console.error("Ошибка при отправке формы консультации:", result.error);
        setInfoMessage(
          "Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
        );
      } else {
        console.log("Форма консультации успешно отправлена:", result);
        setInfoMessage("Спасибо! Ваша заявка отправлена!");
        if (formRef.current) formRef.current.reset();
        setIsConsentChecked(false);
        setTimeout(() => setInfoMessage(""), 5000);
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setInfoMessage("Произошла ошибка при отправке формы.");
    }
  };

  return (
    <section
      className={`relative min-h-[568px] md:min-h-auto p-10 md:pt-8 md:px-14 rounded-xl overflow-hidden bg-[url('/images/consult-bg.png')] md:[url('/images/consult-bg-mobile.png')] bg-cover bg-center bg-no-repeat flex flex-col`}
    >
      <div className="relative z-10 max-w-md w-full text-white-default">
        {infoMessage && (
          <h2 className="text-[28px]/8 xl:text-[55px] md:text-3xl xl:leading-[1] font-semibold mb-4">
            {infoMessage}
          </h2>
        )}
        {!infoMessage && (
          <>
            <h2 className="text-[28px]/8 xl:text-[55px] md:text-3xl xl:leading-[1] font-semibold mb-4">
              Задайте нам вопрос
            </h2>
            <p className="text-xs lg:text-lg mb-8">
              Оставьте контакты и наш менеджер
              <br />
              свяжется с вами в ближайшее время
            </p>
            <form
              onSubmit={handleSubmit}
              ref={formRef}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Введите имя..."
                className="p-3 md:p-4 rounded-lg bg-gray-dark text-white font-light placeholder-gray-light border-none focus:outline-none"
                required
              />
              <input
                type="tel"
                name="tel"
                onInput={handlePhoneInput}
                placeholder="Введите телефон..."
                className="p-3 md:p-4 rounded-lg bg-gray-dark text-white font-light placeholder-gray-light border-none focus:outline-none"
                required
              />
              <textarea
                name="message"
                placeholder="Введите сообщение..."
                className="p-3 md:p-4 text-[24px] rounded-lg bg-gray-dark text-white font-light placeholder-gray-light border-none focus:outline-none"
                required
              />
              <button
                type="submit"
                className="p-3 md:p-4 rounded-lg bg-yellow-default text-black font-semibold text-sm md:text-xl xl:text-base cursor-pointer disabled:bg-gray-medium disabled:text-gray-dark disabled:cursor-not-allowed transition-colors"
                disabled={!isConsentChecked}
              >
                Получить консультацию
              </button>

              <div className="flex items-start mt-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  className="mr-2 accent-yellow-400"
                  checked={isConsentChecked}
                  onChange={(e) => setIsConsentChecked(e.target.checked)}
                />
                <label
                  htmlFor="consent"
                  className="text-[8px] lg:text-sm text-gray-300 font-light cursor-pointer"
                >
                  Нажимая кнопку, даю согласие <br />{" "}
                  <span className="text-yellow-default">
                    на обработку персональных данных
                  </span>
                </label>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

/* WORKERS ( FOR REFACTOR ) */

/**
 *
 * @param form
 * @param formRef
 * @returns {boolean}
 */
const validateForms = (form, formRef) => {
  const checkArray = Array.from(form);
  const regTel =
    /^(\+7|7|8)?[\s\-]?\(?[3-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g;

  for (let data of checkArray) {
    switch (data[0]) {
      case "tel":
        //console.log("Проверка телефона: " + data[1].match(regTel))
        if (!data[1].match(regTel)) {
          data[1] = "Неверный номер телефона";
          break;
        }
        data[1] = "success";
      case "name":
        if (!data[1]) {
          data[1] = "Поле не может быть пустым.";
          break;
        }
        data[1] = "success";
      case "to":
        data[1] = "success";
        break;
      default:
        if (!data[1]) data[1] = "Поле не может быть пустым.";
        else data[1] = "success";
    }
  }

  if (checkArray.filter((item) => item[1] !== "success")[0]) {
    for (let i = 0; i < checkArray.length - 1; i++) {
      formRef.current[i].placeholder = checkArray[i][1];
    }
    return false;
  } else {
    ////console.log(checkArray)
    return true;
  }
};
