import React from "react";
import Image from "next/image";

import styles from "@/app/css/header.module.css";
import { useGetContactsQuery } from "@/redux/api/contacts.api";
import { useMain } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

export const CallBack = ({}) => {
  const { isLoading, error, data } = useGetContactsQuery();

  const { mobile, showModal } = useMain();
  const { toggleModal } = useActions();

  const openCallButton = (evt) => {
    evt.preventDefault();
    toggleModal("callback");
  };

  const phoneNumber = data?.data ? data.data[0].attributes.MainTel : null;
  const displayText = phoneNumber || `Загрузка...`;

  if (isLoading) return `Загрузка...`;

  return (
    <button >
        <a href={`tel:${phoneNumber}`}>{displayText}</a>
      {/* <a
        onClick={(evt) => {
          if (!mobile) openCallButton(evt);
        }}
        onTouchStart={(evt) => {
          if (!mobile) openCallButton(evt);
        }}
        href="/"
      >
        Заказать звонок
      </a> */}
    </button>
  );
};
