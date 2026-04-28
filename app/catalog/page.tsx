import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react"

const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    image: "/api/placeholder/300/450",
    duration: "2h 28m",
    quality: "4K",
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    image: "/api/placeholder/300/450",
    duration: "2h 32m",
    quality: "4K",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    image: "/api/placeholder/300/450",
    duration: "2h 49m",
    quality: "4K",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    rating: 8.9,
    image: "/api/placeholder/300/450",
    duration: "2h 34m",
    quality: "1080p",
  },
  {
    id: 5,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    image: "/api/placeholder/300/450",
    duration: "2h 16m",
    quality: "4K",
  },
  {
    id: 6,
    title: "Fight Club",
    year: 1999,
    genre: "Drama",
    rating: 8.8,
    image: "/api/placeholder/300/450",
    duration: "2h 19m",
    quality: "1080p",
  },
  {
    id: 7,
    title: "Parasite",
    year: 2019,
    genre: "Thriller",
    rating: 8.5,
    image: "/api/placeholder/300/450",
    duration: "2h 12m",
    quality: "4K",
  },
  {
    id: 8,
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action",
    rating: 8.4,
    image: "/api/placeholder/300/450",
    duration: "3h 1m",
    quality: "4K",
  },
  {
    id: 9,
    title: "Joker",
    year: 2019,
    genre: "Drama",
    rating: 8.4,
    image: "/api/placeholder/300/450",
    duration: "2h 2m",
    quality: "4K",
  },
  {
    id: 10,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    rating: 9.2,
    image: "/api/placeholder/300/450",
    duration: "2h 55m",
    quality: "4K",
  },
  {
    id: 11,
    title: "Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    image: "/api/placeholder/300/450",
    duration: "2h 22m",
    quality: "4K",
  },
  {
    id: 12,
    title: "Whiplash",
    year: 2014,
    genre: "Drama",
    rating: 8.5,
    image: "/api/placeholder/300/450",
    duration: "1h 46m",
    quality: "1080p",
  },
]

const genres = ["All", "Action", "Sci-Fi", "Drama", "Crime", "Thriller"]
const years = ["All", "2020s", "2010s", "2000s", "1990s", "1980s"]
const qualities = ["All", "4K", "1080p", "720p"]

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-16 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Catalog</h1>
              <p className="text-muted-foreground mt-1">
                {movies.length} movies available
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-6 items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters:</span>
            </div>

            {/* Genre Filter */}
            <Select defaultValue="All">
              <SelectTrigger className="w-[140px] bg-background/50 border-border/50">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Filter */}
            <Select defaultValue="All">
              <SelectTrigger className="w-[140px] bg-background/50 border-border/50">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Quality Filter */}
            <Select defaultValue="All">
              <SelectTrigger className="w-[140px] bg-background/50 border-border/50">
                <SelectValue placeholder="Quality" />
              </SelectTrigger>
              <SelectContent>
                {qualities.map((quality) => (
                  <SelectItem key={quality} value={quality}>
                    {quality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select defaultValue="rating">
              <SelectTrigger className="w-[160px] bg-background/50 border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="year-desc">Newest First</SelectItem>
                <SelectItem value="year-asc">Oldest First</SelectItem>
                <SelectItem value="title">A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <span className="text-6xl opacity-20">🎬</span>
                </div>

                {/* Quality Badge */}
                <Badge className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm border-0 text-xs">
                  {movie.quality}
                </Badge>

                {/* Rating */}
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs font-medium">{movie.rating}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Watch Now
                  </Button>
                </div>
              </div>

              <CardContent className="p-3">
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                </div>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {movie.genre}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 hover:border-primary/50"
          >
            Load More Movies
          </Button>
        </div>
      </section>
    </div>
  )
}
