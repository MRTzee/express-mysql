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
    const query = `delete from expenses where id = ${id}`;
    await db.query<Expense[]>(query);
    res.status(200).send("delete data success");
  } catch (error) {
    next(error);
  }
};
