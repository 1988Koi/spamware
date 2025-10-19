import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { listProducts, createProduct } from "../controllers/productController";

const router = Router();

router.get("/", authenticateJWT, listProducts);
router.post("/", authenticateJWT, createProduct);

export default router;
