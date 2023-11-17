"use client"

import { formatEmailString } from "@/app/db/utils"
import {
 Button,
 ComboBox,
 Input,
 Label,
 ListBox,
 ListBoxItem,
 Popover
} from "react-aria-components"

type UserEmail = {
 first_name: string;
 last_name: string;
 email: string;
}

export const EmailInputCombobox = ({
 userEmails
}: {
 userEmails: UserEmail[]
}) => {
 return (
  <div className="relative flex flex-col justify-center space-y-2">
   <ComboBox allowsCustomValue>
    <Label className="group absolute left-3 top-2 text-gray-500 dark:text-gray-400">
     To:{" "}
    </Label>
    <div>
     <Input
      type="email"
      name="email"
      required
      className="pl-10 border-none bg-white dark:bg-gray-950 text-black dark:text-white px-3 py-2 focus:outline-none w-full h-9"
     />
     <Button className="w-10">+</Button>
    </div>
    <Popover className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-gray-50 dark:bg-gray-950">
     <ListBox
      items={userEmails}
      className="p-1"
     >
      {(e) => (
       <ListBoxItem
        key={e.email}
        textValue={e.email}
       >
        <span className="truncate">
         {formatEmailString(e, { includeFullEmail: true })}
        </span>
       </ListBoxItem>
      )}
     </ListBox>
    </Popover>
   </ComboBox>
  </div>
 )
}