export const faqColumns = [
  {
    dataKey: "titleIcon",
    label: "",
    width: 43,
    widthMobile: 23,
    editable: false,
    className: "faqTitleIcon",
  },
  {
    dataKey: "title",
    label: "Title",
    width: 350,
    widthMobile: 200,
    editable: true,
    className: "faqTitle",
  },
  {
    dataKey: "body",
    label: "Answer",
    style: { flex: "1" },
    editable: true,
    className: "faqBody",
  },
  {
    dataKey: "edit",
    label: "",
    width: 100,
    editable: true,
    shrink: true,
    className: "faqEdit",
  },
];

export const defaultValuesFaq = {
  title: "",
  body: "",
}
