# E-Blog
![](https://live.staticflickr.com/65535/54425742701_8399ce2754_b.jpg)
#### E-Blog est une application web de création d’article (Suggestion de Contenu par IA) | NextJs - Typescript - Prisma - NextAuth - MéterialUI
- Création d’article avec un wysiwyg épuré et suggestion de contenu avec assistance d’ia.
- Espace personnel (profil et analytics), page public d’auteur customisable (about-me).
- SSO et Conteneurisation
# Requirement :
- Create `.env` file and fill the parameters missing.

# Lancement projet

```bash
make up
make dpm  // Create migration (optional if db already exist)
make seed
make dev
```

# Arreter le projet
```bash
make down
```
# Generate Next auth secret
```bash
make secret
```

# Run Command in server
```bash
make bash
```

# Prisma Migration
- First migration
    ```bash
    make dpm
    ```
- Create migration after update
    ```bash
    make dbupdate
    make dpm
    ```

## Ressources
### Prisma
- [Prisma/postgres](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Prisma/NextJs](https://www.prisma.io/nextjs)
- [Prisma seed](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#seeding-your-database-with-typescript-or-javascript)
    ```
