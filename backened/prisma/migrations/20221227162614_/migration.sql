-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatroom" (
    "room" VARCHAR(255) NOT NULL,
    "chatroomId" SERIAL NOT NULL,

    CONSTRAINT "chatroom_pkey" PRIMARY KEY ("chatroomId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_id_fkey" FOREIGN KEY ("id") REFERENCES "chatroom"("chatroomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
