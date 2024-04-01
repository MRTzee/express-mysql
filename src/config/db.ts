import mysql from "mysql2/promise";

export default mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1Tm4@popon641",
  database: "intro_mysql",
});
