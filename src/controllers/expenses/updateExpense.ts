import { NextFunction, Request, Response } from "express";

import db from "../../config/db";
import { Expense } from "./types";

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const validateQuery = `select * from expenses where id = ${id}`;
    const [rows] = await db.query<Expense[]>(validateQuery);

    if (!rows.length) {
      throw new Error("id not found");
    }

    if (!Object.keys(req.body).length) {
      throw new Error("No field to update");
    }

    let query = `update expenses set `;
    Object.keys(req.body).forEach((key, index) => {
      query += `${key} = '${req.body[key]}'`;
      if (index !== Object.keys(req.body).length - 1) {
        query += `, `;
      }
    });

    query += ` where id = ${id}`;
    await db.query<Expense[]>(query);

    res.status(200).send("update expense success");
  } catch (error) {
    next(error);
  }
};
