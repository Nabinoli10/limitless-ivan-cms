import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

// Collections
import Users from './collections/Users'
import Media from './collections/Media'
import Packages from './collections/Packages'

// Globals
import Homepage from './globals/Homepage'
import Footer from './globals/Footer'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'supersecret123',

  collections: [Users, Media, Packages],
  globals: [Homepage, Footer],

  /**
   * ⭐⭐⭐ CORS + CSRF FIX FOR VERCEL FRONTEND ⭐⭐⭐
   *
   * Replace YOUR real Vercel URL below.
   * This MUST exactly match the domain in your browser.
   */
  cors: [
    'http://localhost:5173', // local frontend
    'http://localhost:3000', // local CMS
    'https://limitlessivan.vercel.app', // optional custom Vercel URL
    'https://limitlessivan-6h7ezi7ma4.nahionils-projects.vercel.app', // your REAL deploy URL
  ],

  csrf: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://limitlessivan.vercel.app',
    'https://limitlessivan-6h7ezi7ma4.nahionils-projects.vercel.app',
  ],

  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./limitless-ivan-cms.db',
    },
  }),
})
