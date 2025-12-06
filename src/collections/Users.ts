import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,

  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}

export default Users
