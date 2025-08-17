"use client";

import React from "react";

export default function Services() {
  return (
    <main>
      <section className="flex pt-5">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Информация о гарантии</h2>
          <p className="mb-4">
            Вы можете скачать полную информацию о гарантийных условиях в формате
            PDF.
          </p>
          <a
            href="/documents/warranty.pdf"
            download
            className="hover:text-gray-dark font-bold py-2 transition-all"
          >
            Скачать PDF с информацией о гарантии
          </a>
        </div>
      </section>
    </main>
  );
}
