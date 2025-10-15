import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export const Hero = () => {
  return (
    <section>
      <div className='max-w-3xl space-y-3'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
          Write, plan, share. With AI at your side.
        </h1>
        <p className='text-base sm:text-xl md:text-2xl font-medium mb-5'>
          Notion is the connected workspace where better, faster work happens.
        </p>
        <Button className='cursor-pointer'>
          <span>Get Notion Free</span>
          <ArrowRight />
        </Button>
      </div>

      <div className='flex flex-col justify-center items-center max-w-5xl'>
        <div className='flex items-center mt-0 md:mt-4'>
          <div className='relative w-96 h-96 hidden md:block'>
            <Image
              className='object-cover dark:hidden'
              src='/men-light.svg'
              alt='Men light image'
              fill
            />
            <Image
              className='object-cover hidden dark:block'
              src='/men-dark.svg'
              alt='Men light image'
              fill
            />
          </div>
        </div>
      </div>
    </section>
  )
}
