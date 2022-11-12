export interface IProfile {
  fullName: string;
  phone: string;
  email: string;
  roles: Roles[];
  uuid: string;
  photo: {
    uuid: string;
  };
}

export interface IPhoto {
  file: File | string | null;
}

export interface IUpdateProfile {
  data: {
    fullName: string;
  };
  id: string;
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
}

export enum Roles {
  superAdmin = "ROLE_SUPER_ADMIN",
  admin = "ROLE_ADMIN",
  doctor = "ROLE_USER",
  nurse = "ROLE_NURSE",
  surgeon = "ROLE_SURGEON",
}
