import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'

import { hero } from '@/heros/config'
import { slugField } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import type { CollectionSlug } from '../../utilities/generatePreviewPath' // ✅ import the type

type PageDoc = {
  slug?: string
  updatedAt?: string
  publishedAt?: string
  [key: string]: unknown
}

const populatePublishedAt = async ({ data }: { data: PageDoc }) => {
  if (!data.publishedAt && data.updatedAt) {
    data.publishedAt = data.updatedAt
  }
  return data
}

const revalidatePage = async ({ doc }: { doc: PageDoc }) => {
  try {
    if (typeof fetch !== 'undefined') {
      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?page=${doc.slug ?? ''}`,
        { method: 'POST' },
      )
    }
  } catch (e) {
    console.error('Failed to revalidate page', e)
  }
}

const revalidateDelete = async ({ doc }: { doc: PageDoc }) => {
  try {
    if (typeof fetch !== 'undefined') {
      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?page=${doc.slug ?? ''}`,
        { method: 'POST' },
      )
    }
  } catch (e) {
    console.error('Failed to revalidate page delete', e)
  }
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages' as CollectionSlug, // ✅ cast safely
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages' as CollectionSlug,
        req,
      }),

    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
