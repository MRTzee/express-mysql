import { NextFunction, Request, Response } from "express";
import db from "../../config/db";
import { User } from "../users/types";

export const getLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const query = `select * from where email = '${email}' and password = '${password}'`;
    const [rows] = await db.query<User[]>(query);
    // if (rows.length === 1) return res.status(200).send("login success");
    // else return res.status(401).send("Invalid email or password");
    console.log(rows);
  } catch (error) {
    next(error);
  }
};
