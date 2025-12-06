import type { CollectionConfig } from 'payload'

const Packages: CollectionConfig = {
  slug: 'packages',
  labels: {
    singular: 'Package',
    plural: 'Packages',
  },

  fields: [
    { name: 'name', type: 'text', required: true },

    { name: 'slug', type: 'text', required: true, unique: true },

    { name: 'duration', type: 'text' },

    { name: 'price', type: 'text' },

    { name: 'sessions', type: 'text' },

    { name: 'focus', type: 'text' },

    { name: 'who', type: 'textarea' },

    { name: 'transformation', type: 'textarea' },

    {
      name: 'features',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'item', type: 'text', required: true }],
    },

    // ⭐ Promo Video for package
    {
      name: 'promoVideo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}

export default Packages
