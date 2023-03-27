/*
  Warnings:

  - You are about to drop the column `text` on the `message` table. All the data in the column will be lost.
  - Added the required column `message` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatroom" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "chatroom_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "message" DROP COLUMN "text",
ADD COLUMN     "message" VARCHAR(255) NOT NULL;
