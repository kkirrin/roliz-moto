"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { Loader } from "@/app/components/micro/Loader";

import { useGetContactsQuery } from "@/redux/api/contacts.api";

import styles from "@/app/css/mainpage.module.css";
import intostyles from "@/app/css/user.module.css";
import { ProfileIcon } from "@/app/components/user/User";
import { useCustomers } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

export default function Page({}) {
  const { isLoading, error, data } = useGetContactsQuery();

  const router = useRouter();
  const customer = useCustomers();
  const { exit } = useActions();

  const [selectPage, setSelectPage] = useState(0);

  useEffect(() => {}, [data]);

  //Проверка авторизации
  if (!customer.authStatus) {
    return (
      <>
        <main className={`${styles.main} ${styles.contentpage}`}>
          <h3
            style={{
              marginTop: "100px",
            }}
          >
            Авторизируйтесь, чтобы получить доступ к личному кабинету
          </h3>
        </main>
      </>
    );
  }
  //Если авторизирован, то показываем кабинет
  return (
    <>
      <main className={`${styles.main} ${styles.contentpage}`}>
        <section className={`${intostyles.mBlockCabinet}`}>
          <article className={`${intostyles.lBlockCabinet}`}>
            <div className={`${intostyles.avatarBlock}`}>
              <ProfileIcon />
            </div>
            <nav>
              <ul>
                <li
                  onClick={() => {
                    setSelectPage(0);
                  }}
                >
                  Личные данные
                </li>
                <li
                  onClick={() => {
                    setSelectPage(1);
                  }}
                >
                  Заказы
                </li>
                <li
                  onClick={() => exit(true)}
                  style={{
                    color: "#626262",
                  }}
                >
                  Выход
                </li>
              </ul>
            </nav>
          </article>

          <article className={`${intostyles.rBlockCabinet}`}>
            <SelectebleContent select={selectPage} />
          </article>
        </section>
      </main>
    </>
  );
}

const SelectebleContent = ({ select }) => {
  const customer = useCustomers();

  switch (select) {
    case 0:
      return (
        <div className={intostyles.blockContent}>
          <h2>Личные данные</h2>
          <h5 style={{ margin: "10px 0 10px 0" }}>
            Статус клиента: {customer.type ? customer.type : ""}
          </h5>
          <section className={intostyles.rowContent}>
            <EditerData name={"ФИО"} type={"name"} check={"fullname"} />
            <EditerData name={"Телефон"} type={"tel"} check={"tel"} />
            <EditerData name={"Имейл"} type={"email"} check={"username"} />
            <EditerData name={"Адрес"} type={"address"} check={"address"} />
          </section>
        </div>
      );
      break;
    case 1:
      return (
        <div className={intostyles.blockContent}>
          <h2>Заказы</h2>
          <OrdersCustomer />
        </div>
      );
      break;
    default:
      return <h2>Неизвестный тип контента</h2>;
  }
};

