import { ModeToggle } from '@/components/shared/mode-toggle'
import { Logo } from './logo'
import { Button } from '@/components/ui/button'

export const Navbar = () => {
  return (
    <header className='fixed top-0 left-0 w-full flex justify-between items-center bg-background p-6 z-50'>
      <Logo />
      <nav className='flex items-center gap-2'>
        <Button size={'sm'} variant={'ghost'}>Log In</Button>
        <Button size={'sm'}>Get Notion Free</Button>
        <ModeToggle />
      </nav>
    </header>
  )
}
