// src/modules/corridas/dtos/ICreateCorridaDTO.ts

export interface ICreateCorridaDTO {
  client_id: number;
  driver_id?: number;
  rating?: number;
  active?: boolean;
  accept?: boolean;
  origem: {
    latitude: number;
    longitude: number;
  };
  destino: {
    latitude: number;
    longitude: number;
    nome: string;
  };
}
