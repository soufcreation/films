'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  username: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userStr));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-gray-400 text-sm">Nom d'utilisateur</label>
            <p className="text-xl">{user.username}</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <p className="text-xl">{user.email}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/history')}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition"
          >
            Historique
          </button>
          <button
            onClick={() => router.push('/favorites')}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition"
          >
            Mes Favoris
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition ml-auto"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </main>
  );
}