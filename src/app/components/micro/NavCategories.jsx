import React from "react";
import Link from "next/link";

function NavCategories({ data, isLoading, burgerSetter = null }) {
  const closedBurger = () => {
    if (typeof burgerSetter === "function") {
      burgerSetter(false);
    }
  };

  return (
    <nav className="flex flex-col gap-3">
      <div className="flex flex-col gap-5 my-7 md:my-0 md:p-8 md:gap-5 xl:gap-7 xl:p-8 xl:pr-14 ">
        {!isLoading ? (
          data && data.data ? (
            data.data
              .filter((item) => !item.attributes.parent.data)
              .sort((a, b) => {
                const order = [
                  "мотоциклы",
                  "велосипеды",
                  "экипировка",
                  "запчасти",
                ];
                const nameA = a.attributes.name.toLowerCase();
                const nameB = b.attributes.name.toLowerCase();

                const indexA = order.indexOf(nameA);
                const indexB = order.indexOf(nameB);

                if (indexA === -1 && indexB === -1) return 0;
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;

                return indexA - indexB;
              })
              .map((item) => {
                return (
                  <Link
                    key={`key_catalog_button_${item.id}`}
                    href={`/routes/shop/${item.id}`}
                    className="flex items-center gap-5 md:gap-3 xl:gap-5 text-sm font-bold md:text-xl md:font-normal hover:opacity-50 transition-all"
                    onClick={
                      typeof burgerSetter === "function" ? closedBurger : null
                    }
                  >
                    {item.attributes.icon.data ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.icon.data.attributes.url}`}
                        alt={"Изображение категории " + item.attributes.name}
                        className="w-5 xl:w-8 h-auto"
                      />
                    ) : null}
                    <h4>{item.attributes.name}</h4>
                  </Link>
                );
              })
          ) : null
        ) : (
          <h2>Загрузка</h2>
        )}
      </div>
    </nav>
  );
}

export default NavCategories;
