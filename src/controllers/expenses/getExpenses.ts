import { NextFunction, Request, Response } from "express";

import db from "../../config/db";
import { Expense } from "./types";
import { format } from "date-fns";

export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, category } = req.query;
    if (category) {
      const query = `select * from expenses where category like '%${category}%'`;
      const [rows] = await db.query<Expense[]>(query);
      res.status(200).send({ message: "success", data: rows });
    }

    if ((startDate && !endDate) || (!startDate && endDate)) {
      throw new Error(`start date and end date cannot be empty`);
    }

    if (startDate && endDate) {
      const start = format(
        new Date(startDate as string),
        "yyyy-MM-dd HH:mm:ss"
      );
      const end = format(new Date(endDate as string), "yyyy-MM-dd HH:mm:ss");
      const query = `select * from expenses where date between '${start}' and '${end}'`;
      const [rows] = await db.query<Expense[]>(query);
      res.status(200).send({ message: "success", data: rows });
    }
    const query = "select * from expenses";
    const [rows] = await db.query<Expense[]>(query);

    res.status(200).send({ message: "success", data: rows });
  } catch (error) {
    next(error);
  }
};
