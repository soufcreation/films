import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Film, 
  Tv, 
  Users, 
  TrendingUp, 
  Plus,
  Settings,
  LogOut,
  BarChart3
} from 'lucide-react'

export default function AdminPage() {
  const stats = [
    { label: "Films", value: "1,234", icon: Film, trend: "+12%" },
    { label: "Séries", value: "856", icon: Tv, trend: "+8%" },
    { label: "Utilisateurs", value: "45.2K", icon: Users, trend: "+23%" },
    { label: "Vues ce mois", value: "892K", icon: TrendingUp, trend: "+15%" },
  ]

  const recentMovies = [
    { id: 1, title: "Dune: Part Two", status: "Publié", date: "2024-03-01" },
    { id: 2, title: "Oppenheimer", status: "Publié", date: "2024-02-28" },
    { id: 3, title: "The Batman 2", status: "Brouillon", date: "2024-02-25" },
    { id: 4, title: "Killers of the Flower Moon", status: "Publié", date: "2024-02-20" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header Admin */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-foreground">Administration</h1>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                StreamPlace
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-8">
        {/* Titre de la page */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Tableau de bord</h2>
          <p className="text-muted-foreground mt-2">Gérez votre contenu et suivez les performances</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border bg-card hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Contenu récent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMovies.map((movie) => (
                  <div key={movie.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-secondary rounded-md flex items-center justify-center">
                        <Film className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{movie.title}</p>
                        <p className="text-sm text-muted-foreground">{movie.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        movie.status === 'Publié' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {movie.status}
                      </span>
                      <Button variant="ghost" size="sm">Modifier</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un film
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Film className="w-4 h-4 mr-2" />
                Gérer la médiathèque
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Gérer les utilisateurs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Voir les statistiques
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Graphique placeholder */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl">Vues par mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-secondary/30 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Graphique des performances</p>
                <p className="text-sm text-muted-foreground">Intégration à venir</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
