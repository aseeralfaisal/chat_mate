/*
  Warnings:

  - The primary key for the `chatroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `chatroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room]` on the table `chatroom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_messageId_fkey";

-- AlterTable
ALTER TABLE "chatroom" DROP CONSTRAINT "chatroom_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "messageId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "chatroom_room_key" ON "chatroom"("room");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "chatroom"("room") ON DELETE RESTRICT ON UPDATE CASCADE;
