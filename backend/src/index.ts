import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import path from "path";
import { AppDataSource } from "./data-source";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import { seedDemoProducts } from "./initDemo";

dotenv.config();

const PORT = process.env.PORT || 8080;
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

// Rotas API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Serve frontend estático
app.use(express.static(path.join(__dirname, "../../frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});


// Inicializa DB
AppDataSource.initialize()
  .then(async () => {
    await seedDemoProducts();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Failed to initialize data source:", err);
    process.exit(1);
  });
