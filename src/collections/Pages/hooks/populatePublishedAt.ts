import type { AfterReadHook } from 'payload'

export const populatePublishedAt: AfterReadHook = async ({ doc }) => {
  if (!doc) return doc

  // If no publishedAt exists, use updatedAt
  if (!doc.publishedAt && doc.updatedAt) {
    doc.publishedAt = doc.updatedAt
  }

  return doc
}
