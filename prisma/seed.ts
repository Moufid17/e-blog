// import { prismaClientDB } from '@/app/lib/prismaClient'
import { PrismaClient } from '@prisma/client'
const prismaClientDB = new PrismaClient()
async function main() {
  
    const User1 = await prismaClientDB.user.upsert({
        where: { email: 'moufid.mtr@gmail.com' },
        update: {},
        create: {
          email: 'moufid.mtr@gmail.com',
          name: 'Moufid Mtr',
          posts: {
            create: {
              title: 'Check out Prisma with Next.js',
              description: "The easiest way to work with a database in Next.js/nQuery data from MySQL, PostgreSQL & SQL Server databases in Next.js apps with Prisma — a better ORM for JavaScript and TypeScript.",
            },
          },
        },
      })

    const User2 = await prismaClientDB.user.upsert({
        where: { email: 'moufid.moutarou.pro@gmail.com' },
        update: {},
        create: {
          email: 'moufid.moutarou.pro@gmail.com',
          name: 'Moufid Pro',
          posts: {
            create: [
                {
                    title: "Comment faire de bons formulaires en React ?",
                    description: "On dit qu'un développeur ne fait que des formulaires. Donc il vaut mieux savoir faire de bons formulaires et pour ça il faut comprendre les formulaires en React.",
                },
                {
                    title: 'React Query vs SWR',
                    description: "React Query et SWR sont deux librairies qui permettent de gérer les requêtes HTTP dans une application React. Dans cet article, nous allons les comparer et voir leurs avantages et inconvénients.",
                }
            ]
          },
        },
      })
  
  
  console.log({ User1, User2 })
}

main()
  .then(async () => {
    await prismaClientDB.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClientDB.$disconnect()
    process.exit(1)
  })