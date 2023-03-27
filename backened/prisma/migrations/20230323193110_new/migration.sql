/*
  Warnings:

  - The primary key for the `chatroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `chatroom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chatroom" DROP CONSTRAINT "chatroom_pkey",
DROP COLUMN "id";
