type PostDoc = {
  slug?: string
  [key: string]: any
}

export const revalidatePost = async ({ doc }: { doc: PostDoc }) => {
  try {
    if (typeof fetch !== 'undefined') {
      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?post=${doc?.slug ?? ''}`,
        {
          method: 'POST',
        },
      )
    }
  } catch (e) {
    console.error('Revalidate post failed', e)
  }
}

export const revalidateDelete = async ({ doc }: { doc: PostDoc }) => {
  try {
    if (typeof fetch !== 'undefined') {
      await fetch(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?post=${doc?.slug ?? ''}`,
        {
          method: 'POST',
        },
      )
    }
  } catch (e) {
    console.error('Revalidate post delete failed', e)
  }
}
