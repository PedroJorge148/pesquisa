'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { StarRating } from '@/components/star-rating'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Option } from '@prisma/client'

interface Question {
  id: number
  questionnaireId: number
  questionTypeCod: string
  order: number
  required: boolean
  content: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date | null
  option: Option[]
}

interface QuestionFormProps {
  questions: Question[]
}

const createFormSchema = (questions: Question[]) => {
  // Initialize schemaShape as an empty object with keys as strings and values as any Zod schema type
  const schemaShape: Record<string, z.ZodTypeAny> = questions.reduce(
    (acc, question) => {
      // Declare a variable to hold the schema for the current question
      let questionSchema

      // Determine the type of schema to create based on the questionTypeCod
      switch (question.questionTypeCod) {
        case 'select':
          // For 'select' type questions, create a string schema with a minimum length of 1
          questionSchema = z.string().min(1, 'Selecione uma opção')
          break
        case 'rating':
          // For 'rating' type questions, create a number schema with a range between 1 and 5
          questionSchema = z.number().min(1).max(5)
          break
        case 'yes_not':
          // For 'yes_not' type questions, create an enum schema with 'yes' and 'not' as possible values
          questionSchema = z.enum(['yes', 'not'])
          break
        case 'textarea':
          // For 'textarea' type questions, create an optional string schema
          questionSchema = z.string().optional()
          break
        default:
          // For any other type of questions, create a generic Zod schema
          questionSchema = z.any()
      }

      // If the question is required, add additional validation
      if (question.required) {
        // If the question schema is a string, ensure it has a minimum length of 1
        if (questionSchema instanceof z.ZodString) {
          questionSchema = questionSchema.min(1, 'Campo obrigatório')
        } else {
          // For other schema types, refine the schema to ensure it is not an empty value
          questionSchema = questionSchema.refine(
            (value) => value !== '',
            'Campo obrigatório',
          )
        }
      }

      // Add the question schema to the accumulator object using the question ID as the key
      acc[`q${question.id}`] = questionSchema
      return acc
    },
    {} as Record<string, z.ZodTypeAny>,
  ) // Initialize the accumulator as an empty object with the appropriate type

  // Return a Zod object schema constructed from the schemaShape object
  return z.object(schemaShape)
}

export function QuestionForm({ questions }: QuestionFormProps) {
  const formSchema = createFormSchema(questions)

  type FormSchemaType = z.infer<typeof formSchema>

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: FormSchemaType) {
    try {
      console.log(values)
      toast.success('Formulário enviado com sucesso!')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Erro ao enviar formulário. Por favor, tente novamente.')
    }
  }

  return (
    <Form {...form}>
      <span className="text-black">
        {JSON.stringify(form.watch(), null, 2)}
      </span>
      <form
        className="flex flex-col gap-4 items-center justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {questions.map((question, i) => {
          return (
            <Card key={i} className="text-none w-full max-w-4xl">
              <CardContent>
                <FormField
                  control={form.control}
                  name={`q${question.id}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-base">
                        {question.order}ª) {question.content}{' '}
                        {question.required && '*'}
                      </FormLabel>
                      <FormControl>
                        <div>
                          {question.questionTypeCod === 'select' && (
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma opção" />
                              </SelectTrigger>
                              <SelectContent>
                                {question.option.map((option) => (
                                  <SelectItem
                                    key={option.id}
                                    value={String(option.id)}
                                  >
                                    {option.content}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}

                          {question.questionTypeCod === 'rating' && (
                            <StarRating onChange={field.onChange} />
                          )}

                          {question.questionTypeCod === 'yes_not' && (
                            <RadioGroup onValueChange={field.onChange}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes">Sim</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="not" id="not" />
                                <Label htmlFor="not">Não</Label>
                              </div>
                            </RadioGroup>
                          )}

                          {question.questionTypeCod === 'textarea' && (
                            <Textarea onChange={field.onChange} />
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )
        })}

        <Button className="w-72 uppercase p-4">Enviar</Button>
      </form>
    </Form>
  )
}
