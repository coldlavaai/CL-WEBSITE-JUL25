import Link from 'next/link'
import Image from 'next/image'
import { FooterTicker } from './FooterTicker'

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      {/* Main Footer Content - Slim and Horizontal */}
      <div className="container-full py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo & Company Info - Inline */}
          <div className="flex items-center gap-4">
            <Image
              src="/Cold Lava Logo/Cold Lava - Icon.png"
              alt="Cold Lava"
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <div className="text-xs text-white/30 leading-tight">
              <div>© {new Date().getFullYear()} Cold Lava AI Ltd. United Kingdom.</div>
              <div>Company No. 16492732</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 md:gap-8 text-sm text-white/40">
            <Link href="#work" className="hover:text-white transition-colors">
              Work
            </Link>
            <Link href="#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#bos" className="hover:text-white transition-colors">
              BOS
            </Link>
            <Link href="#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="mailto:hello@coldlava.ai"
              className="hover:text-white transition-colors"
            >
              hello@coldlava.ai
            </Link>
          </div>
        </div>
      </div>

      {/* Live Stats Ticker Row */}
      <div className="border-t border-white/5 bg-cyan-500/[0.01]">
        <div className="container-full">
          <div className="flex items-center justify-center gap-8 py-4">
            <FooterTicker />
            {/* More tickers will go here */}
          </div>
        </div>
      </div>
    </footer>
  )
}
