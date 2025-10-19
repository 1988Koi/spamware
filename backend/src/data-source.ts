import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,   // ⚡️ cria as tabelas automaticamente
  logging: false,
  entities: [Product, User],
});
