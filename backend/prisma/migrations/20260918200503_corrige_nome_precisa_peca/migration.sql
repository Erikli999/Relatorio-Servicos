/*
  Warnings:

  - You are about to drop the column `preciaPeca` on the `Pendencia` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pendencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "precisaPeca" BOOLEAN NOT NULL DEFAULT false,
    "peca" TEXT,
    "pecaDisponivel" BOOLEAN,
    "relatorioId" INTEGER NOT NULL,
    CONSTRAINT "Pendencia_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "Relatorio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pendencia" ("descricao", "id", "peca", "pecaDisponivel", "relatorioId") SELECT "descricao", "id", "peca", "pecaDisponivel", "relatorioId" FROM "Pendencia";
DROP TABLE "Pendencia";
ALTER TABLE "new_Pendencia" RENAME TO "Pendencia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
