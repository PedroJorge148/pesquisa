'use server'

import { prisma } from '@/db/prisma'
import { cache } from 'react'

export const getResearchByToken = cache(async (token: string) => {
  const research = await prisma.research.findFirst({
    where: {
      token,
    },
    include: {
      questionnaires: {
        include: {
          questions: {
            where: {
              isActive: true,
            },
            include: {
              option: true,
            },
          },
        },
      },
    },
  })

  if (!research) {
    throw new Error('Token not found!')
  }

  const normalizedResearch = {
    title: research.title,
    isOpen: research.isOpen,
    questions: research.questionnaires.flatMap((item) => item.questions),
  }

  return normalizedResearch ?? []
})
