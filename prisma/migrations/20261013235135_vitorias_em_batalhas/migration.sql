-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokeId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "favorito" BOOLEAN NOT NULL DEFAULT false,
    "shiny" BOOLEAN NOT NULL DEFAULT false,
    "vitorias" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Pokemon" ("favorito", "id", "imagem", "nome", "pokeId", "shiny", "tipo") SELECT "favorito", "id", "imagem", "nome", "pokeId", "shiny", "tipo" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
