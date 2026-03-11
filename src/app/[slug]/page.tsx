import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllPSEOSlugs,
  getPSEOPage,
  getPageType,
  isMarketingSection,
  isContentSection,
  type PSEOPage,
  type MarketingIdea,
  type MarketingSection,
  type ContentSection,
  type FAQ,
} from '@/data/pseo'
import { PSEOPageClient } from './client'

// Generate all static params at build time
export async function generateStaticParams() {
  const slugs = getAllPSEOSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getPSEOPage(slug)
  if (!page) return {}

  const url = `https://coldlava.ai/${page.slug}`

  return {
    title: page.title,
    description: page.meta_description,
    keywords: [page.target_keyword, 'Cold Lava', 'AI automation', 'UK business'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.meta_description,
      url,
      siteName: 'Cold Lava',
      locale: 'en_GB',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description,
    },
  }
}

export default async function PSEOPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getPSEOPage(slug)
  if (!page) notFound()

  const pageType = getPageType(page)

  // Prepare serialisable section data
  const marketingSections: MarketingSection[] = []
  const contentSections: ContentSection[] = []

  if (page.sections) {
    for (const section of page.sections) {
      if (isMarketingSection(section)) {
        marketingSections.push(section)
      } else if (isContentSection(section)) {
        contentSections.push(section)
      }
    }
  }

  // Build FAQ structured data
  const faqSchema = page.faqs && page.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  // Build article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.meta_description,
    author: {
      '@type': 'Organization',
      name: 'Cold Lava AI Ltd',
      url: 'https://coldlava.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cold Lava AI Ltd',
      url: 'https://coldlava.ai',
    },
    mainEntityOfPage: `https://coldlava.ai/${page.slug}`,
  }

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PSEOPageClient
        page={{
          title: page.title,
          slug: page.slug,
          meta_description: page.meta_description,
          target_keyword: page.target_keyword,
          intro: page.intro,
          cta: page.cta,
        }}
        pageType={pageType}
        marketingSections={marketingSections}
        contentSections={contentSections}
        faqs={page.faqs || []}
      />
    </>
  )
}
