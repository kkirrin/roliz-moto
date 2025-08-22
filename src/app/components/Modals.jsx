"use client";

import React, { useEffect, useState } from "react";

import { useCustomers, useMain, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

import { Forms } from "@/app/components/Forms";

import styles from "@/app/css/modals.module.css";

const Modals = ({}) => {
  const main = useMain();
  const customer = useCustomers();

  const { toggleModal } = useActions();

  useEffect(() => {}, [main]);
  useEffect(() => {
    ////console.log(main.showModal)
  }, [main.showModal]);

  return (
    <section
      key={`key_modal_${main.showModal}`}
      className={`${styles.modalsContainer} ${
        main.showModal ? styles.avtiveModal : styles.nonAvtiveModal
      }`}
    >
      <div className={`${styles.centerMobalBlock}`}>
        <h3
          onClick={(evt) => {
            if (!main.mobile) toggleModal();
          }}
          onTouchStart={() => {
            if (main.mobile) toggleModal();
          }}
        >
          X
        </h3>
        {main.typeModal == "modals_auth" ? (
          <Forms place={"modals_auth"} />
        ) : main.typeModal == "modals_reg" ? (
          <Forms place={"modals_reg"} />
        ) : main.typeModal == "recovery_pass" ? (
          <Forms place={"recovery_pass"} />
        ) : (
          <Forms place={"callback"} />
        )}
      </div>
    </section>
  );
};

export default Modals;
