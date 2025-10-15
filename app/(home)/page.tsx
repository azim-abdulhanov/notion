import { Clients, Hero, Pricing } from './components'

export default function Home() {
  return (
    <div className='flex flex-col min-h-full'>
      <div className='flex flex-col flex-1 justify-center items-center md:justify-start gap-8 px-6 pb-10 text-center'>
        <Hero />
        <Clients />
      </div>
      <Pricing />
    </div>
  )
}
