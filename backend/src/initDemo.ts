import { AppDataSource } from "./data-source";
import { Product } from "./entities/Product";

export async function seedDemoProducts() {
  const repo = AppDataSource.getRepository(Product);
  await repo.save([
    { name: "Stick 'N' Move Spamton", price: 999 },
    { name: "Big Shot Deal Card", price: 1999 },
    { name: "Kromer Coin Pack", price: 20 }
  ]);
}
