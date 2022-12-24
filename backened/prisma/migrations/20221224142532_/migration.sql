-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_userId_fkey";

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_room_fkey" FOREIGN KEY ("room") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
