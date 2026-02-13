import type { CollectionConfig } from 'payload'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'contactName', 'email', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return

        try {
          const settings = await req.payload.findGlobal({ slug: 'site-settings' })
          const contactInfo = settings.contactInfo as { email?: string } | undefined
          const recipientEmail = contactInfo?.email

          if (!recipientEmail) {
            req.payload.logger.warn('No contact email configured in SiteSettings — skipping quote notification')
            return
          }

          await req.payload.sendEmail({
            to: recipientEmail,
            subject: `New Quote Request from ${doc.company}`,
            html: `
              <h2>New Quote Request</h2>
              <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Company</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${doc.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: bold;">Contact Name</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${doc.contactName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${doc.email}">${doc.email}</a></td>
                </tr>
                ${doc.phone ? `
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="tel:${doc.phone}">${doc.phone}</a></td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Message</td>
                  <td style="padding: 8px 12px; white-space: pre-wrap;">${doc.message}</td>
                </tr>
              </table>
              <p style="margin-top: 24px; color: #666; font-size: 13px;">
                You can manage this request in the <a href="${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/quote-requests/${doc.id}">admin dashboard</a>.
              </p>
            `,
          })

          req.payload.logger.info(`Quote notification sent to ${recipientEmail} for ${doc.company}`)
        } catch (error) {
          req.payload.logger.error(`Failed to send quote notification email: ${error}`)
        }
      },
    ],
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'contactName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quote Sent', value: 'quote-sent' },
        { label: 'Completed', value: 'completed' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'new',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes',
      },
    },
  ],
  timestamps: true,
}
