'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/movies')
      .then(res => res.json())
      .then(setMovies)
      .catch(() => {});

    fetch('http://localhost:3001/api/series')
      .then(res => res.json())
      .then(setSeries)
      .catch(() => {});
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Films Populaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.slice(0, 10).map(movie => (
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

      <section>
        <h2 className="text-3xl font-bold mb-6">Séries Populaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {series.slice(0, 10).map(s => (
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
    </main>
  );
}