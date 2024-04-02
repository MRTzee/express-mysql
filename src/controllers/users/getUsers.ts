import { NextFunction, Request, Response } from "express";

import db from "../../config/db";
import { User } from "./types";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = "select * from users";
    const [rows] = await db.query<User[]>(query);

    res.status(200).send({ message: "success", data: rows });
  } catch (error) {
    next(error);
  }
};
