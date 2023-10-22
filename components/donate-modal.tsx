"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from "@/lib/api/user"
import { formatCurrency } from "@/utils/format-currency"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Metric, Text } from "@tremor/react"
import { Heart, Loader2, Minus, Plus } from "lucide-react"
import { ReactNode, useState } from "react"
import QRCode from "react-qr-code"
import { Button } from "./ui/button"

interface Props {
  trigger: ReactNode
  ong: any
}

export const DonateModal = ({ trigger, ong }: Props) => {
  const [step, setStep] = useState(0)
  const [amount, setAmount] = useState(30)
  const [donating, setDonating] = useState(false)

  const supabase = createClientComponentClient()

  const user = useUser({})

  async function donate() {
    setDonating(true)
    const sleep = (time = 3000) => new Promise((resolve) => setTimeout(resolve, time))
    await supabase.from("donation").insert({
      ong_id: ong.id,
      asset_id: ong.assets_id.id,
      amount,
      user_id: user.data!.id,
    })
    await supabase
      .from("users_complement")
      .update({ amount: user.data!.amount - amount })
      .eq("id", user.data!.id)
    setDonating(false)
    setStep(2)
  }

  function increment(amount: number) {
    setAmount((prev) => prev + amount)
  }

  function decrement(amount: number) {
    setAmount((prev) => prev - amount)
  }

  return user.loading ? (
    trigger
  ) : (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-primary font-bold">Doar</span> para {ong.name}
          </DialogTitle>
        </DialogHeader>
        {step === 0 ? (
          <>
            <div className="w-full grid grid-cols-3 my-8 gap-4">
              <Button
                className="p-2"
                onClick={() => increment(10)}
                disabled={user.data!.amount <= amount || amount + 10 >= user.data!.amount}
              >
                R$ +10
              </Button>
              <Button
                className="p-2"
                onClick={() => increment(50)}
                disabled={user.data!.amount <= amount || amount + 50 >= user.data!.amount}
              >
                R$ +50
              </Button>
              <Button
                className="p-2"
                onClick={() => increment(100)}
                disabled={user.data!.amount <= amount || amount + 100 >= user.data!.amount}
              >
                R$ +100
              </Button>
            </div>
            <div className="w-full flex justify-between">
              <Button variant="secondary" onClick={() => decrement(1)} disabled={amount - 1 < 30}>
                <Minus className="fill-primary" />
              </Button>
              <Metric>{formatCurrency(amount)}</Metric>
              <Button
                variant="secondary"
                onClick={() => increment(1)}
                disabled={user.data!.amount <= amount || amount + 1 > user.data!.amount}
              >
                <Plus className="fill-primary" />
              </Button>
            </div>
            <div className="w-full mt-8">
              <Button className="w-full" onClick={donate} disabled={amount < 30}>
                {donating ? (
                  <Loader2 className="mr-2 h-4 w-4 text-white animate-spin" />
                ) : (
                  <Heart className="mr-2 h-4 w-4 fill-white" />
                )}
                Doar
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
              <Heart size={80} className="animate-pulse text-primary" />
            </div>
            <div>
              <Text>Doação realizada com sucesso! Você acaba de deixar o mundo melhor!</Text>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
