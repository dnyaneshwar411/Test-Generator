import express from "express";
const router = express();
import DBConnection from "./database/dbConnection.js";
import authRoutes from "./router/auth_routes.js";
import test from "./router/tests_routes.js"
import cors from "cors";
import getusers from '../backend/router/user_routes.js'

router.use(express.json())
router.use(cors({
  origin: "*"
}))

router.get("/", function (req, res) {
  res.send("Hello to Test generator  Backend ");
});

router.use("/api/auth", authRoutes);
router.use("/test", test);

router.use('/getusers',getusers)

router.listen(3000, function (req, res) {
  DBConnection();
  console.log("Server started at 3000");
});
