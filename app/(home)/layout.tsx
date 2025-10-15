import { IChildProps } from '@/types'
import { Navbar } from './components'

const HomeLayout = ({ children }: IChildProps) => {
  return (
    <div className='h-full'>
      <Navbar />
      <main className='h-full pt-40'>{children}</main>
    </div>
  )
}

export default HomeLayout
