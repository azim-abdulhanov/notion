'use client'

import { ModeToggle } from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@/lib/utils'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { Logo } from './logo'

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const scrolled = useScrolled()

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full flex justify-between items-center bg-background p-6 z-50',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <nav className='flex items-center gap-2'>
        {isLoading && <Spinner />}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button className='cursor-pointer' size={'sm'} variant={'ghost'}>
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button className='cursor-pointer' size={'sm'}>
                Get Notion Free
              </Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button size={'sm'} variant={'ghost'} asChild>
              <Link href={'/documents'}>Enter Notion</Link>
            </Button>
            <UserButton afterSwitchSessionUrl='/' />
          </>
        )}
        <ModeToggle />
      </nav>
    </header>
  )
}
