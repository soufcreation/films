'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error || 'Identifiants incorrects')
    }

    setLoading(false)
  }

  return (
    <main style={{ background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a1a1a', border: '0.5px solid #2a2a2a', borderRadius: '12px', padding: '40px', width: '100%', maxWidth: '380px' }}>
        <h1 style={{ color: '#e50914', fontSize: '22px', fontWeight: '500', marginBottom: '8px' }}>StreamPlace</h1>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '28px' }}>Accès administration</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '6px' }}>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ width: '100%', background: '#111', border: '0.5px solid #2a2a2a', borderRadius: '8px', padding: '10px 12px', color: '#e8e8e8', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '6px' }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', background: '#111', border: '0.5px solid #2a2a2a', borderRadius: '8px', padding: '10px 12px', color: '#e8e8e8', fontSize: '14px' }}
            />
          </div>

          {error && (
            <p style={{ color: '#e50914', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#e50914', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </main>
  )
}