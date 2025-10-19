import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

export async function listProducts(req: Request, res: Response) {
  const repo = AppDataSource.getRepository(Product);
  const products = await repo.find();
  return res.json(products);
}

export async function createProduct(req: Request, res: Response) {
  const { name, price } = req.body;
  if (!name || price === undefined) return res.status(400).json({ message: "name and price required" });

  const repo = AppDataSource.getRepository(Product);
  const prod = repo.create({ name, price: Number(price) });
  await repo.save(prod);
  return res.status(201).json(prod);
}
