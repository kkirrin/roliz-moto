"use client";

import React, { useEffect, useRef, useState } from "react";

import { useMain, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";
import productStyles from "@/app/css/product.module.css";
import Image from "next/image";

const IntoProductImages = ({ data, title }) => {
  const [selectedImages, setSelectedImages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [scrollSpeed] = useState(200);

  const refSlider = useRef();

  const { mobile } = useMain();

  const handleWheel = (evt) => {
    const container = evt.currentTarget;
    const isInContainer = container.contains(evt.target);

    if (isInContainer) {
      evt.preventDefault();
      const scrollAmount = evt.deltaY < 0 ? -scrollSpeed : scrollSpeed;
      container.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => { });

  useEffect(() => {
    const handleDocumentWheel = (evt) => {
      const container = document.querySelector(
        `.${productStyles.sliderThumbs}`
      );
      if (container && container.contains(evt.target)) {
        handleWheel(evt);
      }
    };

    document.addEventListener("wheel", handleDocumentWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleDocumentWheel);
    };
  }, []);

  useEffect(() => { }, [selectedImages]);

  const handleImageClick = () => {
    console.log("click");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!data) {
    return (
      <article className={`${productStyles.imageBlock}`}>
        <div className={`${productStyles.singleProductImg}`}>
          <Image unoptimized src={`/noImage.jpg`} alt={title} fill loading="lazy" />
        </div>
      </article>
    );
  }

  console.log('data img:', data);

  return (
    <article className={`${productStyles.imageBlock}`}>
      {data && Array.isArray(data) && data[selectedImages] ? (
        <div
          className={`${productStyles.singleProductImg}`}
          onClick={handleImageClick}
        >
          {/* Кнопка "Предыдущее" */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImages((prev) =>
                prev > 0 ? prev - 1 : data.length - 1
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[url('/icon/ArrowLeft.svg')] bg-no-repeat w-[25px] h-[25px] flex items-center justify-center z-10"
          >

          </button>

          {/* Кнопка "Следующее" */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImages((prev) =>
                prev < data.length - 1 ? prev + 1 : 0
              );
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[url('/icon/Arrow.svg')] bg-no-repeat w-[25px] h-[25px] flex items-center justify-center z-10"
          >

          </button>
          <Image
            unoptimized
            src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${data[selectedImages].attributes.url}`}
            alt={data[selectedImages].attributes.alt}
            fill
          />
        </div>
      ) : (
        <div className={`${productStyles.singleProductImg}`}>
          <Image unoptimized src={`/noImage.jpg`} alt={title} fill loading="lazy" />
        </div>
      )}

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 w-8 h-8 rounded-full flex items-center justify-center"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <Image
              unoptimized
              src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${data[selectedImages].attributes.url}`}
              alt={data[selectedImages].attributes.alt}
              width={1200}
              height={800}
              style={{ objectFit: "contain", maxHeight: "90vh", width: "auto" }}
            />
          </div>
        </div>
      )}

      <div
        onWheel={(evt) => {
          handleWheel(evt);
        }}
        className={`${productStyles.sliderThumbs}`}
      >
        {data && Array.isArray(data) && data[1]
          ? data.map((item, index) => {
            return (
              <div
                onClick={(evt) => {
                  if (!mobile) {
                    setSelectedImages(index);
                  }
                }}
                onTouchStart={(evt) => {
                  setSelectedImages(index);
                }}
                className={`${productStyles.singleProductImg}`}
              >
                <Image
                  unoptimized
                  src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.url}`}
                  alt={item.attributes.alt}
                  fill
                />
              </div>
            );
          })
          : null}
      </div>
    </article>
  );
};

export default IntoProductImages;
