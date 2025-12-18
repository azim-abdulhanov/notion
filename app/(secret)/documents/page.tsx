'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const DocumentsPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const createDocument = useMutation(api.document.createDocument)

  const onCreateDocument = () => {
    const promise = createDocument({
      title: 'Untitled'
    })
      .then(docId => router.push(`/documents/${docId}`))
      .catch(console.error)

    toast.promise(promise, {
      loading: 'Creating a new blank...',
      success: 'Created a new blank!',
      error: 'Failed to create a new blank.'
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
