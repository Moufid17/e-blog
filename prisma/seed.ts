import { PrismaClient } from '@prisma/client'
const prismaClientDB = new PrismaClient()
async function main() {
  const CATEGORIES = [
    {
      name: 'UX/UI',
      color: "success.solidDisabledBg.solidColor",
    },
    {
      name: 'Frontend Developer',
      color: "	success.solidDisabledBg.solidColor",
    },
    {
      name: 'Backend Developer',
      color: "neutral.solidBg.solidColor",
    },
    {
      name: 'DevOps',
      color: "success.solidBg.solidColor",
    },
    {
      name: 'Data Science',
      color: "primary.solidDisabledBg.solidColor",
    },
    {
      name: 'SQL',
      color: "neutral.solidDisabledBg.solidColor",
    },
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