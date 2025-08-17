"use client";
import React, { useEffect, useState, forwardRef } from "react";

import styles from "@/app/css/delivery.module.css";

const Delivery = forwardRef(function (props, ref) {
  const fetchData = [
    {
      title: `Где и как вы хотите получить заказ?`,
      name: "delivery",
      type: "checkbox",
      variants: [
        "Самовывоз, Поселок Пупкина, ул. Затупкина 39",
        "Доставка курьером",
      ],
    },
    {
      title: `Как вам удобно будет оплатить заказ?`,
      name: "payer",
      type: "checkbox",
      variants: ["Оплата банковской картой", "Оплата наличными при получении"],
    },
    {
      title: `Введите данные получателя заказа`,
      type: "input",
      variants: [
        {
          title: "ФИО",
          required: true,
          name: "name",
          type: "text",
          placeholder: "Фамилия и имя",
        },
        {
          title: "Адрес доставки",
          required: true,
          type: "text",
          name: "address",
          placeholder: "Введите адрес доставки",
        },
        {
          title: "Комментарий",
          required: false,
          type: "text",
          name: "comments",
          placeholder: "Введите комментарий",
        },
        {
          title: "Телефон",
          required: true,
          type: "tel",
          name: "phone",
          placeholder: "Ваш телефоне",
        },
        {
          title: "Эл. почта",
          required: true,
          type: "text",
          name: "email",
          placeholder: "Ваш Email",
        },
      ],
    },
  ];

  const [statusLoad, setStatusLoad] = useState(false);

  useEffect(() => {
    if (statusLoad === false) {
      setStatusLoad(true);
      //тут будет фетч
    }
  }, [statusLoad]);

  return (
    <form ref={ref} className={`${styles.orderContainer}`}>
      {fetchData && Array.isArray(fetchData)
        ? fetchData.map((item, index) => {
            return (
              <article
                key={`mainRefsKeys_${index}`}
                className={`${styles.orderBlock}`}
              >
                <h3 className={`${styles.orderTitle}`}>{item.title}</h3>
                {item.type === "checkbox"
                  ? item.variants.map((variant, index) => {
                      return (
                        <div
                          key={`secondCheckBoxRefsKeys_${index}`}
                          className={`${styles.orderRow}`}
                        >
                          <input
                            type={item.type}
                            name={item.name}
                            value={variant}
                          />{" "}
                          <span>{variant}</span>
                        </div>
                      );
                    })
                  : null}

                {item.type === "input" ? (
                  <div className={`${styles.orderInputsContainer}`}>
                    {item.variants.map((variant, index) => {
                      return (
                        <div
                          key={`secondInputsRefsKeys_${index}`}
                          className={`${styles.orderRow}`}
                        >
                          <span>
                            {variant.title}
                            {variant.required ? "*" : null}
                          </span>
                          <input
                            type={variant.type}
                            required={variant.required}
                            name={variant.name}
                            placeholder={variant.placeholder}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </article>
            );
          })
        : null}
    </form>
  );
});
Delivery.displayName = "Delivery";

export default Delivery;
