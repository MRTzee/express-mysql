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
    const { category, startDate, endDate } = req.query;
    let query = "select * from expenses";
    const whereClause: string[] = [];

    if (category) {
      whereClause.push(`category like '%${category}'`);
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
      whereClause.push(`date between '${start}' and '${end}'`);
    }

    if (whereClause.length > 0) {
      query += " where " + whereClause.join(" and");
    }

    const [rows] = await db.query<Expense[]>(query);

    res.status(200).send({ message: "success", data: rows });
  } catch (error) {
    next(error);
  }
};
