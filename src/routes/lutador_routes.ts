import { Router } from "express";
import * as lutadorController from "../controllers/lutador_controller";

const router = Router();

router.get("/", lutadorController.getAll);
router.get("/:id", lutadorController.getOne);
router.post("/", lutadorController.create);
router.put("/:id", lutadorController.update);
router.delete("/:id", lutadorController.remove);

export default router;