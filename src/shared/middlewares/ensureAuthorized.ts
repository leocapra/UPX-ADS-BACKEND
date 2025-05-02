import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

// Tipagem local para garantir que `request.user` esteja disponível
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role_id: number;
  };
}

export function ensureAuthorized(roles: number[]) {
  return (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    if (!request.user) {
      throw new AppError("Usuário não autenticado", 401);
    }

    if (!roles.includes(request.user.role_id)) {
      throw new AppError("Acesso não autorizado", 403);
    }

    return next();
  };
}
