import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { client, connectDB } from "./db.ts";

// Connect to Postgres
await connectDB();

// Initialize DB table
await client.queryObject(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
  )
`);

// Insert default users if table is empty
const { rows } = await client.queryObject<{ count: number }>(
  "SELECT COUNT(*) as count FROM users"
);

if (rows[0].count === 0) {
  await client.queryObject(`
    INSERT INTO users (name) VALUES
    ('Alice'),
    ('Bob'),
    ('Charlie')
  `);
  console.log("Inserted default users: Alice, Bob, Charlie");
}

console.log("Database ready.");

serve(async (req: Request) => {
  const url = new URL(req.url);

  // GET /users → returns all users
  if (url.pathname === "/users" && req.method === "GET") {
    const result = await client.queryObject("SELECT * FROM users");
    return new Response(JSON.stringify(result.rows), {
      headers: { "content-type": "application/json" },
    });
  }

  // POST /users → create user { "name": "John" }
  if (url.pathname === "/users" && req.method === "POST") {
    const body = await req.json();

    if (!body?.name) {
      return new Response("Missing field: name", { status: 400 });
    }

    await client.queryObject("INSERT INTO users (name) VALUES ($1)", [
      body.name,
    ]);

    return new Response("User created", { status: 201 });
  }

  return new Response("Not found", { status: 404 });
}, { port: 8000 });

console.log("Server running: http://localhost:8000");
