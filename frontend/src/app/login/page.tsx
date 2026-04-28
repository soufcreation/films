'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setError(data.error || 'Erreur de connexion');
      }
    } catch (e) {
      setError('Erreur de connexion');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
        
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
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button type="submit" className="w-full bg-primary hover:bg-red-700 py-3 rounded font-semibold transition">
            Se connecter
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-400">
          Pas de compte? <Link href="/register" className="text-primary hover:underline">S'inscrire</Link>
        </p>
      </div>
    </main>
  );
}