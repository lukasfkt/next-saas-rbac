'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/get-projects'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Skeleton } from './skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  // const { projects } = use(getProjects(orgSlug))
  const { data, isLoading } = useQuery({
    queryKey: ['projects', orgSlug],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject =
    data?.projects.find((project) => project.slug === projectSlug) ?? null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isLoading}
        className="focus-visible:ring-primary flex w-[168px] items-center gap-1 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2"
      >
        {isLoading ? (
          <>
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="size-4 max-w-4">
                  {currentProject.avatarUrl ? (
                    <AvatarImage src={currentProject.avatarUrl} />
                  ) : (
                    <AvatarFallback />
                  )}
                </Avatar>
                <span className="truncate text-left">
                  {currentProject.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </>
        )}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[200px]"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data &&
            data.projects.map((project) => (
              <DropdownMenuItem key={project.id} asChild>
                <Link href={`/org/${orgSlug}/project/${project.slug}`}>
                  <Avatar className="size-4 max-w-4">
                    {project.avatarUrl ? (
                      <AvatarImage src={project.avatarUrl} />
                    ) : (
                      <AvatarFallback />
                    )}
                  </Avatar>
                  <span className="line-clamp-1">{project.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/org/${orgSlug}/create-project`}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
