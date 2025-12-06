import { GlobalConfig } from 'payload'

const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',

  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'heroSubtitle',
      type: 'text',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'youtubeVideoURL',
      type: 'text',
    },
    {
      name: 'tools',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'footerText',
      type: 'text',
    },
  ],
}

export default Homepage
