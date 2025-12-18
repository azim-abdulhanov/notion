'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { Plus, Rocket, Search, Settings, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { DocumentItem } from './document-item'
import { DocumentList } from './document-list'
import { TrashBox } from './trash-box'
import { UserBox } from './user-box'

export const AppSidebar = () => {
  const router = useRouter()
  const createDocument = useMutation(api.document.createDocument)

  const onCreateDocument = () => {
    const promise = createDocument({
      title: 'Untitled'
    })
      .then(docId => router.push(`/documents/${docId}`))
      .catch(console.error)

    toast.promise(promise, {
      loading: 'Creating a new document...',
      success: 'Created a new document!',
      error: 'Failed to create a new document.'
    })
  }

  const arr = [1, 2, 3]

  return (
    <Sidebar>
      <SidebarHeader className='hover:bg-sidebar-accent cursor-pointer transition'>
        <UserBox />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <DocumentItem label='Search' icon={Search} />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <DocumentItem label='Settings' icon={Settings} />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <DocumentItem
                    label='New document'
                    icon={Plus}
                    onClick={onCreateDocument}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className='mt-4 flex flex-col gap-2'>
                <DocumentList />
                <SidebarMenuButton>
                  <DocumentItem
                    label='Add a page'
                    icon={Plus}
                    onClick={onCreateDocument}
                  />
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <Popover>
                    <PopoverTrigger>
                      <DocumentItem label='Trash' icon={Trash} />
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-64 p-1'
                      side='right'
                      align='start'
                    >
                      <TrashBox />
                    </PopoverContent>
                  </Popover>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='bg-sidebar-accent'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2 p-2'>
            <Rocket className='w-5 h-5' />
            <span>Free plan</span>
          </div>
          <span>{arr.length}/3</span>
        </div>
        <Progress value={arr.length >= 3 ? 100 : (arr.length / 3) * 100} />
      </SidebarFooter>
    </Sidebar>
  )
}
