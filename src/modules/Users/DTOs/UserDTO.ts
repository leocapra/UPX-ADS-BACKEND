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

// src/modules/Users/DTOs/UserProfileDTO.ts
export interface IUserProfileDTO {
  id: number;
  nome: string;
  email: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  // Poderia incluir campos calculados como:
  // account_age_days?: number;
}
