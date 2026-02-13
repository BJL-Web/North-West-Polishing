import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description shown on service cards',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Main content for the service page',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main service image shown on cards',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Service Gallery',
      minRows: 0,
      maxRows: 15,
      admin: {
        description: 'Gallery images for this service (up to 15 images)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Brief description of this image',
          },
        },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name or emoji (e.g., ⚡ or laser)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
  timestamps: true,
}

