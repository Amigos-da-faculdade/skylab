import { SignUpForm } from "@/components/auth/sign-up-form"
import Link from "next/link"

export default function Page() {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center bg-slate-50 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <SignUpForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, você concorda com nossos{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Políticas de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="relative hidden h-full flex-col items-center border-l bg-primary/10 px-20 dark:border-r lg:flex"></div>
    </div>
  )
}
