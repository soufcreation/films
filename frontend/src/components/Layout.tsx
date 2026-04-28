'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Filmm
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary transition">Accueil</Link>
            <Link href="/movies" className="hover:text-primary transition">Films</Link>
            <Link href="/series" className="hover:text-primary transition">Séries</Link>
            <Link href="/search" className="hover:text-primary transition">Recherche</Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <Link href="/" className="block px-4 py-2 hover:text-primary">Accueil</Link>
            <Link href="/movies" className="block px-4 py-2 hover:text-primary">Films</Link>
            <Link href="/series" className="block px-4 py-2 hover:text-primary">Séries</Link>
            <Link href="/search" className="block px-4 py-2 hover:text-primary">Recherche</Link>
          </div>
        )}
      </header>

      <main className="pt-16">{children}</main>

      <footer className="bg-gray-900 mt-20 py-8 text-center text-gray-400">
        <p>&copy; 2026 Filmm - Tous droits réservés</p>
      </footer>
    </div>
  );
}