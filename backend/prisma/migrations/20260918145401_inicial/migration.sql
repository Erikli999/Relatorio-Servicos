-- CreateTable
CREATE TABLE "Relatorio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "relatorioId" INTEGER NOT NULL,
    CONSTRAINT "Servico_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "Relatorio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pendencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "preciaPeca" BOOLEAN NOT NULL DEFAULT false,
    "peca" TEXT,
    "pecaDisponivel" BOOLEAN,
    "relatorioId" INTEGER NOT NULL,
    CONSTRAINT "Pendencia_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "Relatorio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
