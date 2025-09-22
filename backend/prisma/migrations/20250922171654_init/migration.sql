-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "alias" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_address_key" ON "favorites"("address");
