'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo et titre */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary tracking-tight">StreamPlace</h1>
          <p className="text-muted-foreground text-sm">Plateforme de streaming cinématographique</p>
        </div>

        {/* Carte de connexion */}
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Connexion</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Accédez à votre espace administration
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Nom d'utilisateur
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Entrez votre nom d'utilisateur"
                  className="bg-secondary/50 border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Entrez votre mot de passe"
                  className="bg-secondary/50 border-border focus:border-primary transition-colors"
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive text-sm font-medium">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200"
                size="lg"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Pied de page */}
        <p className="text-center text-xs text-muted-foreground">
          © 2026 StreamPlace. Tous droits réservés.
        </p>
      </div>
    </main>
  )
}