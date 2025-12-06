import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  upload: true, // ← this is enough in Payload 3.66
  fields: [],
}

export default Media
