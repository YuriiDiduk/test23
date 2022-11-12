import { SORT_BY } from "interfaces";
import { sortOptions } from "const/tables";
import { UpdateTableContext } from "context/UpdateTableContext";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";

type Props = {
  sortValuesList?: SORT_BY[];
  sortDefault?: SORT_BY;
};

export const DropdownSort = ({
  sortValuesList,
  sortDefault = SORT_BY.latest,
}: Props) => {
  const { isUpdating, changeParams, updateTable } =
    useContext(UpdateTableContext);

  const sortList = sortValuesList
    ? sortOptions.filter((option) => {
        return sortValuesList.find((value) => {
          return option.value === value;
        });
      })
    : sortOptions;

  const getLabel = () => {
    return sortList.find(({ value }) => value === selectedItem)?.label;
  };

  const [selectedItem, selectItem] = useState<SORT_BY | string>(sortDefault);
  const [sortSelectedLabel, setLabel] = useState(getLabel());

  const options = sortList.filter(({ value }) => value !== selectedItem);

  useEffect(() => {
    const label = getLabel() || "";
    setLabel(label);
  }, [selectedItem]);

  const handleClick = (value: SORT_BY | string) => {
    selectItem(value);
    changeParams({ sort: value });
    updateTable();
  };

  return (
    <div className="shadow-wrap small">
      <Dropdown
        name="sort"
        menuList={options}
        selectedItem={selectedItem}
        sortSelectedLabel={sortSelectedLabel}
        handleSortClick={handleClick}
        isUpdating={isUpdating}
      />
    </div>
  );
};
