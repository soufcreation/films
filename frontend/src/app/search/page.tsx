'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Movie {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: number;
}

interface Series {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: number;
}

interface SearchResult {
  movies: Movie[];
  series: Series[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({ movies: [], series: [] });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Recherche</h1>
      
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Rechercher un film ou une série..."
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-primary hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? 'Recherche...' : 'Rechercher'}
        </button>
      </div>

      {results.movies.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Films</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.movies.map(movie => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
                  {movie.posterUrl ? (
                    <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gray-700 flex items-center justify-center">No Image</div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold truncate">{movie.title}</h3>
                    {movie.rating && <p className="text-yellow-400">★ {movie.rating}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.series.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Séries</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.series.map(s => (
              <Link key={s.id} href={`/series/${s.id}`}>
                <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
                  {s.posterUrl ? (
                    <img src={s.posterUrl} alt={s.title} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gray-700 flex items-center justify-center">No Image</div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold truncate">{s.title}</h3>
                    {s.rating && <p className="text-yellow-400">★ {s.rating}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}