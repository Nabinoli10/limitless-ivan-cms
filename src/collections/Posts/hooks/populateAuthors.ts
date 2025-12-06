type Author = {
  id?: string
  name?: string
}

type DocWithAuthors = {
  authors?: Author[]
  populatedAuthors?: { id: string; name: string }[]
  [key: string]: any
}

export const populateAuthors = async ({ doc }: { doc: DocWithAuthors }) => {
  if (!doc) return doc

  if (Array.isArray(doc.authors)) {
    doc.populatedAuthors = doc.authors.map((author) => ({
      id: author?.id ?? '',
      name: author?.name ?? '',
    }))
  }

  return doc
}
