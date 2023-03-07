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
  rank: string;
  country?: string;
  status?: string;
  id?: string;
  banned?: boolean;
}

export interface AllUsers {
  users: CreateUserInterface[];
}
