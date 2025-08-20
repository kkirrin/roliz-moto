import React, { useState } from "react";
import Link from "next/link";
import { Loader } from "./Loader";
import { useGetMainCategoriesQuery } from "@/redux/api/main-categories.api";
import styles from "@/app/css/navCatalogue.module.css";

function NavCatalogue() {
  const { isLoading, data } = useGetMainCategoriesQuery();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  // const isEquip =  data.id

  console.log(data);

  if (isLoading) return <Loader />;

  return (
    <div className={`${styles.navCatalogue} grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-4 md:gap-x-3 md:gap-y-0`}>
      {typeof data != "undefined" && data.data != "undefined"
        ? data?.data?.map((item) => {
            if (!item.attributes.parent.data) {
              const hasChilds =
                item.attributes.childs &&
                item.attributes.childs.data.length > 0;

              return (
                <div
                  className={`${styles.navCatalogueItem} relative`}
                  key={item.id}
                  onMouseOver={() => {
                    if (hasChilds) {
                      setActiveCategoryId(item.id);
                    }
                  }}
                  onMouseOut={() => setActiveCategoryId(null)}
                >
                  <Link
                    href={`/routes/shop/${item.id}`}
                    className="relative block cursor-pointer hover:transition-all 
                  hover:bg-yellow-default group "
                  >
                    <img
                      src={`https://roliz-moto.ru${item.attributes.image?.data?.attributes?.url}`}
                      className="w-full"
                      width={310}
                      height={200}
                    />
                    <div className="absolute top-2 left-2 right-2 lg:top-5 lg:left-6 lg:right-6 flex justify-between">
                      <p
                        className={`text-sm lg:text-2xl uppercase ${
                          item.id === 91 ? "text-black" : "text-white-default"
                        }`}
                      >
                        {item.attributes.name}
                      </p>
                      <img
                        src={`${
                          item.id === 91
                            ? "/icon/Arrow.svg"
                            : "/icon/ArrowWhite.svg"
                        }`}
                        alt="иконка"
                        className="lg:w-8"
                      />
                    </div>
                  </Link>
                  {/* {activeCategoryId === item.id && hasChilds && (
                    <DropdownMenu data={item} />
                  )} */}
                </div>
              );
            }
          })
        : null}
    </div>

  );
}

export default NavCatalogue;
