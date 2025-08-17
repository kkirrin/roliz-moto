import Link from "next/link";
import React from "react";

function ThanksPage() {
  return (
    <section className="pt-36 md:pt-12 xl:pt-28 flex flex-col items-center">
      <div className="flex flex-col items-center gap-5 mb-8 font-semibold">
        <h3 className="text-3xl md:text-4xl xl:text-[55px]">Спасибо за заявку!</h3>
        <p className="text-sm md:text-base xl:text-2xl text-center">
          Ожидайте звонка менеджера, а пока<br/>можете посмотреть, что мы предлагаем
        </p>
        <Link href="/routes/shop" className="text-base md:text-xs xl:text-base bg-yellow-default py-3 px-12 md:py-2 md:px-8 xl:py-3 xl:px-12 rounded-lg hover:bg-yellow-dark transition-all">Перейти в каталог</Link>
      </div>
        <img src="/images/thanks.png" alt="" className="md:hidden" />
        <img src="/images/thanks-wide.png" alt="" className="hidden md:block max-w-[900px]" />

    </section>
  );
}

export default ThanksPage;
