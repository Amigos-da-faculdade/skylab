"use client"

import Image from "next/image"
import Link from "next/link"

import { SignUpCredentials, signUpCredentials } from "@/contracts/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { InputMask } from "../ui/input-mask"

const RegisterWithGoogle = (
  <>
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="px-2 text-muted-foreground">Ou continue com</span>
      </div>
    </div>
    <Button variant="secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#000000"
        viewBox="0 0 256 256"
        className="mr-2"
      >
        <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
      </svg>
      Google
    </Button>
  </>
)

export const SignUpForm = () => {
  const form = useForm<SignUpCredentials>({
    resolver: zodResolver(signUpCredentials),
  })

  async function onSubmit(values: SignUpCredentials) {}

  return (
    <Card className="bg-card/20 backdrop-blur-md">
      <CardHeader>
        <div className="flex h-16 w-full items-center justify-start">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Image
              src="/logos/simplesdash-logo.png"
              alt="Logo da SimplesDash"
              width={150}
              height={28}
            />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div>
            <CardTitle>Crie sua conta</CardTitle>
            <CardDescription>Insira seu e-mail abaixo para criar sua conta</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="first_name"
                      placeholder="Insira seu nome"
                      autoComplete="none"
                      aria-autocomplete="none"
                      {...field}
                    />
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
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Seu e-mail"
                      autoComplete="none"
                      aria-autocomplete="none"
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
                      placeholder="Insira seu telefone"
                      autoComplete="none"
                      aria-autocomplete="none"
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
                    <Input
                      type="password"
                      id="password"
                      placeholder="Insira sua senha"
                      autoComplete="none"
                      aria-autocomplete="none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </form>
        </Form>
        {RegisterWithGoogle}
      </CardContent>
      <CardFooter>
        <small className="typography-small">
          Já tem uma conta?{" "}
          <Link prefetch href="/entrar" className="underline">
            Faça login
          </Link>
        </small>
      </CardFooter>
    </Card>
  )
}
