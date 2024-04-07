import express from "express";
import { getusers } from "../controller/user_controller.js";

const router = express.Router();

router.get("/alluser", getusers);

export default router;
