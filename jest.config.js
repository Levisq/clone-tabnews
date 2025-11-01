//Definimos comportamentos do Jest. podemos tambném importar uma parte do next.js
require("dotenv").config({ path: "./.env.development" });
const nextJest = require("next/jest");
const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

nextJest();

module.exports = jestConfig;