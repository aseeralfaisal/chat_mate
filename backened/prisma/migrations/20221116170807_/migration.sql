/*
  Warnings:

  - A unique constraint covering the columns `[specialId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_specialId_key" ON "Message"("specialId");
