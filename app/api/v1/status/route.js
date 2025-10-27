import database from "infra/database.js"

export async function GET(request) {
  const datBaseName = process.env.POSTGRES_DB;
  const updateAt = new Date().toISOString();
  const dbVersion = (await database.query(
    "SELECT Version();")).rows[0].version;
  const dbMaxConnect = (await database.query(
    "SHOW max_connections;")).rows[0].max_connections;
  const dbUsedConnections = (await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [datBaseName],
  })).rows[0].count;
  console.log(dbUsedConnections)
  return new Response(
    JSON.stringify({ update_at: updateAt, db_version: dbVersion, db_max_connections: dbMaxConnect, db_used_connections: dbUsedConnections}),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}