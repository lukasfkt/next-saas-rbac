import { Slash } from 'lucide-react'
import Image from 'next/image'

import logo from '@/assets/logo.svg'

import { ThemeSwitcher } from '../theme/theme-switcher'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { Separator } from './separator'

export async function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="Logo" className="size-24 dark:invert" />

        <Slash className="text-muted-foreground size-3 -rotate-[24deg]" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <Separator orientation="vertical" className="h-5" />

        <ProfileButton />
      </div>
    </div>
  )
}
