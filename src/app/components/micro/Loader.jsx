import React from "react";
import Image from "next/image";
import animationData from "@/content/Wheel.json";
import styles from "@/app/css/header.module.css";

export const Loader = ({}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };
  return (
    <div className={`${styles.loaderContainer}`}>
      <Image
        src={"/loader.png"}
        alt={"Избражение загрузки контента"}
        height={40}
        width={40}
      />
    </div>
  );
};
