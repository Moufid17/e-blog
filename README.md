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