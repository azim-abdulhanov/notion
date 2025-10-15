import { Button } from '@/components/ui/button'
import { Logo } from './logo'

export const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-6 w-full p-6 bg-background z-50">
      <Logo />

      <nav className="w-full flex flex-col sm:flex-row justify-start sm:justify-end items-start md:items-center gap-2 text-muted-foreground">
        <Button className='cursor-pointer' variant="link" size="sm">
          Privacy Policy
        </Button>
        <Button className='cursor-pointer' variant="link" size="sm">
          Terms & Conditions
        </Button>
      </nav>
    </footer>
  )
}
