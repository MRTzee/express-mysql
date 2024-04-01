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
    const keysArray = Object.keys(req.body);

    let query = `update expenses set`;
    keysArray.forEach((key, index) => {
      query +=
        " " +
        key +
        (typeof req.body[key] === "string"
          ? `='${req.body[key]}'`
          : `=${req.body[key]}`);

      if (index !== keysArray.length - 1) {
        query += ",";
      }
    });
    query += " " + `where id=${id}`;
    // console.log(query);

    await db.query<Expense[]>(query);

    const getQuery = "select * from expenses";
    const [rows] = await db.query<Expense[]>(getQuery);
    res.status(200).send({ message: "success", data: rows });
  } catch (error) {
    next(error);
  }
};
