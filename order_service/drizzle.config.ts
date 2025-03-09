import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DB_URL } from './src/config';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema/*',
  dialect: 'postgresql',
//   driver:'pg',
  dbCredentials: {
    url: DB_URL as string,
  },
});


// import { defineConfig } from "drizzle-kit";
// import { DB_URL } from "./src/config";

// export default defineConfig({
//   schema: "./src/db/schema/*",
//   out: "./src/db/migrations",
//   driver: "d1-http",
//   dbCredentials: {
//     url: DB_URL as string,
//   },
//   verbose: true,
//   strict: true,
// });