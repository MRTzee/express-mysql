import { NextFunction, Request, Response } from "express";
import db from "../../config/db";
import { Expense } from "./types";

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const validateQuery = `select * from expenses where id = ${id}`;
    const deleteQuery = `delete from expenses where id = ${id}`;
    const [rows] = await db.query<Expense[]>(validateQuery);
    if (!rows.length) {
      throw new Error("id not found");
    }
    await db.query<Expense[]>(deleteQuery);
    res.status(200).send("delete data success");
  } catch (error) {
    next(error);
  }
};
