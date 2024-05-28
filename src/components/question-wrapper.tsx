import { ReactNode } from 'react'

interface QuestionWrapperProps {
  title: string
  children: ReactNode
}

export function QuestionWrapper({ title, children }: QuestionWrapperProps) {
  return (
    <div className="bg-white rounded-lg w-full p-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">{title}</h3>
        {children}
      </div>
    </div>
  )
}
