import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Site Logo',
          admin: {
            description: 'Upload your logo image. This will replace text logos throughout the site (navigation, footer, splash screen).',
          },
        },
        {
          name: 'logoHeight',
          type: 'number',
          label: 'Logo Height (px)',
          min: 20,
          max: 200,
          defaultValue: 50,
          admin: {
            description: 'Height of the logo in navigation and footer (default: 50px)',
          },
        },
        {
          name: 'splashLogoHeight',
          type: 'number',
          label: 'Splash Screen Logo Height (px)',
          min: 50,
          max: 400,
          defaultValue: 120,
          admin: {
            description: 'Height of the logo on the splash screen (default: 120px)',
          },
        },
        {
          name: 'heroLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Logo',
          admin: {
            description: 'Logo displayed on the hero section. If not set, the site logo will be used.',
          },
        },
        {
          name: 'heroLogoHeight',
          type: 'number',
          label: 'Hero Logo Height (px)',
          min: 30,
          max: 300,
          defaultValue: 80,
          admin: {
            description: 'Height of the logo on the hero section (default: 80px)',
          },
        },
        {
          name: 'heroLogoMode',
          type: 'select',
          label: 'Hero Logo Mode',
          options: [
            { label: 'Static — Logo stays above title', value: 'static' },
            { label: 'Animated — Logo intro then replaced by description', value: 'animated' },
          ],
          defaultValue: 'static',
          admin: {
            description: 'Static: logo stays on hero. Animated: logo appears first, then fades out and description fades in.',
          },
        },
        {
          name: 'heroBackgroundMode',
          type: 'select',
          label: 'Hero Background Mode',
          options: [
            { label: 'Slide Backgrounds — Use each slide\'s background image', value: 'slides' },
            { label: 'Gallery Slideshow — Crossfade through project images', value: 'gallery' },
          ],
          defaultValue: 'slides',
          admin: {
            description: 'Choose whether the hero background uses per-slide images or auto-cycles through your "Our Work" project gallery images.',
          },
        },
        {
          name: 'siteName',
          type: 'text',
          label: 'Site Name',
          defaultValue: 'North West Polishing',
          admin: {
            description: 'Used for alt text and fallback when logo is not set',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          defaultValue: 'Professional metal polishing and finishing services',
          admin: {
            description: 'Short description shown in footer and splash screen',
          },
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number (Display)',
          defaultValue: '0161 123 4567',
          admin: {
            description: 'Phone number as displayed to visitors',
          },
        },
        {
          name: 'phoneLink',
          type: 'text',
          label: 'Phone Number (Link)',
          defaultValue: '01611234567',
          admin: {
            description: 'Phone number used in tel: links (no spaces or formatting)',
          },
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email Address',
          defaultValue: 'info@nwpolishing.co.uk',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
          defaultValue: 'Manchester, UK',
        },
        {
          name: 'businessHours',
          type: 'text',
          label: 'Business Hours',
          defaultValue: 'Mon–Fri 7am–5pm',
        },
        {
          name: 'googleMapsEmbed',
          type: 'textarea',
          label: 'Google Maps Embed URL',
          defaultValue:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.98633109063!2d-2.3795375!3d53.4723272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0xd9be143804fe6baa!2sManchester!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk',
          admin: {
            description: 'Full Google Maps embed URL for the contact page map',
          },
        },
      ],
    },
    {
      name: 'homeContent',
      type: 'group',
      label: 'Home Page Content',
      admin: {
        description: 'Editable text for sections on the home page.',
      },
      fields: [
        {
          name: 'servicesLabel',
          type: 'text',
          label: 'Services Section Label',
          defaultValue: 'What We Do',
          admin: { description: 'Small uppercase label above the services title' },
        },
        {
          name: 'servicesTitle',
          type: 'text',
          label: 'Services Section Title',
          defaultValue: 'Our Services',
        },
        {
          name: 'servicesDescription',
          type: 'textarea',
          label: 'Services Section Description',
          defaultValue: 'Professional metal polishing and finishing services to meet your exact specifications. From on-site work to precision mechanical polishing, we deliver quality results.',
        },
        {
          name: 'servicesButtonText',
          type: 'text',
          label: 'Services Button Text',
          defaultValue: 'Find Out More',
        },
        {
          name: 'ctaTitle',
          type: 'text',
          label: 'Get In Touch Title',
          defaultValue: 'Get In Touch',
        },
        {
          name: 'ctaDescription',
          type: 'textarea',
          label: 'Get In Touch Description',
          defaultValue: "Get a detailed quote within 24 hours. Send us your specifications and we'll take care of the rest.",
        },
        {
          name: 'ctaButtonText',
          type: 'text',
          label: 'Get In Touch Button Text',
          defaultValue: 'Request Quote',
        },
      ],
    },
    {
      name: 'footerContent',
      type: 'group',
      label: 'Footer',
      admin: {
        description: 'Content displayed in the site footer on every page.',
      },
      fields: [
        {
          name: 'contactHeading',
          type: 'text',
          label: 'Contact Column Heading',
          defaultValue: 'Contact',
        },
        {
          name: 'contactText',
          type: 'text',
          label: 'Contact Column Text',
          defaultValue: 'Get in touch for a quote',
        },
        {
          name: 'contactLinkText',
          type: 'text',
          label: 'Contact Link Text',
          defaultValue: 'Request Quote',
        },
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Copyright Text',
          admin: { description: 'Leave blank to use site name. Year is added automatically.' },
        },
      ],
    },
    {
      name: 'pageSeo',
      type: 'group',
      label: 'Page SEO',
      admin: {
        description: 'SEO settings for each static page. Leave blank to use defaults.',
      },
      fields: [
        {
          name: 'home',
          type: 'group',
          label: 'Home Page',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              admin: { description: 'Page title for search engines and browser tabs' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              admin: { description: 'Description shown in search engine results (150-160 characters recommended)' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Open Graph Image',
              admin: { description: 'Image shown when shared on social media (1200x630px recommended)' },
            },
          ],
        },
        {
          name: 'services',
          type: 'group',
          label: 'Services Page',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'Meta Title' },
            { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
            { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Open Graph Image' },
          ],
        },
        {
          name: 'ourWork',
          type: 'group',
          label: 'Our Work Page',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'Meta Title' },
            { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
            { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Open Graph Image' },
          ],
        },
        {
          name: 'contact',
          type: 'group',
          label: 'Contact Page',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'Meta Title' },
            { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
            { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Open Graph Image' },
          ],
        },
      ],
    },
  ],
}

