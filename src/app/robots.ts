import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/analytics/', '/redesign-demo/'],
    },
    sitemap: 'https://coldlava.ai/sitemap.xml',
  }
}
