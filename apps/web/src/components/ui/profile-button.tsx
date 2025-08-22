import { ChevronDown, LogOut } from 'lucide-react'

import { auth } from '@/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'

export async function ProfileButton() {
  const { user } = await auth()

  // function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-muted-foreground text-xs">{user?.email}</span>
        </div>

        <Avatar className="size-8">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          {user.name && (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>

        <ChevronDown className="text-muted-foreground size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="">
        <DropdownMenuItem asChild>
          <a href={'/api/auth/sign-out'}>
            <LogOut className="size-4" />
            Sign Out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
