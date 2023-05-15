/*
  Warnings:

  - Added the required column `reciever` to the `lastMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lastMessage" ADD COLUMN     "reciever" VARCHAR(255) NOT NULL;
