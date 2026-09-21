/*
  Warnings:

  - Added the required column `cliente` to the `Relatorio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relatorio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente" TEXT NOT NULL
);
INSERT INTO "new_Relatorio" ("data", "id") SELECT "data", "id" FROM "Relatorio";
DROP TABLE "Relatorio";
ALTER TABLE "new_Relatorio" RENAME TO "Relatorio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
