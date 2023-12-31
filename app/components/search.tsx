"use client"

import { useDebouncedCallback } from "use-debounce"
import {
 usePathname,
 useRouter,
 useSearchParams
} from "next/navigation"
import SearchIcon from "@/app/icons/search"

export const Search = () => {
 const searchParams = useSearchParams()
 const { replace } = useRouter()
 const pathname = usePathname()

 const handleSearch = useDebouncedCallback((term) => {
  const params = new URLSearchParams(searchParams)
  if (term) {
   params.set("q", term)
  } else {
   params.delete("q")
  }
  replace(`${pathname}?${params.toString()}`)
 }, 300)

 return (
  <div className="relative flex flex-1 flex-shrink-0">
   <label htmlFor="search" className="sr-only">
    Search
   </label>
   <input
    placeholder="Search..."
    defaultValue={searchParams.get("q")?.toString()}
    className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-950 dark:text-white dark:border-gray-800"
    onChange={(e) => {
     handleSearch(e.target.value)
    }}
   />
   <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
  </div>
 )
}