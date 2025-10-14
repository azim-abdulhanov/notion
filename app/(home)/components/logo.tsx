import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link className='flex items-center gap-1' href={'/'}>
      <Image
        className='object-cover dark:hidden'
        src='/logo-light.svg'
        alt='Logo light'
        width={40}
        height={40}
      />
      <Image
        className='object-cover hidden dark:block'
        src='/logo-dark.svg'
        alt='Logo light'
        width={40}
        height={40}
      />
      <span className='text-xl font-semibold'>Notion</span>
    </Link>
  )
}
