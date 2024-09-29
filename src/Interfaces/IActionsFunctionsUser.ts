import { AxiosResponse } from "axios";
import { IUsers } from "./IUsers";

export interface IActions {
  createUser: (data: IUsers) => Promise<AxiosResponse<IUsers>>;
  viewUser: (id: number, data:IUsers) => Promise<AxiosResponse<IUsers>>;
  updateUser: (id: number, data: IUsers) => Promise<AxiosResponse<IUsers>>;
}