import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-foreground">StreamPlace</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </Link>
            <Link 
              href="/catalog" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Catalogue
            </Link>
            <Link 
              href="/categories" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Catégories
            </Link>
            <Link 
              href="/my-list" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Ma liste
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Connexion
            </Button>
            
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              S'abonner
            </Button>

            {/* Menu mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
