import express from "express";
import { getLogin } from "../controllers/users/getLogin";
import { createUser } from "../controllers/users/createUser";
import { getUsers } from "../controllers/users/getUsers";

const router = express.Router();

router.post("/login", getLogin);
router.get("/users", getUsers);
router.post("/register", createUser);

export default router;
