'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Movie {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: number;
  releaseDate?: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/movies')
      .then(res => res.json())
      .then(setMovies)
      .catch(() => {});
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Films</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
              {movie.posterUrl ? (
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-72 object-cover" />
              ) : (
                <div className="w-full h-72 bg-gray-700 flex items-center justify-center">No Image</div>
              )}
              <div className="p-4">
                <h3 className="font-semibold truncate">{movie.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  {movie.rating && <span className="text-yellow-400">★ {movie.rating}</span>}
                  {movie.releaseDate && (
                    <span className="text-gray-400 text-sm">
                      {new Date(movie.releaseDate).getFullYear()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}