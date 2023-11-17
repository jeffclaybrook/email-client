import { EmailInputCombobox } from "@/app/components/email-combobox"
import { sendEmail } from "@/app/db/actions"
import { getAllEmailAddresses } from "@/app/db/queries"
import { EmailBody } from "./email-body"
import SendIcon from "@/app/icons/send"

const Page = async () => {
 const userEmails = await getAllEmailAddresses()

 return (
  <form
   action={sendEmail}
   className="col-span-3 flex flex-col w-12/20"
  >
   <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 p-2 sticky top-0  h-[60px]">
    <button
     type="submit"
     className="flex ml-auto hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-3 py-2"
    >
     <SendIcon />
    </button>
   </div>
   <div className="p-1 space-y-1 flex-grow overflow-y-auto text-sm">
    <div className="relative flex flex-col justify-center space-y-2">
     <EmailInputCombobox userEmails={userEmails} />
    </div>
    <hr className="border-t border-gray-200 dark:border-gray-800" />
    <div className="relative flex flex-col space-y-2">
     <label className="absolute left-3 top-4 text-gray-500 dark:text-gray-400">
      From:
     </label>
     <p className="pl-14 border-none bg-white dark:bg-gray-950 text-white px-3 py-2 focus:outline-none">
      your@email.com
     </p>
    </div>
    <hr className="border-t border-gray-200 dark:border-gray-800" />
    <div className="relative flex flex-col space-y-2">
     <label
      htmlFor="subject"
      className="absolute left-3 top-4 text-gray-500 dark:text-gray-400"
     >
      Subject:
     </label>
     <input
      type="text"
      id="subject"
      name="subject"
      required
      className="pl-[72px] border-none bg-white dark:bg-gray-950 text-black dark:text-white px-3 py-2 focus:outline-none"
     />
    </div>
    <hr className="border-t border-gray-200 dark:border-gray-800" />
    <EmailBody />
   </div>
  </form>
 )
}

export default Page