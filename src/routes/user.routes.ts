import { Router } from "express";

const router = Router();

router.get("/status", (req, res) => {
  res.send("Server running successfully");
});

export default router;
