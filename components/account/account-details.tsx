"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

import { UpdateAccountType, updateAccountSchema } from "@/contracts/account"
import { useUser } from "@/lib/api/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRequest } from "ahooks"
import { ArrowRight, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { InputMask } from "../ui/input-mask"
import { Skeleton } from "../ui/skeleton"

export const AccountDetails = () => {
  const supabase = createClientComponentClient()

  const { run: handleSubmit, loading: formLoading } = useRequest(onSubmit, {
    manual: true,
  })

  const form = useForm<UpdateAccountType>({
    resolver: zodResolver(updateAccountSchema),
  })

  const { data: user, loading: userLoading } = useUser({
    onSuccess: (response) => {
      if (response.data?.length) {
        form.setValue("email", response.data[0].email)
        form.setValue("name", response.data[0].name)
        form.setValue("phone_number", response.data[0].phone_number)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  async function onSubmit(values: UpdateAccountType) {
    if (!user) return
    const { error } = await supabase.from("users_complement").upsert({ ...values, id: user.id })
    if (!!error) {
      return toast.error(error.message)
    }
    toast.success("Conta atualizada com sucesso.")
  }

  return (
    <div className="mx-auto my-8 max-w-5xl space-y-4 px-6">
      {userLoading ? (
        <Skeleton className="h-[350px] w-full" />
      ) : (
        <Card className="grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
          <CardHeader>
            <CardTitle>Detalhes da conta</CardTitle>
            <CardDescription>Informações da sua conta EcoXP</CardDescription>
          </CardHeader>
          <CardContent className="!p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex min-w-[400px] flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input type="text" id="name" placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          placeholder="seu@email.com"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <InputMask
                          mask="+{55} (00) 00000-0000"
                          type="tel"
                          id="phone_number"
                          placeholder="Seu telefone"
                          autoComplete="none"
                          aria-autocomplete="none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardFooter className="!px-0 justify-end gap-2">
                  <Button type="submit" disabled={formLoading}>
                    {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Atualizar conta <ArrowRight className="ml-2" />
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
