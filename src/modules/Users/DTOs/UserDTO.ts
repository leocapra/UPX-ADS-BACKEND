export interface ICreateUserDTO {
  nome: string;
  sobre_nome: string;
  email: string;
  senha: string;
  cpf_cnpj: string;
  telefone?: string;
  idade?: number;
  role_id: number;
  universidade?: string;
  curso?: string;
  placa?: string;
  veiculo?: string;
  cor_veiculo?: string;
  ano_veiculo?: number;
  numero_cnh?: string;
}

export interface IAuthenticateUserDTO {
  email: string;
  senha: string;
  role: number;
}
