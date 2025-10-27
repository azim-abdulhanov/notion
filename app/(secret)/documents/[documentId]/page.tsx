'use client'

import { Id } from '@/convex/_generated/dataModel'

interface IDocumentIdPageProps {
  params: {
    documentId: Id<"documents">
  }
}

const DocumentIdPage = ({ params }: IDocumentIdPageProps) => {
  return (
    <div>{params.documentId}</div>
  )
}

export default DocumentIdPage
