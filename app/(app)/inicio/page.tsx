"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/lib/api/user"
import { formatCurrency } from "@/utils/format-currency"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Metric, Text, Title } from "@tremor/react"
import { useMount } from "ahooks"
import { Heart, PiggyBank } from "lucide-react"
//@ts-ignore
import { DashboardInvested } from "@/components/dashboard-invested"
import { DepositeModal } from "@/components/deposite-modal"
import AnimatedNumber from "animated-number-react"
import { random } from "mathjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const supabase = createClientComponentClient()
  const [loadingAssets, setLoadingAssets] = useState(true)
  const [assets, setAssets] = useState<any[] | null>(null)

  const router = useRouter()

  const { data: user, loading: userLoading } = useUser({})

  useMount(async () => {
    const { data, error } = await supabase.from("assets").select("*")
    if (!!error) return
    setAssets(data)
    setLoadingAssets(false)
  })

  return (
    <main>
      <div className="mx-auto flex max-w-5xl justify-between px-6 py-8">
        <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
          Bom dia, André
        </h1>
      </div>
      <div className="mx-auto max-w-5xl px-6 mb-8">
        {userLoading ? (
          <Skeleton className="h-[180px] w-full" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Valor em caixa</CardTitle>
              <CardDescription>Valor acumulado na EcoXP</CardDescription>
            </CardHeader>
            <CardContent
              className="grid items-center gap-4"
              style={{ gridTemplateColumns: "1fr 3fr" }}
            >
              <Metric className="text-primary font-extrabold">
                <AnimatedNumber
                  value={user?.amount}
                  formatValue={formatCurrency}
                  duration={random() * (1200 - 800) + 800}
                />
              </Metric>
              <div className="grid grid-cols-2 gap-4 items-center">
                <DepositeModal
                  user={user!}
                  trigger={
                    <Card className="p-4 flex items-center gap-4 hover:bg-primary/50 cursor-pointer">
                      <PiggyBank className="text-primary" />
                      <Title>Depositar</Title>
                    </Card>
                  }
                />

                <Card
                  className="p-4 flex items-center gap-4 bg-primary cursor-pointer"
                  onClick={() => router.push("/ativos")}
                >
                  <Heart className="text-primary fill-white" />
                  <Title className="text-white">Doar</Title>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="mx-auto max-w-5xl px-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Ativos</CardTitle>
            <CardDescription>Ativos disponíveis para investimento</CardDescription>
          </CardHeader>
          <CardContent className="w-full grid grid-rows-1 grid-cols-6 gap-4 overflow-hidden items-center flex-1">
            {loadingAssets ? (
              <>
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
              </>
            ) : (
              assets?.slice(0, 6).map((item) => (
                <Card
                  key={item.id}
                  className="items-center flex flex-col gap-4 text-center hover:bg-primary/30 overflow-hidden h-[200px] cursor-pointer"
                  onClick={() => router.push(`/ativos/${item.id}`)}
                >
                  <div className="w-full">
                    <Image
                      alt="as"
                      src={item.image_url}
                      width={1024}
                      height={50}
                      className="w-full object-cover h-[50px]"
                    />
                  </div>
                  <Text className="p-2">{item.name}</Text>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      {userLoading ? (
        <div className="mx-auto max-w-5xl px-6 mt-8">
          <Skeleton className="h-[180px] w-full" />
        </div>
      ) : (
        <DashboardInvested user={user!} />
      )}
      <div className="mx-auto max-w-5xl px-6 mt-8">
        <Card className="overflow-hidden relative">
          <Image
            alt="as"
            src="/sobre-nos.jpg"
            width={1024}
            height={320}
            className="w-full object-cover h-80"
          />
          <Title className="text-white absolute bottom-10 right-10 !text-6xl font-extrabold z-10">
            Sobre nós
          </Title>
        </Card>
      </div>
    </main>
  )
}
