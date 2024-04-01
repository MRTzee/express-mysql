import express from "express";
import { getExpenses } from "../controllers/expenses/getExpenses";
import { getExpense } from "../controllers/expenses/getExpense";
import { createExpense } from "../controllers/expenses/createExpense";
import { deleteExpense } from "../controllers/expenses/deteleExpense";
import { updateExpense } from "../controllers/expenses/updateExpense";

const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", createExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
