-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Todo_description_key" ON "Todo"("description");
