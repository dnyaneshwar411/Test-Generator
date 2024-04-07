import express from "express";
import {
  testCreate,
  getTests,
  gettestByid,
} from "../controller/test_controller.js";

const router = express.Router();

router.get("/getTests", getTests);
router.get("/gettest/:testId", gettestByid);
router.post("/create", testCreate);

export default router;
