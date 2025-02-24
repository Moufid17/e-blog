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