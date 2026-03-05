export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'SoftwareCompany'],
    '@id': 'https://coldlava.ai/#organization',
    name: 'Cold Lava',
    legalName: 'COLD LAVA AI LTD',
    url: 'https://coldlava.ai',
    logo: {
      '@type': 'ImageObject',
      url: 'https://coldlava.ai/Cold Lava Logo/Cold Lava - Icon.png',
      width: 512,
      height: 512,
    },
    image: 'https://coldlava.ai/og-image.jpg',
    description: 'Bespoke software development and AI solutions company specialising in Business Operating Systems (BOS), custom CRMs, AI voice agents, and workflow automation for UK businesses.',
    foundingDate: '2024',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 2,
      maxValue: 10,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'England',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@coldlava.ai',
      telephone: '+44-151-541-6933',
      contactType: 'Customer Service',
      availableLanguage: 'English',
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom',
      },
    },
    sameAs: [
      'https://github.com/coldlavaai',
      'https://www.linkedin.com/company/cold-lava-ai',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Business Automation',
      'Custom Software Development',
      'CRM Development',
      'AI Voice Agents',
      'Workflow Automation',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'ITCompany'],
    '@id': 'https://coldlava.ai/#localbusiness',
    name: 'Cold Lava',
    image: 'https://coldlava.ai/og-image.jpg',
    url: 'https://coldlava.ai',
    telephone: '+44-151-541-6933',
    email: 'hello@coldlava.ai',
    description: 'Bespoke software development and AI solutions for UK businesses. Custom Business Operating Systems, CRMs, AI voice agents, and workflow automation.',
    priceRange: '££££',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'England',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.4084,
      longitude: -2.9916,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '5',
      bestRating: '5',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Automation & Business Operating Systems',
    provider: {
      '@type': 'Organization',
      name: 'Cold Lava AI Ltd',
      url: 'https://coldlava.ai',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Automation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Operating System (BOS)',
            description: 'Bespoke, AI-assisted software systems designed to centralise data, automate workflows, and provide operational visibility.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom CRM Development',
            description: 'Tailored CRM systems built to match your specific business processes and requirements.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Voice Agents',
            description: 'Intelligent voice agents for customer service, lead qualification, and business automation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Workflow Automation',
            description: 'End-to-end automation of business processes using n8n, custom integrations, and AI.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Database Reactivation (DBR)',
            description: 'AI-powered systems to reactivate dormant contacts and convert them into active opportunities.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://coldlava.ai/#website',
    name: 'Cold Lava',
    url: 'https://coldlava.ai',
    description: 'Bespoke software development and AI solutions. Business Operating Systems, custom CRMs, AI voice agents, and workflow automation for UK businesses.',
    publisher: {
      '@id': 'https://coldlava.ai/#organization',
    },
    inLanguage: 'en-GB',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://coldlava.ai',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
