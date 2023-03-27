/*
  Warnings:

  - The primary key for the `chatroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatroomId` on the `chatroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room]` on the table `chatroom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "chatroom" DROP CONSTRAINT "chatroom_chatroomId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_id_fkey";

-- AlterTable
ALTER TABLE "chatroom" DROP CONSTRAINT "chatroom_pkey",
DROP COLUMN "chatroomId";

-- CreateIndex
CREATE UNIQUE INDEX "chatroom_room_key" ON "chatroom"("room");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_username_fkey" FOREIGN KEY ("username") REFERENCES "chatroom"("room") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_room_fkey" FOREIGN KEY ("room") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
