import express from "express";
import {loginUser, signupUser,logoutUser } from "../controller/auth_controller.js";

const router = express.Router();

router.get("/get", (req, res) => {
  res.send("loguinm");
});

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);



export default router;
