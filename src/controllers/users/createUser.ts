import { NextFunction, Request, Response } from "express";
import db from "../../config/db";
import { User } from "../users/types";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const query = `insert into users (username, email, password) values ('${username}', '${email}', '${password}')`;
    await db.query<User[]>(query);
    res.status(200).send("create username success");
  } catch (error) {
    next(error);
  }
};
