'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Series {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: number;
  releaseDate?: string;
}

export default function SeriesPage() {
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/series')
      .then(res => res.json())
      .then(setSeries)
      .catch(() => {});
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Séries</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {series.map(s => (
          <Link key={s.id} href={`/series/${s.id}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
              {s.posterUrl ? (
                <img src={s.posterUrl} alt={s.title} className="w-full h-72 object-cover" />
              ) : (
                <div className="w-full h-72 bg-gray-700 flex items-center justify-center">No Image</div>
              )}
              <div className="p-4">
                <h3 className="font-semibold truncate">{s.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  {s.rating && <span className="text-yellow-400">★ {s.rating}</span>}
                  {s.releaseDate && (
                    <span className="text-gray-400 text-sm">
                      {new Date(s.releaseDate).getFullYear()}
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