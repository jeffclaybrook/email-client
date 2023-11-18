import Link from "next/link"
import { formatEmailString } from "@/app/db/utils"
import { getEmailsForFolder } from "@/app/db/queries"

export const EmailListColumn = async ({
 folderName,
 searchParams
}: {
 folderName: string;
 searchParams: { q?: string; id?: string }
}) => {
 const emails = await getEmailsForFolder(folderName, searchParams.q)

 const createUrl = (id: number) => {
  const baseUrl = `/f/${folderName.toLowerCase()}`
  const params = new URLSearchParams(searchParams)
  params.set("id", id.toString())
  return `${baseUrl}?${params.toString()}`
 }

 return (
  <div className="border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-2 col-span-2">
   <ul className="divide-y divide-gray-200 dark:divide-gray-800">
    {emails.map((email) => (
     <li
      key={email.id}
      className="w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex justify-between items-start rounded-lg"
     >
      <Link href={createUrl(email.id)} className="w-full">
       <div className="w-full truncate">
        <h2 className="text-base font-bold">
         {formatEmailString(email)}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
         {email.subject}
        </p>
        <p className="text-sm truncate overflow-ellipsis">
         {email.body}
        </p>
       </div>
       <time className="text-xs text-gray-500 dark:text-gray-400 self-center flex justify-end">
        {new Date(email.sent_date).toLocaleDateString()}
       </time>
      </Link>
     </li>
    ))}
   </ul>
  </div>
 )
}