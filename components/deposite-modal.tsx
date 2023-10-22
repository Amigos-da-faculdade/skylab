"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IUser } from "@/types/user"
import { formatCurrency } from "@/utils/format-currency"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Metric, Text } from "@tremor/react"
import { CheckCircle, Loader2, Minus, Plus } from "lucide-react"
import { ReactNode, useState } from "react"
import QRCode from "react-qr-code"
import { Button } from "./ui/button"

interface Props {
  trigger: ReactNode
  user: IUser
}

export const DepositeModal = ({ trigger, user }: Props) => {
  const [step, setStep] = useState(0)
  const [amount, setAmount] = useState(0)
  const [donating, setDonating] = useState(false)

  const supabase = createClientComponentClient()

  async function donate() {
    setDonating(true)
    const sleep = (time = 3000) => new Promise((resolve) => setTimeout(resolve, time))
    const {} = await supabase
      .from("users_complement")
      .update({ amount: user?.amount + amount })
      .eq("id", user.id)
    setDonating(false)
    setStep(1)
    await sleep(1000 * 10)
    setStep(2)
  }

  function increment(amount: number) {
    setAmount((prev) => prev + amount)
  }

  function decrement(amount: number) {
    setAmount((prev) => prev - amount)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fazer um deposito</DialogTitle>
        </DialogHeader>
        {step === 0 ? (
          <>
            <div className="w-full grid grid-cols-3 my-8 gap-4">
              <Button className="p-2" onClick={() => increment(10)}>
                R$ +10
              </Button>
              <Button className="p-2" onClick={() => increment(50)}>
                R$ +50
              </Button>
              <Button className="p-2" onClick={() => increment(100)}>
                R$ +100
              </Button>
            </div>
            <div className="w-full flex justify-between">
              <Button variant="secondary" onClick={() => decrement(1)}>
                <Minus className="fill-primary" />
              </Button>
              <Metric>{formatCurrency(amount)}</Metric>
              <Button variant="secondary" onClick={() => increment(1)}>
                <Plus className="fill-primary" />
              </Button>
            </div>
            <div className="w-full mt-8">
              <Button className="w-full" onClick={donate}>
                {donating && <Loader2 className="mr-2 h-4 w-4 text-white animate-spin" />}
                Depositar
              </Button>
            </div>
          </>
        ) : step === 1 ? (
          <>
            <div className="w-full flex justify-center p-6">
              <QRCode value={"asdkj"} />
            </div>
            <div>
              <Text>
                Leia o código QR no app do seu banco para fazer a doação. Nosso sistema irá
                reconhecer a transação alguns instantes após a conclusão
              </Text>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex justify-center p-6">
              <CheckCircle size={80} className="animate-pulse text-primary" />
            </div>
            <div>
              <Text>
                Deposito realizado com sucesso! Você já pode começar a deixar o mundo um pouco
                melhor!
              </Text>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
