/*
  Warnings:

  - You are about to drop the `lastMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lastMessage" DROP CONSTRAINT "lastMessage_username_fkey";

-- DropTable
DROP TABLE "lastMessage";
