import { EmailListColumn } from "@/app/components/email-list-column"
import { FolderColumn } from "@/app/components/folder-columns"

const EmailLayout = ({
 children,
 params
}: {
 children: React.ReactNode
 params: { name: string; id: string }
}) => {
 return (
  <div className="grid grid-cols-6 gap-2 h-screen p-2">
   <FolderColumn />
   <EmailListColumn folderName={params.name} searchParams={{
    q: undefined,
    id: undefined
   }} />
   {children}
  </div>
 )
}

export default EmailLayout