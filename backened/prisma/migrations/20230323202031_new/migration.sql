/*
  Warnings:

  - Changed the type of `messageId` on the `message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_messageId_fkey";

-- DropIndex
DROP INDEX "chatroom_room_key";

-- AlterTable
ALTER TABLE "chatroom" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "chatroom_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "message" DROP COLUMN "messageId",
ADD COLUMN     "messageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
