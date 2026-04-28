import Image from "next/image";
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Données fictives pour la démo
const featuredMovies = [
  {
    id: 1,
    title: "Inception",
    image: "/movies/inception.jpg",
    year: 2010,
    rating: 8.8,
    genre: "Science-Fiction"
  },
  {
    id: 2,
    title: "The Dark Knight",
    image: "/movies/dark-knight.jpg",
    year: 2008,
    rating: 9.0,
    genre: "Action"
  },
  {
    id: 3,
    title: "Interstellar",
    image: "/movies/interstellar.jpg",
    year: 2014,
    rating: 8.6,
    genre: "Aventure"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    image: "/movies/pulp-fiction.jpg",
    year: 1994,
    rating: 8.9,
    genre: "Thriller"
  },
  {
    id: 5,
    title: "The Matrix",
    image: "/movies/matrix.jpg",
    year: 1999,
    rating: 8.7,
    genre: "Science-Fiction"
  },
  {
    id: 6,
    title: "Fight Club",
    image: "/movies/fight-club.jpg",
    year: 1999,
    rating: 8.8,
    genre: "Drame"
  }
]

const categories = ["Tendances", "Action", "Science-Fiction", "Drame", "Comédie", "Thriller"]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section avec gradient */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background avec overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        
        {/* Image de fond (à remplacer par une vraie image) */}
        <div className="absolute inset-0 bg-secondary/20">
          <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40" />
        </div>

        {/* Contenu Hero */}
        <div className="relative z-20 container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                NOUVEAU
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                StreamPlace
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Votre univers cinématographique
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Découvrez des milliers de films et séries. Une expérience de streaming 
              immersive avec une qualité exceptionnelle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Commencer à regarder
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-accent">
                En savoir plus
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border/50">
              <div>
                <p className="text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Films & Séries</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">4K</p>
                <p className="text-sm text-muted-foreground">Qualité vidéo</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Disponibilité</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "secondary"}
              size="sm"
              className="rounded-full whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Section Films en vedette */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Films en vedette</h2>
            <p className="text-muted-foreground mt-2">Sélectionnés pour vous</p>
          </div>
          <Button variant="link" className="text-primary">
            Voir tout →
          </Button>
        </div>

        {/* Grille de films */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredMovies.map((movie) => (
            <Card key={movie.id} className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <CardContent className="p-0">
                {/* Image du film (placeholder) */}
                <div className="relative aspect-[2/3] bg-secondary overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Placeholder pour l'image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                    <span className="text-4xl font-bold text-muted-foreground/30">
                      {movie.title.charAt(0)}
                    </span>
                  </div>

                  {/* Badge rating */}
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded-md">
                    <span className="text-xs font-semibold text-yellow-500">★ {movie.rating}</span>
                  </div>

                  {/* Overlay au hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" className="rounded-full bg-primary/90 hover:bg-primary">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Infos film */}
                <div className="p-4 space-y-1">
                  <h3 className="font-semibold text-sm text-foreground truncate">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.genre}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 p-12 md:p-16 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Prêt pour le cinéma ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Rejoignez des millions d'utilisateurs et profitez d'un catalogue illimité 
              de films et séries en haute qualité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                S'abonner maintenant
              </Button>
              <Button size="lg" variant="outline">
                Voir les plans
              </Button>
            </div>
          </div>
          
          {/* Éléments décoratifs */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-primary/5 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="border-t border-border/50 py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-foreground">StreamPlace</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 StreamPlace. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
              Confidentialité
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
              Conditions
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
