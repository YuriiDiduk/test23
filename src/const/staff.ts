import { Specialty } from "interfaces";

export const specialtyOptions = [
  Specialty.admin,
  Specialty.doctor,
  Specialty.nurse,
  Specialty.surgeon,
];

export const staffColumns = [
  { dataKey: "avatar", label: "", width: 80, editable: true, shrink: true },
  {
    dataKey: "fullName",
    label: "Name",
    width: 200,
    maxWidthText: 160,
    editable: true,
  },
  {
    dataKey: "email",
    label: "Email",
    width: 260,
    maxWidthText: 220,
    editable: false,
  },
  { dataKey: "phone", label: "Phone", width: 190, editable: true },
  { dataKey: "specialty", label: "Specialty", width: 130, editable: true },
  { dataKey: "edit", label: "", width: 100, editable: true, shrink: true },
];

export const defaultValuesStaff = {
  avatar: "",
  fullName: "",
  phone: "",
  specialty: "",
};
