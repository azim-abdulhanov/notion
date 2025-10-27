'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SignOutButton, useUser } from '@clerk/clerk-react'
import { ChevronsLeftRight } from 'lucide-react'

export const UserBox = () => {
  const { user } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='p-2' asChild>
        <div className='flex items-center gap-2'>
          <Avatar className='h-7 w-7'>
            <AvatarImage
              src={user?.imageUrl}
              alt={user?.fullName || 'User image'}
            />
            <AvatarFallback>{user?.fullName?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className='flex-1 text-left text-sm'>
            <p className='font-medium line-clamp-1'>
              {user?.fullName}&apos;s Notion
            </p>
          </div>
          <ChevronsLeftRight className='rotate-90 h-4 w-4 text-muted-foreground' />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-65' align='start'>
        <DropdownMenuItem className='text-xs text-muted-foreground' disabled>
          {user?.emailAddresses[0]?.emailAddress}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className='flex items-center gap-2'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.fullName?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className='text-sm line-clamp-1'>
              {user?.fullName}&apos;s Notion
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-muted-foreground cursor-pointer'>
          <SignOutButton>Log Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
