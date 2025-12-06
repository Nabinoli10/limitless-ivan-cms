import type { Metadata } from 'next/types'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || ''
  const payload = await getPayload({ config: configPromise })

  let posts = {
    docs: [] as CardPostData[],
    totalDocs: 0,
  }

  try {
    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: 'posts' as any,
      depth: 1,
      limit: 12,
      pagination: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
      ...(query && {
        where: {
          or: [
            { title: { like: query } },
            { 'meta.description': { like: query } },
            { 'meta.title': { like: query } },
            { slug: { like: query } },
          ],
        },
      }),
    })

    posts = {
      docs: result.docs as CardPostData[],
      totalDocs: result.totalDocs ?? result.docs.length,
    }
  } catch (err) {
    console.error('Search page error:', err)
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>
          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Search Results',
  }
}
