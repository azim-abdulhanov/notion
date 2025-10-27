'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontalIcon,
  Plus,
  Trash
} from 'lucide-react'
import React from 'react'

interface IDocumentItemProps {
  id?: Id<'documents'>
  label: string
  level?: number
  expanded?: boolean
  active?: boolean
  icon?: LucideIcon
  documentIcon?: string
  onExpand?: () => void
  onClick?: () => void
}

export const DocumentItem = ({
  id,
  label,
  level = 0,
  expanded,
  onExpand,
  onClick,
  active,
  icon: Icon,
  documentIcon
}: IDocumentItemProps) => {
  const { user } = useUser()
  const createDocument = useMutation(api.document.createDocument)

  const onCreateNewDocument = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.stopPropagation()

    if (!id) return

    createDocument({
      title: 'Untitled',
      parentDocument: id
    }).then(() => {
      if (!expanded) {
        onExpand?.()
      }
    })
  }

  const handleExpand = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.stopPropagation()
    onExpand?.()
  }

  const ChevronIcon = expanded ? ChevronDown : ChevronRight

  return (
    <div
      className={cn(
        'flex items-center w-full group rounded-md px-1',
        active && 'bg-accent',
        onClick && 'cursor-pointer'
      )}
      style={{ paddingLeft: `${level * 16}px` }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {!!id && (
        <Button
          className='w-6 h-6'
          variant='ghost'
          size='icon'
          onClick={handleExpand}
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          <ChevronIcon className='h-4 w-4' />
        </Button>
      )}

      {documentIcon ? (
        <div className='shrink-0 ml-1 text-md leading-none'>{documentIcon}</div>
      ) : (
        Icon && <Icon className='shrink-0 h-4 w-4 ml-1 text-muted-foreground' />
      )}

      <span className='ml-2 truncate flex-1 text-sm'>{label}</span>

      {!!id && (
        <div className='flex items-center gap-0.5 ml-auto'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity'
                variant='ghost'
                size='icon'
                onClick={e => e.stopPropagation()}
                aria-label='More options'
              >
                <MoreHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-60' align='start'>
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <Trash className='h-4 w-4' />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-xs text-muted-foreground'
                disabled
              >
                Last edited by {user?.fullName || 'Unknown'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className='w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity'
            variant='ghost'
            size='icon'
            onClick={onCreateNewDocument}
            aria-label='Add a sub-page'
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  )
}

DocumentItem.Skeleton = function DocumentItemSkeleton({
  level = 0
}: {
  level?: number
}) {
  return (
    <div
      className='flex items-center gap-2 py-1 px-1'
      style={{ paddingLeft: `${level * 16}px` }}
    >
      <Skeleton className='h-4 w-4 rounded' />
      <Skeleton className='h-4 w-[50%] rounded' />
    </div>
  )
}
