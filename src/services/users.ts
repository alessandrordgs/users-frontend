import { api } from "../api/api";
import endpoints from "../endpoints";
import { IUsers } from "../Interfaces/IUsers";
import { IUsersResponse } from "../Interfaces/IUsersResponse";


export const getUsers = async (page: number) => await api.get<IUsersResponse>(endpoints.user, {
  params: {
    page
  }
})
export const createUsers = async (data: IUsers) => await api.post(endpoints.user, data)
export const updateUsers = async (id: number, data: IUsers) => await api.put(`${endpoints.user}/${id}`, data)
export const deleteUsers = async (id: number) => await api.delete(`${endpoints.user}/${id}`)
export const getUserById = async (id : number) => await api.get<IUsers>(`${endpoints.user}/${id}`)