'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Favorite {
  id: string;
  movie?: { id: string; title: string; posterUrl?: string };
  series?: { id: string; title: string; posterUrl?: string };
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('http://localhost:3001/api/favorites', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setFavorites)
      .catch(() => {});
  }, [router]);

  const removeFavorite = async (id: string) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3001/api/favorites/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setFavorites(favorites.filter(f => f.id !== id));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mes Favoris</h1>
      
      {favorites.length === 0 ? (
        <p className="text-gray-400">Aucun favori pour le moment</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map(fav => {
            const content = fav.movie || fav.series;
            if (!content) return null;
            const link = fav.movie ? `/movies/${fav.movie.id}` : `/series/${fav.series!.id}`;

            return (
              <div key={fav.id} className="relative group">
                <Link href={link}>
                  <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
                    {content.posterUrl ? (
                      <img src={content.posterUrl} alt={content.title} className="w-full h-64 object-cover" />
                    ) : (
                      <div className="w-full h-64 bg-gray-700 flex items-center justify-center">No Image</div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold truncate">{content.title}</h3>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}