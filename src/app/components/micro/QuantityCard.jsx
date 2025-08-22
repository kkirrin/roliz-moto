import React, { useState, useEffect } from "react";
import { useStater } from "@/hooks/useStater";
import { useCustomers } from "@/hooks/useStater";
import styles from "@/app/css/cart.module.css"

const QuantityCard = ({ quantityItems = [] }) => {
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

  useEffect(() => {
    // Сбрасываем переменные перед вычислением
    let tempTotalSum = 0;
    let tempTotalWeight = 0;
    let tempTotalProducts = 0;

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
  }, [cart, customer.type]);

  useEffect(() => { }, [quantityItems]);
  return (
    <>
      <p
        key={`counterKeys_${quantityItems}`}
        className={`${styles.countItems}`}
      >
        ( {totalProducts} шт)
      </p>
    </>
  );
};

export default QuantityCard;