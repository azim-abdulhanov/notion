import ConfirmModal from '@/components/modals/confirm-modal'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { Search, Trash, Undo } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const TrashBox = () => {
  const router = useRouter()
  const params = useParams()

  const documents = useQuery(api.document.getTrashDocuments)
  const remove = useMutation(api.document.remove)

  const [search, setSearch] = useState('')

  if (documents === undefined) {
    return (
      <div className='flex items-center justify-center h-full p-4'>
        <Spinner />
      </div>
    )
  }

  const filteredDocuments = documents.filter(doc => {
    return doc.title.toLowerCase().includes(search.toLowerCase())
  })

  const onRemove = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: 'Removing document...',
      success: 'Document removed permanently',
      error: 'Failed to remove document'
    })

    if (params.documentId === documentId) {
      router.push('/documents')
    }
  }

  return (
    <>
      <div className='flex items-center gap-2 p-1'>
        <Search className='w-5 h-5' />
        <Input
          className='w-full h-8'
          placeholder='Filter by page title...'
          value={search}
          onChange={evt => setSearch(evt.target.value)}
        />
      </div>
      <div className='mt-2 px-1 pb-1 text-sm'>
        <p className='hidden last:block text-muted-foreground text-sm text-center mb-2'>
          No documents in the trash
        </p>

        {filteredDocuments.map(doc => (
          <div
            key={doc._id}
            className='flex justify-between items-center py-1 px-2 rounded-md hover:bg-accent cursor-pointer'
            onClick={() => router.push(`/documents/${doc._id}`)}
            role='button'
          >
            <span>{doc.title || 'Untitled'}</span>
            <div className='flex items-center gap-1'>
              <button className='p-1 rounded-md border border-transparent hover:border-muted-foreground hover:bg-accent cursor-pointer'>
                <Undo className='w-3 h-3 text-muted-foreground' />
              </button>
              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <button className='p-1 rounded-md border border-transparent hover:border-muted-foreground cursor-pointer'>
                  <Trash className='w-3 h-3 text-muted-foreground' />
                </button>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
