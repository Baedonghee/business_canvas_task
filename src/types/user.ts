export interface IUser {
  name: string;
  address: string;
  memo: string;
  joinDate: string;
  job: string;
  isEmail: boolean;
}

export interface IEditUser {
  key: string;
  user: IUser;
}

export interface IUserDataType {
  key: string;
  name: string;
  memo: React.ReactNode;
  joinDate: string;
  job: string;
  isEmail: React.ReactNode;
  more: React.ReactNode;
}
