# Deno REST API with PostgreSQL

Une API REST simple construite avec Deno et PostgreSQL pour gérer des utilisateurs.

## Prérequis

- [Deno](https://deno.com/) installé
- [PostgreSQL](https://www.postgresql.org/) installé et en cours d'exécution

## Installation

1. Clonez ce repository
2. Installez les dépendances (aucune installation nécessaire avec Deno)
3. Configurez votre base de données dans le fichier `.env`

## Configuration

Modifiez le fichier `.env` avec vos paramètres PostgreSQL :

```env
PG_HOST=localhost
PG_USER=votre_utilisateur
PG_PASSWORD=votre_mot_de_passe
PG_DATABASE=votre_base_de_donnees
PG_PORT=5432
```

## Démarrage

```bash
deno run --allow-net --allow-read --allow-env main.ts
```

Le serveur démarrera sur http://localhost:8000

## API Endpoints

### GET /users
Retourne tous les utilisateurs.

**Exemple de réponse :**
```json
[
  {
    "id": 1,
    "name": "Alice"
  },
  {
    "id": 2,
    "name": "Bob"
  }
]
```

### POST /users
Crée un nouvel utilisateur.

**Corps de la requête :**
```json
{
  "name": "John Doe"
}
```

**Réponse :** `User created` (status 201)

## Structure du projet

- `main.ts` - Point d'entrée de l'application et serveur HTTP
- `db.ts` - Configuration de la connexion PostgreSQL
- `.env` - Variables d'environnement pour la configuration

## Technologies utilisées

- [Deno](https://deno.com/) - Runtime JavaScript/TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Base de données
- [Deno PostgreSQL](https://deno.land/x/postgres) - Client PostgreSQL pour Deno

## Permissions Deno

L'application nécessite les permissions suivantes :
- `--allow-net` : Pour les connexions réseau (serveur HTTP et PostgreSQL)
- `--allow-read` : Pour lire le fichier `.env`
- `--allow-env` : Pour accéder aux variables d'environnement
