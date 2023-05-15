/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `lastMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lastMessage_username_key" ON "lastMessage"("username");
