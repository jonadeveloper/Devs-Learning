export enum Ranks {
  admin,
  teacher,
  student,
}

export interface CreateUserInterface {
  fullname: string;
  password: string;
  rpassword: string;
  email: string;
  profileImg?: string;
  courses?: { name: string }[];
  rank?: Ranks;
  country?: string;
  status?: string;
  id?: string;
  banned?: string;
}

export interface AllUsers {
  users: CreateUserInterface[];
}
