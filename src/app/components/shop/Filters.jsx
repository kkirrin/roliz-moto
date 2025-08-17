import React, { useEffect, useRef, useState } from "react";

import styles from "@/app/css/filters.module.css";

import { useFilters, useStater } from "@/hooks/useStater";
import { Loader } from "@/app/components/micro/Loader";
import { useGetCategoriesQuery } from "@/redux/api/categories.api";
import { useGetProductOnPageQuery } from "@/redux/api/products.api";
import { useActions } from "@/hooks/useActions";

/**
 *
 * @param {string} string
 * @param {Array} array
 * @returns void[];
 */
const Filters = ({
  setUpdate = (f) => f,
  setPageNumber = (f) => f,
  filter,
}) => {
  const { isLoading, data } = useGetCategoriesQuery();

  switch (filter.type) {
    case "drop":
      return (
        <section className={`${styles.filtersBlock}`}>
          <nav></nav>
        </section>
      );
      break;
    case "category":
      return (
        <section className={`${styles.filtersBlock}`}>
          <nav>
            {!isLoading ? (
              data && data.data ? (
                <DropFilter
                  key={`category_${filter.id}_${filter.type}`}
                  setUpdate={setUpdate}
                  item={filter}
                  categories={data.data}
                  index={filter.id}
                />
              ) : null
            ) : null}
          </nav>
        </section>
      );
      break;
    case "range":
      return (
        <section className={`${styles.filtersBlock}`}>
          <nav>
            <DropFilter
              key={`category_${filter.id}_${filter.type}`}
              item={filter}
              index={filter.id}
              setPageNumber={setPageNumber}
            />
          </nav>
        </section>
      );
      break;
    case "oneSelect":
      return (
        <section className={`${styles.filtersBlock}`}>
          <nav>
            <OneSelectFilter
              key={`category_${filter.id}_${filter.type}`}
              item={filter}
              index={filter.id}
            />
          </nav>
        </section>
      );
      break;
    case "select":
      return (
        <section className={`${styles.filtersBlock}`}>
          <nav>
            <SelectFilter
              key={`category_${filter.id}_${filter.type}`}
              item={filter}
              index={filter.id}
              type={filter.type}
            />
          </nav>
        </section>
      );
      break;
    default:
      return <section className={`${styles.filtersBlock}`}></section>;
  }
};

/**
 *
 * @param {Object} item
 * @param {Integer} index
 * @param {String} type
 * @returns {JSX.Element}
 * @constructor
 */

const DropFilter = ({
  setUpdate = (f) => f,
  item,
  index,
  type,
  categories = [],
}) => {
  const [valueSelect, setValueSelect] = useState("");

  const refSelect = useRef();

  const { createFilters } = useActions();

  const handleChange = () => {
    setValueSelect(refSelect.current.value, () => {});
  };

  useEffect(() => {
    //console.log(valueSelect)
    createFilters(valueSelect);
  }, [valueSelect]);

  return (
    <div key={index} className={`${styles.filterItem}`}>
      <h4>{item.name}</h4>

      <div className={`${styles.sameFilter}}`}>
        <select
          id={`drop_${item.id}`}
          key={`key_dropdown_upgrade_${valueSelect}`}
          ref={refSelect}
          onChange={(evt) => handleChange()}
          value={valueSelect}
        >
          {categories
            ? categories.map((cat) => {
                if (cat)
                  return (
                    <option key={`key_dropdowncat_${cat.id}`} value={cat.id}>
                      {cat.attributes.name}
                    </option>
                  );
              })
            : null}
        </select>
      </div>
    </div>
  );
};

/**
 *
 * @param {Object} item
 * @param {Integer} index
 * @param {String} type
 * @returns {JSX.Element}
 * @constructor
 */
function SelectFilter({ item, index, type }) {
  return (
    <div key={index} className={`${styles.filterItem}`}>
      <h4>{item.name}</h4>

      <div className={`${styles.sameFilter}}`}>
        {item.values.map((item, index) => {
          return (
            <div
              key={`key_select_filter${index}`}
              className={`${styles.checkRow}`}
            >
              <input
                type="checkbox"
                value={item}
                className={`${styles.checkItem}`}
              />
              <p className={`${styles.checkValue}`}>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 *
 * @param {Object} item
 * @param {Integer} index
 * @param {String} type
 * @returns {JSX.Element}
 * @constructor
 */
const OneSelectFilter = ({ item, index, type }) => {
  return (
    <div key={index} className={`${styles.filterItem}`}>
      <h4>{item.name}</h4>

      <div className={`${styles.sameFilter}}`}>
        {item.values.map((item, index) => {
          return (
            <div
              key={`key_oneselect_filter${index}`}
              className={`${styles.checkRow}`}
            >
              <input
                type="checkbox"
                value={item}
                className={`${styles.checkItem}`}
              />
              <p className={`${styles.checkValue}`}>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 *
 * @param {Object} item
 * @param {Integer} index
 * @param {String} type
 * @returns {JSX.Element}
 * @constructor
 */
const RangeFilter = ({ item, index, type }) => {
  return (
    <div key={index} className={`${styles.filterItem}`}>
      <h4>{item.name}</h4>

      <div className={`${styles.sameFilter}}`}>
        {item.values.map((item, index) => {
          return (
            <div className={`${styles.rangeRow}`}>
              <input
                type="checkbox"
                value={item}
                className={`${styles.checkItem}`}
              />
              <p className={`${styles.checkValue}`}>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
