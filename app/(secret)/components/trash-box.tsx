import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export const TrashBox = () => {
  return (
    <>
      <div className='flex items-center gap-2 p-1'>
        <Search className='w-5 h-5' />
        <Input className='w-full' placeholder='Filter by page title...' />
      </div>
      <div className='mt-2 px-1 pb-1 text-sm'>
        <p className='text-muted-foreground text-sm text-center'>
          No documents in the trash
        </p>
      </div>
    </>
  )
}
