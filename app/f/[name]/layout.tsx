import { FolderColumn } from "@/app/components/folder-columns"
import { EmailListColumn } from "@/app/components/email-list-column"

const EmailLayout = ({
 children,
 params
}: {
 children: React.ReactNode
 params: { name: string; id: string }
}) => (
 <div>
  <FolderColumn />
  <EmailListColumn folderName={params.name} searchParams={{
   q: undefined,
   id: undefined
  }} />
  {children}
 </div>
)

export default EmailLayout