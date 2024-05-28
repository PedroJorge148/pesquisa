'use server'

import { prisma } from '@/db/prisma'
import { cache } from 'react'

export const getQuestionsByToken = cache(async (token: string) => {
  const questions = await prisma.research.findMany({
    where: {
      token,
    },
    include: {
      questionnaires: {
        include: {
          questions: {
            include: {
              Option: true,
            },
          },
        },
      },
    },
  })

  return questions ?? []
})
