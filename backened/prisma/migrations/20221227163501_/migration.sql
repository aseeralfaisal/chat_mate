/*
  Warnings:

  - Added the required column `messageId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_username_fkey";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "messageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "chatroom"("room") ON DELETE RESTRICT ON UPDATE CASCADE;
