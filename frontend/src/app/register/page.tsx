'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setError(data.error || 'Erreur d\'inscription');
      }
    } catch (e) {
      setError('Erreur d\'inscription');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Inscription</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button type="submit" className="w-full bg-primary hover:bg-red-700 py-3 rounded font-semibold transition">
            S'inscrire
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-400">
          Déjà un compte? <Link href="/login" className="text-primary hover:underline">Se connecter</Link>
        </p>
      </div>
    </main>
  );
}