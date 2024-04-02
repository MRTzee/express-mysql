import { NextFunction, Request, Response } from "express";
import db from "../../config/db";
import { Expense } from "./types";
import { format } from "date-fns";

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // cara manual
    // req.body.date = new Date(req.body.date)
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace("T", " ");
    const { name, category, nominal, date } = req.body;
    const formatDate = format(new Date(date), "yyyy-MM-dd HH:mm:ss");
    const query = `insert into expenses (name, category, nominal, date) values ('${name}', '${category}', ${nominal}, '${formatDate}')`;
    await db.query<Expense[]>(query);
    res.status(200).send("create data success");
  } catch (error) {
    next(error);
  }
};
