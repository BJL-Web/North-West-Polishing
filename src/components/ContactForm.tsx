'use client'

import React, { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: formData.company,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          company: '',
          contactName: '',
          email: '',
          phone: '',
          message: '',
        })
      } else {
        alert('There was an error submitting your request. Please try again.')
      }
    } catch (error) {
      alert('There was an error submitting your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-primary border border-success rounded-none p-6 sm:p-12 text-center">
        <h3 className="text-success mb-4">Thank you for your request!</h3>
        <p className="text-text-secondary">We&apos;ll get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <form
      className="bg-primary border border-border rounded-none p-4 sm:p-8 md:p-12 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
        <div className="mb-8">
          <label htmlFor="company" className="block mb-2 text-text-primary font-medium">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full p-4 bg-bg-secondary border border-border rounded-none text-text-primary text-base font-sans transition-all duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="contactName" className="block mb-2 text-text-primary font-medium">
            Contact Name *
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            required
            value={formData.contactName}
            onChange={handleChange}
            className="w-full p-4 bg-bg-secondary border border-border rounded-none text-text-primary text-base font-sans transition-all duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
        <div className="mb-8">
          <label htmlFor="email" className="block mb-2 text-text-primary font-medium">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 bg-bg-secondary border border-border rounded-none text-text-primary text-base font-sans transition-all duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="phone" className="block mb-2 text-text-primary font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-4 bg-bg-secondary border border-border rounded-none text-text-primary text-base font-sans transition-all duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]"
          />
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block mb-2 text-text-primary font-medium">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          className="w-full p-4 bg-bg-secondary border border-border rounded-none text-text-primary text-base font-sans transition-all duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] resize-y"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 py-3 px-7 rounded-none font-medium text-center transition-all duration-200 border-none cursor-pointer text-sm tracking-[0.01em] bg-accent text-white relative overflow-hidden hover:bg-accent-hover hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  )
}
