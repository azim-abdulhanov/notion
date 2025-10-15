import { clients } from '@/constants'
import Image from 'next/image'

export const Clients = () => {
  return (
    <section className='max-w-xl'>
      <h2 className='text-4xl font-bold mt-6'>
        Millions run on Notion every day
      </h2>
      <p className='text-muted-foreground mt-3'>
        Powering the world’s best teams, from next-generation startups to
        established enterprises.
      </p>
      <div className='flex flex-wrap justify-center items-center gap-5 mt-6'>
        {clients.map((client, index) => (
          <Image
            key={index}
            src={client}
            alt='Client icons image'
            width={50}
            height={50}
          />
        ))}
      </div>
    </section>
  )
}
