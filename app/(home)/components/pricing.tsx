import { cards, teams } from '@/constants'
import Image from 'next/image'
import { PricingCard } from './pricing-card'

export const Pricing = () => {
  return (
    <section className='max-w-7xl container mx-auto py-16 px-6'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold max-w-2xl'>
        One tool for your whole company. Free for teams to try.
      </h1>
      <p className='uppercase text-muted-foreground mt-2'>Trusted By Teams At</p>

      <div className='flex gap-5 flex-row flex-wrap mt-4'>
        {teams.map((team, index) => (
          <Image
            key={index}
            src={team}
            alt='Team icons image'
            width={50}
            height={50}
          />
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-10'>
        {cards.map(card => (
          <PricingCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  )
}
