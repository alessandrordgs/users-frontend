import { IUsers } from "./IUsers";

export interface IUsersResponse {
  data: IUsers[];
  meta: {
    total: number;
    previousPage: number | null;
    nextPage: number | null;
    totalPages: number;
    link: string
  }
}