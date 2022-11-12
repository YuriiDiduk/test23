import { Status, Religion } from "interfaces";

export const religionOptions = [
  Religion.christians,
  Religion.muslims,
  Religion.irreligions,
  Religion.hindus,
  Religion.buddhists
];

export const patientsColumns = [
  { dataKey: "avatar", label: "", width: 80, editable: false, shrink: true },
  {
    dataKey: "fullName",
    label: "Name",
    width: 200,
    maxWidthText: 160,
    editable: true,
  },
  { dataKey: "age", label: "Age", width: 60, editable: false },
  {
    dataKey: "dateOfBirth",
    label: "Date of Birth",
    width: 165,
    editable: true,
  },
  {
    dataKey: "email",
    label: "Email",
    width: 260,
    maxWidthText: 220,
    editable: false,
  },
  { dataKey: "phone", label: "Phone", width: 160, editable: true },
  {
    dataKey: "ethnicity",
    label: "Ethnicity",
    width: 200,
    maxWidthText: 160,
    editable: true,
  },
  { dataKey: "religion", label: "Religion", width: 160, editable: true },
  { dataKey: "edit", label: "", width: 100, editable: true, shrink: true },
];

export const defaultValuesPatients = {
  fullName: "",
  phone: "",
  ethnicity: "",
  religion: "",
  dateOfBirth: null,
};

export const filterPatientsOptions = [Status.active, Status.inactive, Status.all];
