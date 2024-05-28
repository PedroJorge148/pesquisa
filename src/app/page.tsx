import Image from 'next/image'
import { QuestionForm } from './question-form'
import { getQuestionsByToken } from '@/actions/get-question-by-token'

export default async function Home() {
  const questions = await getQuestionsByToken('ae02b7')

  console.log(questions)

  return (
    <div className="py-8 min-h-screen w-full flex items-center justify-start flex-col mx-auto max-w-4xl">
      <header className="bg-white rounded-lg w-full p-4 text-center">
        <div className="flex items-center justify-center flex-col gap-2">
          <Image
            src="/unimed_logo.png"
            alt=""
            width={150}
            height={55}
            quality={100}
          />
          <div className="space-y-2">
            <h1 className="font-bold">Pesquisa de Satisfação - AIS Sobral</h1>
            <span className="text-sm text-emerald-600/80">
              Questões com asterisco são obrigatórias!
            </span>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto mt-4">
        <QuestionForm />
      </main>
    </div>
  )
}
