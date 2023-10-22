"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Title } from "@tremor/react"
import { useMount } from "ahooks"
import { Bookmark, ChevronRight, LayoutGrid, TrendingUp, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [assets, setAssets] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useMount(async () => {
    const { data, error } = await supabase.from("assets").select("*")
    if (!!error) return
    setAssets(data)
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
          Ativos de investimento
        </h1>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm">
          Investir no ODS 11 implica alocar recursos para a construção de cidades mais inclusivas,
          sustentáveis e resilientes. Esses investimentos visam garantir acesso universal a
          habitações seguras e acessíveis, sistemas de transporte eficientes e limpos, bem como a
          proteção do patrimônio cultural e natural. Além disso, eles visam reduzir o impacto
          ambiental das cidades, promovendo o acesso a espaços públicos seguros e verdes para todos.
          <br />
          <br />
          Os investimentos também incluem o fortalecimento da capacidade de planejamento e gestão de
          assentamentos humanos, juntamente com a promoção de políticas integradas para enfrentar
          desafios como mudanças climáticas e desastres. Esses investimentos têm como objetivo
          melhorar a qualidade de vida nas áreas urbanas, promovendo o crescimento sustentável e
          equitativo e contribuindo para o alcance das metas do ODS 11 até 2030.
        </p>
      </div>
      <div className="mx-auto max-w-5xl px-6 mt-8 space-y-4">
        <div className="flex gap-4 items-center">
          <Button className="shrink-0">
            <LayoutGrid className="mr-2 h-4 w-4 text-white" />
            Todos
          </Button>
          <Button className="shrink-0" variant="outline">
            <User className="mr-2 h-4 w-4 text-primary" />
            Meus ativos
          </Button>
          <Button className="shrink-0" variant="outline">
            <Bookmark className="mr-2 h-4 w-4 text-primary" />
            Minhas listas
          </Button>
          <Button className="shrink-0" variant="outline">
            <TrendingUp className="mr-2 h-4 w-4 text-primary" />
            Em alta
          </Button>
          <div className="flex w-full items-center space-x-2">
            <Input placeholder="Pesquise por um ativo..." />
            <Button>
              <MagnifyingGlassIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 mt-8 space-y-4">
        {assets?.map((item) => (
          <Card
            className="w-full h-28 flex items-center gap-4 hover:bg-primary/40 cursor-pointer overflow-hidden"
            onClick={() => router.push(`/ativos/${item.id}`)}
            key={item.id}
          >
            <div className="h-full">
              <Image
                width={112}
                height={112}
                src={item.image_url ?? ""}
                alt="ong"
                className="shrink-0 h-full object-cover"
              />
            </div>
            <div className="w-full pr-4">
              <Title className="flex w-full justify-between items-center">
                {item.name}
                <ChevronRight />
              </Title>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
