import type { AfterChangeHook, AfterDeleteHook } from 'payload'

export const revalidatePage: AfterChangeHook = async () => {
  try {
    if (typeof fetch !== 'undefined') {
      await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?page`)
    }
  } catch (e) {
    console.error('Failed to revalidate page', e)
  }
}

export const revalidateDelete: AfterDeleteHook = async () => {
  try {
    if (typeof fetch !== 'undefined') {
      await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?page`)
    }
  } catch (e) {
    console.error('Failed to revalidate page delete', e)
  }
}
