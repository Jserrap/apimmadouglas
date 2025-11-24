import express from "express";
import lutadorRouter from "./routes/lutador_routes";
import lutaRouter from "./routes/luta_routes";
import cardRouter from "./routes/card_routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();

// ----------------------
// 🔥 CORS DEVE VIR AQUI
// ----------------------
import cors from "cors";

const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: FRONT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Preflight seguro (sem usar "*", que quebra path-to-regexp)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", FRONT_ORIGIN);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    return res.sendStatus(204);
  }
  next();
});

// -------------------------

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API MMA rodando! Veja a documentação em /api-docs");
});

// SUAS ROTAS NORMALMENTE
app.use("/api/lutadores", lutadorRouter);
app.use("/api/lutas", lutaRouter);
app.use("/api/cards", cardRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
