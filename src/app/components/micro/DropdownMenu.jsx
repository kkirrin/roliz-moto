import React from "react";
import Link from "next/link";

const DropdownMenu = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 min-w-96 p-8 absolute left-0 top-16 z-10 rounded-[20px] hover:transition-all shadow-md bg-white-light">
      <ul className="flex flex-col gap-2">
        {data?.attributes.childs.data.map((category) => (
          <Link href={`/routes/shop/${category.id}`}>
            <li
              key={category.id}
              className="hover:text-gray-light transition-all duration-300"
            >
              {category.attributes.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
