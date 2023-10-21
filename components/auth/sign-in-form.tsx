"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRequest } from "ahooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthCredentials, authCredentials } from "@/contracts/auth"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ArrowRight, Banana, Loader2 } from "lucide-react"
import { toast } from "sonner"

export const SignInForm = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { run: handleSubmit, loading } = useRequest(onSubmit, {
    manual: true,
  })

  const form = useForm<AuthCredentials>({
    resolver: zodResolver(authCredentials),
  })

  async function onSubmit(values: AuthCredentials) {
    await supabase.auth
      .signInWithPassword({
        ...values,
      })
      .then((response) => {
        if (response.error !== null) {
          console.log("entered")
          return toast.error(response.error.message)
        }
        router.push("/inicio")
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            href="/"
            className="hidden md:flex text-lg gap-2 items-center font-extrabold text-primary"
          >
            <Banana />
            Skylab
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex min-w-[400px] flex-col gap-3"
          >
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" id="password" placeholder="Sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continuar <ArrowRight className="ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col items-start gap-3">
        <small className="typography-small">
          Não tem uma conta?{" "}
          <Link prefetch href="/sign-up" className="underline">
            Registre-se
          </Link>
        </small>
        <small className="typography-small">
          Esqueceu sua senha?{" "}
          <Link prefetch href="/forgot-password" className="underline">
            Recupere-a
          </Link>
        </small>
      </CardFooter>
    </Card>
  )
}
