/*
  Warnings:

  - You are about to drop the column `chatroomId` on the `chatroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chatroom" DROP CONSTRAINT "chatroom_chatroomId_fkey";

-- AlterTable
ALTER TABLE "chatroom" DROP COLUMN "chatroomId";
