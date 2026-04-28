'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Movie {
  id: string;
  title: string;
  description?: string;
  posterUrl?: string;
  backdropUrl?: string;
  releaseDate?: string;
  rating?: number;
  duration?: number;
  genres?: { name: string }[];
  videoUrl?: string;
}

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/movies/${id}`)
        .then(res => res.json())
        .then(setMovie)
        .catch(() => {});
    }
  }, [id]);

  if (!movie) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <main className="min-h-screen">
      {movie.backdropUrl && (
        <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${movie.backdropUrl})` }}>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8 -mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {movie.posterUrl ? (
            <img src={movie.posterUrl} alt={movie.title} className="w-64 rounded-lg shadow-lg" />
          ) : (
            <div className="w-64 h-96 bg-gray-700 rounded-lg flex items-center justify-center">No Image</div>
          )}
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            {movie.releaseDate && (
              <p className="text-gray-400 mb-2">{new Date(movie.releaseDate).getFullYear()}</p>
            )}
            {movie.rating && <p className="text-yellow-400 text-xl mb-4">★ {movie.rating}/10</p>}
            {movie.duration && <p className="text-gray-300 mb-4">{movie.duration} min</p>}
            {movie.genres && (
              <div className="flex gap-2 mb-4">
                {movie.genres.map(g => (
                  <span key={g.name} className="bg-gray-700 px-3 py-1 rounded-full text-sm">{g.name}</span>
                ))}
              </div>
            )}
            {movie.description && <p className="text-gray-300 leading-relaxed">{movie.description}</p>}
            
            {movie.videoUrl && (
              <Link href={`/watch/movie/${movie.id}`}>
                <button className="mt-6 bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                  ▶ Regarder
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}