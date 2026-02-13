import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'accent', 'order', 'active'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Only active slides will be shown in the slideshow',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Order',
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title Line 1',
          admin: {
            width: '33%',
            description: 'e.g., "Precision"',
          },
        },
        {
          name: 'accent',
          type: 'text',
          required: true,
          label: 'Accent Text (Red)',
          admin: {
            width: '33%',
            description: 'e.g., "Laser Cutting"',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Title Line 3',
          admin: {
            width: '33%',
            description: 'e.g., "Stainless Steel"',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Brief description of this service',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'titleSize',
          type: 'number',
          label: 'Title Size (rem)',
          min: 1,
          max: 8,
          defaultValue: 2.7,
          admin: {
            width: '50%',
            description: 'Font size for the title in rem (default: 2.7)',
            step: 0.1,
          },
        },
        {
          name: 'descriptionSize',
          type: 'number',
          label: 'Description Size (rem)',
          min: 0.5,
          max: 4,
          defaultValue: 1.5,
          admin: {
            width: '50%',
            description: 'Font size for the description in rem (default: 1.5)',
            step: 0.1,
          },
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Background Image',
      admin: {
        description: 'Optional - a metallic background will be used if no image is provided',
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      label: 'Overlay Opacity',
      admin: {
        description: 'Dark overlay opacity (0-100). Use higher values for images, lower for metallic background.',
      },
    },
    {
      name: 'backgroundBlur',
      type: 'number',
      min: 0,
      max: 20,
      defaultValue: 0,
      label: 'Background Blur',
      admin: {
        description: 'Blur amount in pixels for the background image (0-20). Only applies when a background image is set.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showLogo',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Logo',
        },
        {
          name: 'showTitle',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Title',
        },
        {
          name: 'showDescription',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Description',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showGetQuote',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Get Quote Button',
        },
        {
          name: 'showViewWork',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show View Our Work Button',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Number/Value',
          admin: {
            description: 'e.g., "±0.1", "25", "3×1.5"',
          },
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unit',
          admin: {
            description: 'e.g., "mm", "m", "t" (leave empty if not needed)',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: {
            description: 'e.g., "Precision Tolerance"',
          },
        },
      ],
    },
  ],
}

