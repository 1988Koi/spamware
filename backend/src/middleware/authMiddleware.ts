import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "BIGSHOT_SECRET";

export interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });

  const token = auth.split(" ")[1];

  try {
    const payload = jwt.verify(token, SECRET) as any;
    req.user = { id: payload.id, username: payload.username };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
