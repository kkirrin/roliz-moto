import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewMode } from "@/redux/reducers/viewReducer";
import { setSortingMode } from "@/redux/reducers/sortingReducer";
import useIsWideScreen from "@/app/utils/isWideScreen";
import Image from "next/image";

const Sorting = ({ forPartners = false }) => {
  const dispatch = useDispatch();
  const sorting = useSelector((state) => state.sorting.sortingMode);
  const [isOpen, setIsOpen] = useState(false);
  const isWideScreen = useIsWideScreen();
  const viewMode = useSelector((state) => state.view.viewMode);
  if (!isWideScreen) {
    dispatch(setViewMode("grid"));
  }

  useEffect(() => {
    if (forPartners) {
      dispatch(setViewMode("mini-table"));
      handleViewChange("mini-table")
    } else {
      dispatch(setViewMode("grid"));
      handleViewChange("grid")
    }
  }, [forPartners]);

  // const view = useSelector((state) => state.view.viewMode);

  const handleViewChange = (value) => {
    dispatch(setViewMode(value));
  };

  const handleOptionClick = (value) => {
    dispatch(setSortingMode(value));
    setIsOpen(false);
  };

  useEffect(() => {}, [sorting]);

  return (
    <>

    <div className="flex py-3 justify-between">
      <div className="relative">
        <div
          className="relative bg-white text-gray-default pr-12 cursor-pointer hover:opacity-75"
          onClick={() => setIsOpen(!isOpen)}
        >
          {sorting === "asc"
            ? "По возрастанию цены"
            : sorting === "desc"
            ? "По убыванию цены"
            : "По алфавиту"}
          <Image
            src="/blackArrow.svg"
            alt="иконка стрелка"
            width={10}
            height={10}
            className="absolute top-2 right-5"
          />
        </div>
        {isOpen && (
          <div className="absolute z-10 mt-1 p-3 w-full bg-white-default rounded-md shadow-lg ">
            <div
              className="p-2 hover:text-gray-light cursor-pointer hover:transition-all"
              onClick={() => handleOptionClick("asc")}
            >
              По возрастанию цены
            </div>
            <div
              className="p-2 hover:text-gray-light cursor-pointer hover:transition-all"
              onClick={() => handleOptionClick("desc")}
            >
              По убыванию цены
            </div>
            <div
              className="p-2 hover:text-gray-light cursor-pointer hover:transition-all"
              onClick={() => handleOptionClick("alphabet")}
            >
              По алфавиту
            </div>
          </div>
        )}
      </div>

        {/* режимы просмотра */}
        {forPartners ? (
          <>
          </>
          ) : (
              isWideScreen && (
              <div className="flex justify-between gap-5">
                <button
                  onClick={() => handleViewChange("grid")}
                  className={` hover:opacity-80 ${
                    viewMode === "grid" ? "filter invert" : ""
                  }`}
                >
                  <Image src="/icon/grid.svg" alt="иконка плитка" width={15} height={15} />
                </button>
                <button
                  onClick={() => handleViewChange("list")}
                  className={` hover:opacity-80 ${  
                    viewMode === "list" ? "filter invert" : ""
                  }`}
                >
                  <Image src="/icon/list.svg" alt="иконка список" width={15} height={15} />
                </button>
                <button
                  onClick={() => handleViewChange("table")}
                  className={` hover:opacity-80 ${
                    viewMode === "table" ? "filter invert" : ""
                  }`}
                >
                  <Image src="/icon/table.svg" alt="иконка таблица" width={15} height={15} />
                </button>
              </div>
              )
      )}
    </div>
    </>
  );
};

export default Sorting;
