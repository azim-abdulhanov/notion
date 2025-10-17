'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Spinner } from '@/components/ui/spinner'
import { IChildProps } from '@/types'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import { AppSidebar } from './components'

const SecretLayout = ({ children }: IChildProps) => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner className='size-8' />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect('/')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className='cursor-pointer' />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default SecretLayout
