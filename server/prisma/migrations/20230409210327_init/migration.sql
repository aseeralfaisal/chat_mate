/*
  Warnings:

  - You are about to drop the column `reciever` on the `lastMessage` table. All the data in the column will be lost.
  - Added the required column `receiver` to the `lastMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lastMessage" DROP COLUMN "reciever",
ADD COLUMN     "receiver" VARCHAR(255) NOT NULL;
