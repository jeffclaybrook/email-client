"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { db } from "@vercel/postgres"
import { toTitleCase } from "./utils"

const schema = z.object({
 subject: z.string(),
 email: z.string().email(),
 body: z.string()
})

export const sendEmail = async (
 formData: FormData
) => {
 const parsed = schema.parse({
  subject: formData.get("subject"),
  email: formData.get("email"),
  body: formData.get("body")
 })

 const senderId = 1
 const client = await db.connect()
 let newEmailId

 try {
  await client.query("BEGIN")
  let recipientResult = await client.sql`
   SELECT id FROM users WHERE email=${parsed.email}
  `
  let recipientId

  if (recipientResult.rows.length > 0) {
   recipientId = recipientResult.rows[0].id
  } else {
   recipientResult = await client.sql`
    INSERT INTO users (email) VALUES (${parsed.email}) RETURNING id
   `
   recipientId = recipientResult.rows[0].id
  }

  const emailResult = await client.sql`
   INSERT INTO emails (sender_id, recipient_id, subject, body, sent_date)
   VALUES (${senderId}, ${recipientId}, ${parsed.subject}, ${parsed.body}, NOW())
   RETURNING id
  `
  newEmailId = emailResult.rows[0].id

  const folderResult = await client.sql`
   SELECT id FROM folders WHERE name="Sent"
  `
  const sentFolderId = folderResult.rows[0].id

  await client.sql`
   INSERT INTO email_folders (email_id, folder_id)
   VALUES (${newEmailId}, ${sentFolderId})
  `
  await client.query("COMMIT")
 } catch (e) {
  await client.query("ROLLBACK")
  console.error("Transaction failed: ", e)
 } finally {
  client.release()
  revalidatePath("/", 'layout')
  redirect(`/f/sent?id=${newEmailId}`)
 }
}

export const deleteEmail = async (
 folderName: string,
 emailId: string
) => {
 const client = await db.connect()
 const originalFolderName = toTitleCase(decodeURIComponent(folderName))

 try {
  await client.query("BEGIN")
  let folderResult = await client.sql`
   SELECT id FROM users WHERE email=${originalFolderName}
  `

  const folderId = folderResult.rows[0].id

  await client.sql`
   DELETE FROM email_folders WHERE email_id=${emailId} AND folder_id=${folderId}
  `

  await client.sql`
   DELETE FROM emails WHERE id={emailId}
  `

  await client.query("COMMIT")
 } catch (e) {
  await client.query("ROLLBACK")
  console.error("Transaction failed: ", e)
 } finally {
  client.release()
  revalidatePath("/", 'layout')
  redirect(`/f/${folderName}`)
 }
}