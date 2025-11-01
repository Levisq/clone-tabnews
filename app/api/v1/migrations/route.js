import migrationsRunner from 'node-pg-migrate'
import { join } from "node:path"
import database from "infra/database.js"
//sistemas operacionais diferentes podem divergir no path usamos o join para unificar este caminho

const dbClient = await database.getNewClient();

const defaultMigrationOptions = {
  dbClient: dbClient,
  databaseUrl: process.env.DATABASE_URL,
  dryRun: true,
  dir: join('infra', 'migrations'),
  direction: 'up',
  verbose: true,
  migrationsTable: 'pgmigrations'
}

export async function GET() {
  const dbClient = await database.getNewClient();
  const migrations = await migrationsRunner({
    ...defaultMigrationOptions,
    dbClient,
  });
  return new Response(JSON.stringify(migrations), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST() {
  const dbClient = await database.getNewClient();
  const migrations = await migrationsRunner({
    ...defaultMigrationOptions,
    dbClient,
    dryRun: false,
  });

  const statusCode = migrations.length > 0 ? 201 : 200;
  return new Response(JSON.stringify(migrations), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
}

