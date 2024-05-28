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

const formSchema = z.any()

type FormSchemaType = z.infer<typeof formSchema>

export function QuestionForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: FormSchemaType) {
    console.log(values)
    form.reset()
    toast.success('Formulário enviado com sucesso!')
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 items-center justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="text-none w-full max-w-4xl">
          <CardContent>
            <FormField
              control={form.control}
              name="q1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base">
                    1ª) Qual é o nome do profissional que lhe atendeu? *
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DR. FERNANDO (ENDOCRINOLOGISTA)">
                          DR. FERNANDO (ENDOCRINOLOGISTA)
                        </SelectItem>
                        <SelectItem value="DRA. ANDREA (ALERGOLOGISTA)">
                          DRA. ANDREA (ALERGOLOGISTA)
                        </SelectItem>
                        <SelectItem value="DR. DANILO (PNEUMO PEDIATRA)">
                          DR. DANILO (PNEUMO PEDIATRA)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="text-none w-full max-w-4xl">
          <CardContent>
            <FormField
              control={form.control}
              name="q1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base">
                    2ª) Qual nota você dar para os horários disponíveis para o
                    agendamento da consulta (ou procedimento)? *
                  </FormLabel>
                  <FormControl>
                    <StarRating />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="text-none w-full max-w-4xl">
          <CardContent>
            <FormField
              control={form.control}
              name="q1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base">
                    3ª) Você gostou do seu atendimento? *
                  </FormLabel>
                  <FormControl>
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Não</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="text-none w-full max-w-4xl">
          <CardContent>
            <FormField
              control={form.control}
              name="q1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base">
                    4ª) De modo geral, qual nota você dar aos nossos serviços? *
                  </FormLabel>
                  <FormControl>
                    <StarRating />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="text-none w-full max-w-4xl">
          <CardContent>
            <FormField
              control={form.control}
              name="q1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base">
                    5ª) Sugestões, críticas ou elogios:
                  </FormLabel>
                  <FormControl>
                    <Textarea />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button className="w-72 uppercase p-4">Enviar</Button>
      </form>
    </Form>
  )
}
