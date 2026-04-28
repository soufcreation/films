'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HistoryItem {
  id: string;
  progress: number;
  movie?: { id: string; title: string; posterUrl?: string };
  series?: { id: string; title: string; posterUrl?: string };
  episode?: { id: string; title?: string };
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/login');
      return;
    }
    setToken(t);

    fetch('http://localhost:3001/api/watch-history', {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then(res => res.json())
      .then(setHistory)
      .catch(() => {});
  }, [router]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Continuer à regarder</h1>
      
      {history.length === 0 ? (
        <p className="text-gray-400">Aucun historique de visionnage</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {history.map(item => {
            const content = item.movie || item.series;
            if (!content) return null;
            const link = item.movie 
              ? `/watch/movie/${item.movie.id}`
              : item.episode 
                ? `/watch/series/${item.series!.id}/episode/${item.episode.id}`
                : '#';

            return (
              <Link key={item.id} href={link}>
                <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
                  {content.posterUrl ? (
                    <img src={content.posterUrl} alt={content.title} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gray-700 flex items-center justify-center">No Image</div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold truncate">{content.title}</h3>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div 
                        className="bg-primary h-1 rounded-full" 
                        style={{ width: `${item.progress * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}