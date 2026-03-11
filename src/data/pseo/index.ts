import fs from 'fs'
import path from 'path'

export interface MarketingIdea {
  number: number
  title: string
  description: string
  difficulty: string
  cost: string
  impact: string
}

export interface MarketingSection {
  section_title: string
  ideas: MarketingIdea[]
}

export interface ContentSection {
  heading: string
  content: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface PSEOPage {
  title: string
  slug: string
  meta_description: string
  target_keyword: string
  intro: string
  sections?: (MarketingSection | ContentSection)[]
  faqs?: FAQ[]
  cta: string
}

// Detect page type from content
export type PageType = 'marketing-ideas' | 'article' | 'calculator'

export function getPageType(page: PSEOPage): PageType {
  if (!page.sections || page.sections.length === 0) {
    return 'calculator'
  }
  // Check first section for 'ideas' key (marketing ideas pages)
  const firstSection = page.sections[0] as unknown as Record<string, unknown>
  if ('ideas' in firstSection || 'section_title' in firstSection) {
    return 'marketing-ideas'
  }
  return 'article'
}

export function isMarketingSection(section: MarketingSection | ContentSection): section is MarketingSection {
  return 'ideas' in section || 'section_title' in section
}

export function isContentSection(section: MarketingSection | ContentSection): section is ContentSection {
  return 'heading' in section && 'content' in section
}

const dataDir = path.join(process.cwd(), 'src/data/pseo')

export function getAllPSEOSlugs(): string[] {
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'index.ts')
  return files.map(f => f.replace('.json', ''))
}

export function getPSEOPage(slug: string): PSEOPage | null {
  const filePath = path.join(dataDir, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as PSEOPage
}

export function getAllPSEOPages(): PSEOPage[] {
  return getAllPSEOSlugs()
    .map(slug => getPSEOPage(slug))
    .filter((p): p is PSEOPage => p !== null)
}
