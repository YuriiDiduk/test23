export const messagesColumns = [
  { dataKey: "status", label: "", width: 30, shrink: true },
  { dataKey: "avatar", label: "Patient", width: 80, shrink: true },
  {
    dataKey: "fullName",
    label: "",
    width: 200,
    maxWidthText: 160,
    shrink: true,
  },
  {
    dataKey: "createdAt",
    label: "Date",
    width: 180,
    shrink: true,
  },
  { dataKey: "text", label: "Message", maxWidthText: "100%", style: { flex: "1" } },
];
