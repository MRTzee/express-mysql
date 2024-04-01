import { RowDataPacket } from "mysql2";

export interface Expense extends RowDataPacket {
  id: number;
  name: string;
  category: string;
  nominal: number;
  date: Date;
}
