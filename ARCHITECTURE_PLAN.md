# StreamPlace — Plan de projet V1

## Vision

Une plateforme de streaming personnelle, publique, où n'importe qui peut regarder des films et séries — et où toi + tes proches pouvez gérer le catalogue depuis un espace admin sécurisé.

---

## Contraintes

- 100% gratuit du début à la fin
- ~1000 vidéos prévues
- Pas de stockage vidéo : les vidéos restent hébergées sur YouTube, Vimeo ou Dropbox
- Accès admin discret : pas de bouton connexion visible, accès via `/login` directement

---

## Stack technique

| Élément | Choix | Raison |
|---|---|---|
| Frontend + Backend | Next.js 14 (App Router) | Stack habituelle, API Routes intégrées |
| Base de données | Supabase (PostgreSQL) | Gratuit, Auth intégré, RLS natif |
| Auth | Username + bcrypt + JWT (cookie httpOnly) | Pas d'email requis |
| Stockage thumbnails | Supabase Storage | Gratuit jusqu'à 1GB |
| Lecteur vidéo | react-player | Gère YouTube / Vimeo / Dropbox nativement |
| Déploiement | Vercel | Gratuit, compatible Next.js natif |

---

## Design

- **Ambiance** : dark mode type Netflix
- **Couleur d'accent** : rouge `#e50914`
- **Cards** : format portrait (ratio 2/3 — affiche de film)
- **Hover sur cards** : overlay sombre avec titre, catégorie, vues et bouton play
- **Navigation** : Accueil · Films · Séries · Populaires + barre de recherche
- **Pas de bouton connexion** pour les visiteurs (accès admin via `/login` uniquement)

---

## Schéma de base de données

```sql
videos (
  id          uuid PK,
  title       text,
  description text,
  video_url   text,        -- lien YouTube / Vimeo / Dropbox
  thumbnail_url text,      -- URL externe ou chemin Supabase Storage
  views       integer default 0,
  created_at  timestamp
)

categories (
  id    uuid PK,
  name  text,
  slug  text unique
)

video_categories (
  video_id    uuid FK → videos.id,
  category_id uuid FK → categories.id
)

admins (
  id         uuid PK,
  username   text unique,
  password   text,        -- hashé bcrypt, jamais stocké en clair
  created_at timestamp
)
```

> Les admins sont créés manuellement dans Supabase (toi + proches de confiance). Pas de page d'inscription publique.  
> RLS activée sur toutes les tables dès le départ.

---

## Pages

| Route | Accès | Description |
|---|---|---|
| `/` | Public | Accueil : hero + populaires + ajouts récents |
| `/films` | Public | Liste tous les films |
| `/series` | Public | Liste toutes les séries |
| `/populaires` | Public | Classement par nombre de vues |
| `/search` | Public | Recherche par titre + filtre catégorie |
| `/video/[id]` | Public | Lecteur + infos + compteur de vues |
| `/login` | Public | Connexion admin (discret, pas lié dans la nav) |
| `/admin` | Admin only | Dashboard : ajout / édition / suppression vidéos |

---

## Étapes de construction

### Étape 1 — Supabase
- Créer le projet Supabase
- Créer les tables `videos`, `categories`, `video_categories`
- Activer RLS sur toutes les tables
- Écrire les policies RLS (lecture publique, écriture admin uniquement)
- Créer le bucket Storage `thumbnails`

### Étape 2 — Auth + middleware
- Page `/login` : formulaire username + mot de passe (sans email)
- API Route `POST /api/auth/login` : vérifie username, compare mot de passe avec bcrypt, génère un JWT signé
- JWT stocké dans un cookie `httpOnly` (inaccessible depuis le JS client)
- Middleware Next.js : vérifie le cookie JWT sur toutes les routes `/admin/*`
- Vérification de session côté serveur uniquement

### Étape 3 — Interface admin
- Page `/admin` : tableau de bord avec liste des vidéos
- Formulaire ajout vidéo : titre, description, URL vidéo, catégorie, thumbnail (URL ou upload)
- Upload thumbnail vers Supabase Storage
- Édition et suppression de vidéos existantes

### Étape 4 — Page d'accueil
- Section hero : vidéo la plus populaire
- Section "Les plus populaires" : top 5 par vues
- Section "Ajouts récents" : 5 dernières vidéos ajoutées
- Cards format portrait avec overlay au survol

### Étape 5 — Page vidéo
- Lecteur react-player intégré (YouTube / Vimeo / Dropbox)
- Titre, description, catégorie, date d'ajout
- Compteur de vues incrémenté à chaque lecture
- Section vidéos similaires (même catégorie)

### Étape 6 — Recherche
- Barre de recherche dans la navbar
- Page `/search` : résultats filtrés par titre
- Filtre par catégorie sur la page de résultats

### Étape 7 — Polish
- Design responsive (mobile / desktop)
- Gestion des erreurs (vidéo introuvable, lecteur indisponible)
- Fallback si thumbnail manquante
- Optimisation des images (next/image)
- Prévention des projets Supabase inactifs (ping automatique)

---

## Sécurité

- Auth par username + mot de passe hashé bcrypt — pas d'email requis
- JWT signé stocké en cookie `httpOnly` — inaccessible depuis le JavaScript client
- Sessions vérifiées côté serveur via middleware Next.js
- Admins créés manuellement dans Supabase — pas d'inscription publique
- RLS activée sur toutes les tables dès l'Étape 1
- Clés Supabase dans `.env.local` en dev, secrets Vercel en production
- Aucune clé secrète dans le code ou les logs

---

## Budget

| Service | Plan | Coût |
|---|---|---|
| Supabase | Free tier (500MB DB, 1GB Storage) | 0€ |
| Vercel | Hobby (déploiements illimités) | 0€ |
| YouTube / Vimeo / Dropbox | Hébergement vidéo externe | 0€ |
| **Total** | | **0€/mois** |

> Limite à surveiller : Supabase suspend les projets inactifs après 7 jours sur le plan gratuit.  
> Solution : requête ping automatique configurée en Étape 7.

---

## Ce qui n'est PAS dans la V1

- Système de commentaires ou notation
- Profils utilisateurs publics
- Notifications
- Lecture continue / autoplay entre épisodes
- Application mobile

---

## Critères de succès V1

- [ ] Visiteur peut naviguer et regarder sans compte
- [ ] Admin peut se connecter via `/login`
- [ ] Admin peut ajouter / éditer / supprimer une vidéo
- [ ] Recherche par titre fonctionnelle
- [ ] Compteur de vues opérationnel
- [ ] Thumbnails affichées (URL externe ou upload)
- [ ] Responsive mobile et desktop
- [ ] Déployé sur Vercel avec domaine custom
