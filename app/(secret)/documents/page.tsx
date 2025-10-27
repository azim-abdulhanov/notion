'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { Plus } from 'lucide-react'
import Image from 'next/image'

const DocumentsPage = () => {
  const { user } = useUser()
  const createDocument = useMutation(api.document.createDocument)

  const onCreateDocument = () => {
    createDocument({
      title: 'Untitled'
    })
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-4'>
      <Image
        className='object-cover dark:hidden'
        src='/note-light.svg'
        alt='Note light image'
        width={300}
        height={300}
      />
      <Image
        className='object-cover hidden dark:block'
        src='/note-dark.svg'
        alt='Note dark image'
        width={300}
        height={300}
      />
      <h2 className='text-lg font-bold'>
        Welcome to {user?.firstName}`s documents page!
      </h2>
      <Button className='cursor-pointer' onClick={onCreateDocument}>
        <Plus />
        <span>Create a blank</span>
      </Button>
    </div>
  )
}

export default DocumentsPage
