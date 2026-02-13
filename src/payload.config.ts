import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { QuoteRequests } from './collections/QuoteRequests'
import { Pages } from './collections/Pages'
import { HeroSlides } from './collections/HeroSlides'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Projects, QuoteRequests, Pages, HeroSlides],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'sales@northwestmetalpolishingservices.co.uk',
    defaultFromName: 'North West Metal Polishing Services',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['services', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => (doc as { title?: string })?.title || '',
      generateDescription: ({ doc }) => (doc as { description?: string })?.description || '',
    }),
  ],
})
