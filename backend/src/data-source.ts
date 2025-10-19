import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.TYPEORM_DATABASE || ":memory:",
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
  logging: false,
  entities: [User, Product]
});
