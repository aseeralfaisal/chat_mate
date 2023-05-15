-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(555) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatroom" (
    "room" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "lastMessage" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,

    CONSTRAINT "lastMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chatroom_room_key" ON "chatroom"("room");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "chatroom"("room") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lastMessage" ADD CONSTRAINT "lastMessage_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
