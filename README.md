# E-Blog
![](https://live.staticflickr.com/65535/54425742701_8399ce2754_b.jpg)
#### E-Blog est une application web de création d’article (Suggestion de Contenu par IA) | NextJs - Typescript - Prisma - NextAuth - MéterialUI
- Création d’article avec un wysiwyg épuré et suggestion de contenu avec assistance d’ia.
- Espace personnel (profil et analytics), page public d’auteur customisable (about-me).
- SSO et Conteneurisation
# Requirement :
- Create `.env`
- Create `.env.local`
- [Google sso configuration](https://shorturl.at/mpCV6)
    - Authorized URL            : `http://localhost:3000`
    - Authorized redirect URL   : `http://localhost:3000/api/auth/callback/google`

# Lancement projet

```bash
make up
make dpm // Create migration (optional if db already exist)
make dev
```

# Arreter le projet
```bash
make down
```
# Generate Next auth secret
```bash
make next_secret
```

# Run Command in server
```bash
make bash
```

# Generate Prisma Migration
```bash
make dpm
```

## Ressources
### Prisma
- [Prisma/postgres](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Prisma/NextJs](https://www.prisma.io/nextjs)
- [Prisma seed](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#seeding-your-database-with-typescript-or-javascript)
    ```
