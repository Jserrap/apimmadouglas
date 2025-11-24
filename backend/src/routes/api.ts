import { Router } from "express";
import cardRoutes from "./card_routes";
import lutaRoutes from "./luta_routes";
import lutadorRoutes from "./lutador_routes";

const router = Router();

// cada rota será acessível via:
// /api/cards
// /api/lutas
// /api/lutadores
router.use("/cards", cardRoutes);
router.use("/lutas", lutaRoutes);
router.use("/lutadores", lutadorRoutes);

export default router;
