// src/@types/express/index.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role_id: number;
      };
    }
  }
}

export {}; // Garante que seja tratado como um módulo
