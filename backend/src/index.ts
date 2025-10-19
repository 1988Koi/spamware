import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes"; // seu authRoutes
import { seedDemoProducts } from "./initDemo";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

// Swagger
const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: { title: "Spamton Shop API", version: "1.0.0" },
    components: {
      securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"]
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Inicializa DB e popula demo
AppDataSource.initialize()
  .then(async () => {
    await seedDemoProducts();
    app.listen(PORT, () => {
      const PORT = process.env.PORT || 4000; // pega a porta do Azure
      app.listen(PORT, () => console.log(`I'm old! and running on ${PORT}`));
    });
  })
  .catch(err => {
    console.error("Failed to initialize data source:", err);
    process.exit(1);
  });
