import express from "express";
import {
  testCreate,
  getTests,
  gettestByid,
  updateTest,
  deleteTest
} from "../controller/test_controller.js";

const router = express.Router();

router.get("/getTests", getTests);
router.get("/gettest/:testId", gettestByid);
router.post("/create", testCreate);
router.put('/updateTest/:id',updateTest);
router.delete('/deleteTest/:id',deleteTest);

export default router;
