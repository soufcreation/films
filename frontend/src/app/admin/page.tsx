'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchWikipedia, getWikipediaMovie } from '@/lib/wikipedia';

interface Stats {
  totalMovies: number;
  totalSeries: number;
  totalUsers: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({ totalMovies: 0, totalSeries: 0, totalUsers: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    fetch('http://localhost:3001/api/movies')
      .then(res => res.json())
      .then(movies => setStats(prev => ({ ...prev, totalMovies: movies.length })))
      .catch(() => {});
    fetch('http://localhost:3001/api/series')
      .then(res => res.json())
      .then(series => setStats(prev => ({ ...prev, totalSeries: series.length })))
      .catch(() => {});
  }, [router, token]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const results = await searchWikipedia(searchQuery);
      setSearchResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const importMovie = async (title: string) => {
    try {
      const movieData = await getWikipediaMovie(title);
      alert(`Film trouvé: ${movieData.title}\nDescription: ${movieData.description?.substring(0, 100)}...`);
      // Ici vous pourriez ouvrir un modal pour confirmer l'import
    } catch (e) {
      alert('Erreur lors de la récupération');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Administration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Films</h3>
          <p className="text-4xl font-bold text-primary">{stats.totalMovies}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Séries</h3>
          <p className="text-4xl font-bold text-primary">{stats.totalSeries}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Utilisateurs</h3>
          <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Recherche Wikipedia</h2>
        <p className="text-gray-400 mb-4">Recherchez des films ou séries sur Wikipedia pour importer les métadonnées</p>
        
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Rechercher sur Wikipedia..."
            className="flex-1 bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-primary hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-2">Résultats</h3>
            {searchResults.map((result: any) => (
              <div key={result.pageid} className="bg-gray-700 p-4 rounded flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{result.title}</h4>
                  <p className="text-gray-400 text-sm">{result.snippet?.replace(/<[^>]*>/g, '')}</p>
                </div>
                <button
                  onClick={() => importMovie(result.title)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                >
                  Importer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Gestion du contenu</h2>
        <div className="space-y-4">
          <button className="bg-primary hover:bg-red-700 px-6 py-3 rounded-lg transition">
            Ajouter un film
          </button>
          <button className="bg-primary hover:bg-red-700 px-6 py-3 rounded-lg transition ml-4">
            Ajouter une série
          </button>
        </div>
      </div>
    </main>
  );
}