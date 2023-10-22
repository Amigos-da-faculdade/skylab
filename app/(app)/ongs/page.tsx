"use client"

import { OngGoal } from "@/components/ong-goal"
import { Button } from "@/components/ui/button"
import { Card, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/utils/format-currency"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Text, Title } from "@tremor/react"
import { useMount } from "ahooks"
import { LayoutGrid } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [ongs, setOngs] = useState<any[] | null>(null)
  const [goalSum, setGoalSum] = useState(0)
  const [loading, setLoading] = useState(true)

  useMount(async () => {
    const { data, error } = await supabase.from("ongs").select("*, assets_id(*)")
    if (!!error) return
    setOngs(data)
    setLoading(false)
  })

  return loading ? (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-28" />
        <Skeleton className="w-full h-28" />
        <Skeleton className="w-full h-28" />
        <Skeleton className="w-full h-28" />
      </div>
    </div>
  ) : (
    <main className="py-8">
      <div className="mx-auto flex max-w-5xl justify-between px-6 py-8">
        <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
          ONGs apoiadoras
        </h1>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm">
          Essas ONGs desempenham um papel crucial na supervisão e coordenação de projetos que visam
          promover o acesso universal à habitação adequada, sistemas de transporte sustentáveis e na
          proteção do patrimônio cultural e natural. Além disso, elas desempenham um papel ativo no
          fortalecimento da capacidade das comunidades locais para o planejamento e gestão
          participativos de assentamentos sustentáveis.
          <br />
          <br />
          As ONGs também têm a expertise necessária para promover práticas de construção e
          urbanização sustentáveis em países menos desenvolvidos, incluindo a promoção de materiais
          locais e tecnologias ecoeficientes.
        </p>
      </div>
      <div className="mx-auto max-w-5xl px-6 mt-8 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="flex w-full items-center space-x-2">
            <Input placeholder="Pesquise por uma ONG..." />
            <Button>
              <MagnifyingGlassIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 mt-8 space-y-4">
        {ongs?.map((item) => (
          <Card
            className="w-full h-28 flex items-center gap-4 hover:bg-primary/40 cursor-pointer p-4"
            onClick={() => router.push(`/ongs/${item.id}`)}
            key={item.id}
          >
            <div>
              <Image
                width={112}
                height={112}
                src={item.logo ?? ""}
                alt="ong"
                className="shrink-0"
              />
            </div>
            <div>
              <Title>{item.name}</Title>
              <CardDescription className="flex gap-1 items-center">
                <LayoutGrid size={16} />
                {item.assets_id.name}
              </CardDescription>
            </div>
            <div className="ml-auto flex gap-4 text-right">
              <div>
                <Title>Meta</Title>
                <Text>{formatCurrency(item.amount_goal)}</Text>
              </div>
              <OngGoal ong={item} />
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
