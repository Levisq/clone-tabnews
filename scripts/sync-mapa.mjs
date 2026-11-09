// Compila o Mapa Digital de Riscos (projeto Vite) e copia o build para
// public/mapaderisco, onde o Next serve em /mapaderisco.
//
// Uso: npm run mapa:sync
// Para apontar para outra pasta do MapaRisco: MAPA_DIR="C:\caminho\MapaRisco" npm run mapa:sync
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mapaDir =
  process.env.MAPA_DIR ||
  path.join(
    os.homedir(),
    "OneDrive",
    "Área de Trabalho",
    "UFCG",
    "Estudos diversos",
    "estagio",
    "MapaRisco",
  );
const target = path.join(root, "public", "mapaderisco");

if (!existsSync(path.join(mapaDir, "package.json"))) {
  console.error(`MapaRisco não encontrado em: ${mapaDir}`);
  console.error('Defina MAPA_DIR com o caminho da pasta do MapaRisco.');
  process.exit(1);
}

console.log(`> Compilando MapaRisco em ${mapaDir}`);
// npm run build usa o vite já instalado em MapaRisco/node_modules (não precisa de pnpm).
const build = spawnSync("npm", ["run", "build"], { cwd: mapaDir, stdio: "inherit", shell: true });
if (build.status !== 0) {
  console.error("Falha no build do MapaRisco.");
  process.exit(build.status ?? 1);
}

rmSync(target, { recursive: true, force: true });
// Cópia manual: o fs.cpSync falhava em silêncio com o acento de "Área de Trabalho".
function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else copyFileSync(src, dst);
  }
}
copyDir(path.join(mapaDir, "dist"), target);
if (!existsSync(path.join(target, "index.html"))) {
  console.error(`A cópia para ${target} falhou (index.html não encontrado).`);
  process.exit(1);
}
console.log(`> Build copiado para ${path.relative(root, target)}`);
console.log("> Rode `npm run dev` e abra http://localhost:3000/mapaderisco");
