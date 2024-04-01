import { NextFunction, Request, Response } from "express";
import db from "../../config/db";
import { Expense } from "./types";

export const getExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const query = `select * from expenses where id = ${id}`;
    const [rows] = await db.query<Expense[]>(query);
    res.status(200).send({ message: "success", data: rows });
  } catch (error) {
    next(error);
  }
};
