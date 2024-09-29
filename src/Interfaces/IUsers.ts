export interface IUsers {
  id?: number;
  email: string;
  nome: string;
  perfil: string;
  telefone: string;
  idade: number;
  created_at?: Date;
  updated_at?: Date;
}