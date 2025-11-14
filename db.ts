import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

// Load .env automatically (optional)
import "https://deno.land/std@0.224.0/dotenv/load.ts";

// Recommended: Keep credentials in env variables
const client = new Client({
  hostname: Deno.env.get("PG_HOST") ?? "localhost",
  user: Deno.env.get("PG_USER") ?? "postgres",
  password: Deno.env.get("PG_PASSWORD") ?? "postgres",
  database: Deno.env.get("PG_DATABASE") ?? "mydb",
  port: +(Deno.env.get("PG_PORT") ?? "5432"),
});

export async function connectDB() {
  await client.connect();
}

export { client };
