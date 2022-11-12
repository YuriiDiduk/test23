import { SORT_BY } from 'interfaces';
import * as React from 'react';
import { DropdownSort } from '../Dropdown/DropdownSort';
import s from "./Sorting.module.scss";

type Props = {
  sortList?: SORT_BY[];
  sortDefault?: SORT_BY;
};

export const Sorting = ({ sortList, sortDefault }: Props) => {
  return (
    <div className={s.sorting}>
      <span className={s.sortingText}>Sort by</span>
      <div className={s.sortContainer}>
        <DropdownSort sortValuesList={sortList} sortDefault={sortDefault} />
      </div>
    </div>
  );
};