import { GlobalConfig } from 'payload'

const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',

  fields: [
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram URL',
    },
    {
      name: 'youtube',
      type: 'text',
      label: 'YouTube URL',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
  ],
}

export default Footer
