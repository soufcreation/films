'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Series {
  id: string;
  title: string;
  description?: string;
  posterUrl?: string;
  backdropUrl?: string;
  releaseDate?: string;
  rating?: number;
  genres?: { name: string }[];
  seasons?: Season[];
}

interface Season {
  id: string;
  number: number;
  episodes?: Episode[];
}

interface Episode {
  id: string;
  number: number;
  title?: string;
  videoUrl?: string;
}

export default function SeriesDetail() {
  const { id } = useParams();
  const [series, setSeries] = useState<Series | null>(null);
  const [selectedSeason, setSelectedSeason] = useState(0);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/series/${id}`)
        .then(res => res.json())
        .then(data => {
          setSeries(data);
          if (data.seasons?.length > 0) setSelectedSeason(data.seasons[0].number);
        })
        .catch(() => {});
    }
  }, [id]);

  if (!series) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  const currentSeason = series.seasons?.find(s => s.number === selectedSeason);

  return (
    <main className="min-h-screen">
      {series.backdropUrl && (
        <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${series.backdropUrl})` }}>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8 -mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {series.posterUrl ? (
            <img src={series.posterUrl} alt={series.title} className="w-64 rounded-lg shadow-lg" />
          ) : (
            <div className="w-64 h-96 bg-gray-700 rounded-lg flex items-center justify-center">No Image</div>
          )}
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{series.title}</h1>
            {series.releaseDate && (
              <p className="text-gray-400 mb-2">{new Date(series.releaseDate).getFullYear()}</p>
            )}
            {series.rating && <p className="text-yellow-400 text-xl mb-4">★ {series.rating}/10</p>}
            {series.genres && (
              <div className="flex gap-2 mb-4">
                {series.genres.map(g => (
                  <span key={g.name} className="bg-gray-700 px-3 py-1 rounded-full text-sm">{g.name}</span>
                ))}
              </div>
            )}
            {series.description && <p className="text-gray-300 leading-relaxed mb-6">{series.description}</p>}
            
            {series.seasons && series.seasons.length > 0 && (
              <div>
                <div className="flex gap-2 mb-4">
                  {series.seasons.map(s => (
                    <button
                      key={s.number}
                      onClick={() => setSelectedSeason(s.number)}
                      className={`px-4 py-2 rounded ${selectedSeason === s.number ? 'bg-primary' : 'bg-gray-700'}`}
                    >
                      Saison {s.number}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  {currentSeason?.episodes?.map(ep => (
                    <Link key={ep.id} href={`/watch/series/${series.id}/episode/${ep.id}`}>
                      <div className="bg-gray-800 p-4 rounded hover:bg-gray-700 transition cursor-pointer">
                        <span className="font-semibold">Épisode {ep.number}</span>
                        {ep.title && <span className="ml-2 text-gray-300">{ep.title}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}