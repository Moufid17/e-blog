import { PrismaClient } from '@prisma/client'
const prismaClientDB = new PrismaClient()
async function main() {
  const CATEGORIES = [
    {
      name: 'UX/UI',
      color: "success.solidDisabledBg",
    },
    {
      name: 'Frontend Developer',
      color: "success.solidDisabledBg",
    },
    {
      name: 'Backend Developer',
      color: "neutral.solidBg",
    },
    {
      name: 'DevOps',
      color: "success.solidBg",
    },
    {
      name: 'Data Science',
      color: "primary.solidDisabledBg",
    }
  ]

  CATEGORIES.map(async (category) => {
    await prismaClientDB.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  })
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