const OrdersCustomer = ({}) => {
  const customer = useCustomers();
  const [typeOrders, setTypeOrders] = useState(true);
  return (
    <>
      <div className={intostyles.rowButtons}>
        <button
          style={{
            backgroundColor: typeOrders ? "#262626" : "#FFFFFF",
            color: typeOrders ? "#FFFFFF" : "#262626",
          }}
          onClick={() => {
            setTypeOrders(true);
          }}
        >
          Актуальные заказы
        </button>
        <button
          style={{
            backgroundColor: !typeOrders ? "#262626" : "#FFFFFF",
            color: !typeOrders ? "#FFFFFF" : "#262626",
          }}
          onClick={() => {
            setTypeOrders(false);
          }}
        >
          Выполненные заказы
        </button>
      </div>
      <div className={intostyles.listOfOrders}>
        {customer &&
        customer.orders &&
        Array.isArray(customer.orders) &&
        customer.orders[0] != "undefined" ? (
          customer.orders.map((item, index) => {
            if (item.OrderStatus != "Выполнен" && typeOrders) {
              return (
                <div className={intostyles.oneOrder} key={index}>
                  <div className={styles.row0}>
                    <h2 className="text-[16px]">Заказ №{item.id}</h2>
                    <p className="text-[12px]">
                      <span>Дата:</span> {item.createdAt.split("T")[0]}
                    </p>
                  </div>

                  <p className="text-[10px]">
                    Извещение не понадобится. <br />А вот паспорт могут
                    попросить, прежде чем вручить заказ
                  </p>
                  <div className={intostyles.infoDeliveryBlock}>
                    <h2 className="text-[14px]">Способ получения</h2>
                    <div className={intostyles.row}>
                      <p className="text-[10px]">Адрес отделения:</p>
                      <p className="text-[10px]">{item.Address ? item.Address : "Адрес неизвестен"}</p>
                      <p className="text-[10px]">Получатель:</p>
                      <p>
                        {item.Name && item.Phone
                          ? item.Name + "\n" + item.Phone
                          : "Получатель неизвестен"}
                      </p>
                      <p className="text-[10px]">Статус:</p>
                      <p>
                        {item.OrderStatus
                          ? item.OrderStatus
                          : "Статус неизвестен"}
                      </p>
                      <p className="text-[10px]">Стоимость доставки:</p>
                      <p>
                        {Number.parseInt(item.PriceDelivery)
                          ? item.PriceDelivery + " ₽"
                          : "Стоимость неизвестна"}
                      </p>
                    </div>
                  </div>
                  <button>Повторить заказ</button>
                </div>
              );
            } else if (item.OrderStatus == "Выполнен" && !typeOrders) {
              return (
                <div className={intostyles.oneOrder} key={index}>
                  <div className={styles.row0}>
                    <h2>Заказ №{item.id}</h2>
                    <p>
                      <span>Дата:</span> {item.createdAt.split("T")[0]}
                    </p>
                  </div>

                  <p className="text-[10px]">
                    Извещение не понадобится. <br />А вот паспорт могут
                    попросить, прежде чем вручить заказ
                  </p>

                  <div className={intostyles.infoDeliveryBlock}>
                    <h2 className="text-[14px]">Способ получения</h2>
                    <div className={intostyles.row}>
                      <p className="text-[12px]">Адрес отделения:</p>
                      <p className="text-[12px]">{item.Address ? item.Address : "Адрес неизвестен"}</p>
                      <p className="text-[12px]">Получатель:</p>
                      <p>
                        {item.Name && item.Phone
                          ? item.Name + "\n" + item.Phone
                          : "Получатель неизвестен"}
                      </p>
                      <p className="text-[12px]">Статус:</p>
                      <p>
                        {item.OrderStatus
                          ? item.OrderStatus
                          : "Статус неизвестен"}
                      </p>
                      <p className="text-[10px]">Стоимость доставки:</p>
                      <p>
                        {Number.parseInt(item.PriceDelivery)
                          ? item.PriceDelivery + " ₽"
                          : "Стоимость неизвестна"}
                      </p>
                    </div>
                  </div>
                  <button>Повторить заказ</button>
                </div>
              );
            }
          })
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

const EditerData = ({ name = "", type = "", check = "" }) => {
  if (!type || !check || !name) return;

  const customer = useCustomers();

  const [editMode, setEditMode] = useState(false);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (editMode) {
      setValue(customer[check]);
    }
  }, [editMode]);

  return (
    <div className={intostyles.oneEditebleElement}>
      <div className={intostyles.upEditableElement}>
        <p>{name}</p>
        <svg
          onClick={() => {
            setEditMode(!editMode);
          }}
          xmlns="https://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <g clipPath="url(#clip0_285_6385)">
            <path
              d="M2.94219 9.25564L2.27188 12.1666C2.2539 12.2441 2.25596 12.3249 2.27786 12.4014C2.29977 12.4779 2.34079 12.5476 2.39706 12.6039C2.45333 12.6602 2.52301 12.7012 2.59951 12.7231C2.67603 12.745 2.75685 12.7471 2.83438 12.7291L5.74531 12.0588C5.83403 12.0401 5.91545 11.9962 5.97969 11.9322C7.65781 10.2564 12.6172 5.29705 14.2156 3.69627C14.2592 3.65275 14.2938 3.60104 14.3174 3.54414C14.341 3.48723 14.3531 3.42622 14.3531 3.36463C14.3531 3.30303 14.341 3.24203 14.3174 3.18512C14.2938 3.12821 14.2592 3.07651 14.2156 3.03299L11.968 0.794706C11.9244 0.751122 11.8727 0.716549 11.8158 0.692959C11.7589 0.669369 11.6979 0.657227 11.6363 0.657227C11.5747 0.657227 11.5137 0.669369 11.4568 0.692959C11.3999 0.716549 11.3482 0.751122 11.3047 0.794706L3.06875 9.03064C3.00634 9.09231 2.96249 9.17028 2.94219 9.25564ZM11.6375 1.78846L13.2125 3.3658L11.4617 5.11424L9.88672 3.53924L11.6375 1.78846Z"
              fill="#262626"
            />
            <path
              d="M14.0625 7.03125C13.9382 7.03125 13.819 7.08063 13.731 7.16855C13.6431 7.25646 13.5938 7.37569 13.5938 7.5V13.5938H1.40625V1.40625H7.5C7.62431 1.40625 7.74354 1.35686 7.83145 1.26896C7.91937 1.18105 7.96875 1.06182 7.96875 0.9375C7.96875 0.81318 7.91937 0.693952 7.83145 0.606045C7.74354 0.518135 7.62431 0.46875 7.5 0.46875H0.9375C0.81318 0.46875 0.693952 0.518135 0.606045 0.606045C0.518135 0.693952 0.46875 0.81318 0.46875 0.9375V14.0625C0.46875 14.1868 0.518135 14.306 0.606045 14.394C0.693952 14.4819 0.81318 14.5312 0.9375 14.5312H14.0625C14.1868 14.5312 14.306 14.4819 14.394 14.394C14.4819 14.306 14.5312 14.1868 14.5312 14.0625V7.5C14.5312 7.37569 14.4819 7.25646 14.394 7.16855C14.306 7.08063 14.1868 7.03125 14.0625 7.03125Z"
              fill="#262626"
            />
          </g>
          <defs>
            <clipPath id="clip0_285_6385">
              <rect width="15" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={intostyles.downEditableElement}>
        {editMode ? (
          <input
            id="edit"
            name={name}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        ) : (
          <>{customer[check]}</>
        )}
      </div>
    </div>
  );
};
