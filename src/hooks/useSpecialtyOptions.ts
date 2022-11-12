import { specialtyOptions } from "const";
import { Roles } from "interfaces/profile";
import { Specialty } from "interfaces";
import { useEffect } from "react";
import { UseFormResetField } from "react-hook-form";
import { usePrevious } from "./usePrevious";

export const useSpecialtyOptions = (
  roles: string[],
  resetField: UseFormResetField<{ specialty: Specialty }>
) => {
  const prevRoles = usePrevious(roles);

  const options =
    roles[0] === Roles.admin
      ? specialtyOptions.filter((item) => item !== Specialty.admin)
      : specialtyOptions;

  useEffect(() => {
    if (
      (!prevRoles && roles.length) ||
      (prevRoles?.length && prevRoles[0] !== roles[0])
    ) {
      resetField("specialty", { defaultValue: options[0] });
    }
  }, [roles]);

  return { options };
};
