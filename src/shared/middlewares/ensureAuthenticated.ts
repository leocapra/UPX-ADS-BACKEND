import { AppError } from "@/errors/AppError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Defina a interface JwtPayload diretamente aqui
interface JwtPayload {
  id: number;
  role_id: number;
  sub: string;
}

// Extensão local da interface Request, para este middleware apenas
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role_id: number;
  };
}

export function ensureAuthenticated(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token JWT ausente", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as JwtPayload; // Agora a interface JwtPayload é reconhecida

    // Atribuindo as informações do usuário à request
    request.user = {
      id: Number(decoded.sub), // Garantir que o id seja um número
      role_id: decoded.role_id,
    };

    return next();
  } catch (err) {
    throw new AppError("Token JWT inválido", 401);
  }
}
