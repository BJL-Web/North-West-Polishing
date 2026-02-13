import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Work Image',
    plural: 'Our Work',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'images', 'featured', 'order'],
    description: 'Add images to showcase your work in the gallery.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name for this gallery item (not shown publicly)',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add one or more images to display in the gallery',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this on the homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
  timestamps: true,
}
