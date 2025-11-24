import { Router } from "express";
import * as lutaController from "../controllers/luta_controller";

const router = Router();

router.get("/", lutaController.getAll);
router.get("/:id", lutaController.getOne);
router.post("/", lutaController.create);
router.put("/:id", lutaController.update);
router.delete("/:id", lutaController.remove);

export default router;