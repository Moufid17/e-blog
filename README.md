# E-Blog
![](https://live.staticflickr.com/65535/54425742701_8399ce2754_b.jpg)
#### E-Blog est une application web de création d’article (Suggestion de Contenu par IA) | NextJs - Typescript - Prisma - NextAuth - MéterialUI
- Création d’article avec un wysiwyg épuré et suggestion de contenu avec assistance d’ia.
- Espace personnel (profil et analytics), page public d’auteur customisable (about-me).
- SSO et Conteneurisation

### Requirement :
- Create `.env` file and fill the parameters missing.

### Commands

```bash
make secret // Generate Next auth secret
```

```bash
make up   // Up container
make dpm  // Create migration ( optional if db already exist )
make seed // Populate categories table in database
make dev  // Run locally
```

```bash
make down // Stop Container
make bash // Access to container terminal
```

# Database Migration commande
>Create migration after update
```bash
make dbupdate
make dpm
```

## Ressources
- [Prisma seed](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#seeding-your-database-with-typescript-or-javascript)