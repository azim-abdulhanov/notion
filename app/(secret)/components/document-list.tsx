'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { FileIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { DocumentItem } from './document-item'

interface IDocumentListProps {
  parentDocumentId?: Id<'documents'>
  level?: number
}

export const DocumentList = ({
  parentDocumentId,
  level = 0
}: IDocumentListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const router = useRouter()
  const params = useParams()

  const documents = useQuery(api.document.getDocuments, {
    parentDocument: parentDocumentId
  })

  const onExpand = (documentId: string) => {
    setExpanded(prev => ({
      ...prev,
      [documentId]: !prev[documentId]
    }))
  }

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  if (documents === undefined) {
    return (
      <>
        <DocumentItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <DocumentItem.Skeleton level={level} />
            <DocumentItem.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  if (documents.length === 0) {
    return (
      <p
        className={cn(
          'text-sm text-muted-foreground/70 italic',
          level === 0 && 'hidden'
        )}
        style={{ paddingLeft: level ? `${level * 16}px` : undefined }}
      >
        No pages inside
      </p>
    )
  }

  return (
    <>
      {documents.map(doc => (
        <div key={doc._id}>
          <DocumentItem
            id={doc._id}
            label={doc.title}
            icon={FileIcon}
            level={level}
            expanded={expanded[doc._id]}
            onExpand={() => onExpand(doc._id)}
            onClick={() => onRedirect(doc._id)}
            active={params.documentId === doc._id}
            documentIcon={doc.icon}
          />
          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  )
}
