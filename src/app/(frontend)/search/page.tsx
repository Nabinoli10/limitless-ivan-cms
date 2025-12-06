import type { Metadata } from 'next/types'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Args = {
  searchParams: {
    q?: string
  }
}

export default async function Page({ searchParams }: Args) {
  const query = searchParams?.q || ''
  const payload = await getPayload({ config: configPromise })

  // default fallback to avoid undefined
  let posts = {
    docs: [] as CardPostData[],
    totalDocs: 0,
  }

  try {
    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: 'posts' as any, // ✅ cast to bypass type error
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

    // Assign only the docs (typed cast)
    posts = {
      docs: result.docs as unknown as CardPostData[],
      totalDocs: result.totalDocs ?? result.docs.length,
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
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
