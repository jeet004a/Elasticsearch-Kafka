import { Pool } from "pg";
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

pool.on("connect", () => {
  console.log("connected to the db");
});

// module.exports = {
//   query: (text: any, params: any) => pool.query(text, params),
// };

export const db={query: (text: any, params: any) => pool.query(text, params)}