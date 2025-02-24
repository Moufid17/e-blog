import { PrismaClient } from '@prisma/client'
const prismaClientDB = new PrismaClient()
async function main() {
  const CATEGORIES = [
    {
      name: 'UX/UI',
      color: "primary.solidDisabledBg",
    },
    {
      name: 'Frontend Developer',
      color: "success.solidDisabledBg",
    },
    {
      name: 'Backend Developer',
      color: "neutral.solidDisabledBg",
    },
    {
      name: 'DevOps',
      color: "warning.solidDisabledBg",
    },
    {
      name: 'Data Science',
      color: "info.solidDisabledBg",
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