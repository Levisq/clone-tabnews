import database from "../../../../infra/database.js"

export async function GET() {
  const result = await database.query('SELECT 1 + 1 as sum;');
  console.log(result.rows);
  return new Response(JSON.stringify({ status: "ok", message: "TO AQUI" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}