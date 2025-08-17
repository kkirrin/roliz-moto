import React from "react";
import Link from "next/link";
import { Loader } from "@/app/components/micro/Loader";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";

const DropdownMenu = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  console.log("data : ", data);

  if (isLoading) return <Loader />;

  return (
    <div className="flex gap-12 p-8  rounded-[20px] shadow-md bg-white-light">
      {data?.data.map((category) => (
        !category.attributes.parent.data && (
          <div key={category.id} className="flex flex-col gap-5">
            <Link href={`/routes/shop/${category.id}`} className="text-xl hover:text-blue-600">
              <h4>{category.attributes.name}</h4>
            </Link>
            {category.attributes.childs.data.length > 0 && (
              <div>
                <ul className="flex flex-col gap-2">
                  {category.attributes.childs.data.map((subCategory) => (
                    <li key={subCategory.id} >{subCategory.attributes.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default DropdownMenu;
