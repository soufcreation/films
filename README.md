# Filmm - Plateforme de Streaming Films et Séries

## Description
Filmm est une plateforme de streaming complète pour films et séries, construite avec Next.js, Node.js/Express, et PostgreSQL.

## Stack Technique
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Base de données**: PostgreSQL
- **Cache**: Redis
- **Stockage**: MinIO (S3-compatible) ou AWS S3
- **Streaming**: HLS (HTTP Live Streaming)
- **Métadonnées**: API Wikipedia (gratuite, sans compte)

## Structure du Projet
```
filmm/
├── frontend/          # Next.js frontend
├── backend/           # Express API backend
├── docker/            # Docker compose config
├── docs/              # Documentation
└── README.md
```

## Installation

### Prérequis
- Node.js 18+
- PostgreSQL
- Redis (optionnel pour dev)
- Docker (pour les services)

### Setup
1. Cloner le repo et installer les dépendances:
```bash
cd frontend && npm install
cd ../backend && npm install
```

2. Configurer les variables d'environnement:
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

3. Lancer les services avec Docker:
```bash
cd docker && docker-compose up -d
```

4. Lancer le backend:
```bash
cd backend && npm run dev
```

5. Lancer le frontend:
```bash
cd frontend && npm run dev
```

## Scripts Disponibles

### Frontend
- `npm run dev` - Démarrer en mode développement
- `npm run build` - Build de production
- `npm run start` - Démarrer en production
- `npm run lint` - Linter

### Backend
- `npm run dev` - Démarrer en mode développement (avec hot-reload)
- `npm run build` - Compiler TypeScript
- `npm run start` - Démarrer en production
- `npm run prisma:generate` - Générer le client Prisma
- `npm run prisma:migrate` - Lancer les migrations

## Fonctionnalités Implémentées
✅ Authentification (inscription/connexion)
✅ Catalogue films et séries
✅ Recherche avec filtres
✅ Pages de détail films/séries
✅ Lecteur vidéo HLS
✅ Historique de visionnage
✅ Favoris
✅ Interface d'administration
✅ Saisie manuelle des métadonnées

## Phase d'Implémentation
✅ Phase 1: Initialisation du projet
✅ Phase 2: Base de données et modèles
✅ Phase 3: Backend API - Auth + CRUD
✅ Phase 4: Système de Streaming HLS
✅ Phase 5: Frontend - Pages Principales
✅ Phase 6: Frontend - Espace Utilisateur
✅ Phase 7: Administration
✅ Phase 8: Optimisation et Déploiement

## Licence
Projet sous licence ISC

## ⚠️ Note Légale
Vérifiez que vous avez les droits de distribution pour tout contenu ajouté à la plateforme.