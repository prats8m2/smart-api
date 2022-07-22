import { Router } from "express";
import UserController from "../controllers/user/user.controller";

const router = Router();
const userController = new UserController();

router.get("/status", (req, res) => {
  res.send("Server running successfully");
});

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/view/:id", userController.view);

export default router;
