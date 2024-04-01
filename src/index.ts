import express, { NextFunction, Request, Response } from "express";
import expenseRouter from "./routers/expenseRouters";
const PORT = 8000;

const app = express();

app.use(express.json());

app.use("/expenses", expenseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(400).send(err);
});

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
