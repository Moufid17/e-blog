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

- Setup Prisma :
    ```bash
    make bash
    npm install prisma --save-dev
    npx prisma init
    ```
- [PrismaAdapter](https://authjs.dev/reference/adapter/prisma)
    - Erreur de type avec l'adapter : 
        ```tsx
        import type { Adapter } from "next-auth/adapters";
        ...
        const prisma = new PrismaClient()
        const authOptions : NextAuthOptions = {
            adapter: PrismaAdapter(prisma) as Adapter,
            ...
        }
        ```
- [Prisma `Connect` keyword: Associate an existing record to another existing record](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations#associate-an-existing-record-to-another-existing-record)
    ```
    const Post1 = await prismaClientDB.post.create({
        data: {
          title: "Comment faire de bons formulaires en React ?",
           description: "On dit qu'un développeur ne fait que des formulaires. Donc il vaut mieux savoir faire de bons formulaires et pour ça il faut comprendre les formulaires en React.",
            owner: {
                connect: { email: 'moufid.mtr@gmail.com' },
            },  
        }
    })
    ```