import { Status, SORT_BY, StatusValue } from "interfaces";

export const QueryDef = {
  LIMIT: 10,
  SORT_BY: SORT_BY.latest,
  STATUS: Status.active,
};

export const sortOptions = [
  {
    label: "Alphabet",
    value: SORT_BY.alphabet,
  },
  {
    label: "Latest first",
    value: SORT_BY.latest,
  },
  {
    label: "Oldest first",
    value: SORT_BY.oldest,
  },
];

export const pointStatuses = [
  {
    label: Status.active,
    value: StatusValue.active,
  },
  {
    label: Status.inactive,
    value: StatusValue.inactive,
  },
  {
    label: Status.all,
    value: StatusValue.all,
  },
];
