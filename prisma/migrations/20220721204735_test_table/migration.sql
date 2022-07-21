/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `secure_notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "secure_notes_title_userId_key" ON "secure_notes"("title", "userId");
