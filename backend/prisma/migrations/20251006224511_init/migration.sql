-- CreateTable
CREATE TABLE "Lutador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Lutador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Luta" (
    "id" SERIAL NOT NULL,
    "lutadorAId" INTEGER NOT NULL,
    "lutadorBId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "resultado" TEXT,

    CONSTRAINT "Luta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Luta" ADD CONSTRAINT "Luta_lutadorAId_fkey" FOREIGN KEY ("lutadorAId") REFERENCES "Lutador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Luta" ADD CONSTRAINT "Luta_lutadorBId_fkey" FOREIGN KEY ("lutadorBId") REFERENCES "Lutador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Luta" ADD CONSTRAINT "Luta_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
