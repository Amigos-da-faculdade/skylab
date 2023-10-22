"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrencyValueWithSuffix } from "@/utils/format-currency-suffix"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { LineChart, Text, Title } from "@tremor/react"
import { useMount } from "ahooks"
import { Globe, Heart, LayoutGrid, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const portugueseMonths = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const chartdata = portugueseMonths.map((monthName, index) => ({
  month: monthName,
  Investimento: Math.floor(Math.random() * 5000),
}))

export default function Page({ params }: { params: { id: string } }) {
  const accessId = params.id
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [assets, setAssets] = useState<any | null>(null)
  const [ongs, setOngs] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [ongsLoading, setOngsLoading] = useState(true)

  useMount(async () => {
    const { data, error } = await supabase.from("assets").select("*").eq("id", accessId)
    if (!!error) return
    setAssets(data[0])
    setLoading(false)
  })

  useMount(async () => {
    const { data, error } = await supabase.from("ongs").select("*").eq("assets_id", accessId)
    if (!!error) return
    setOngs(data)
    setOngsLoading(false)
  })

  const pathname = usePathname()
  console.log(pathname)

  return (
    <main className="pb-8">
      {loading ? (
        <>
          <div className="mx-auto my-8 flex w-full max-w-5xl justify-between px-6">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-32" />
          </div>
          <div className="mx-auto my-8 max-w-5xl space-y-4 px-6">
            <Skeleton className="h-[50px]" />
            <Skeleton className="h-[500px]" />
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-80">
            <Image
              alt="as"
              src={assets.image_url}
              width={1024}
              height={320}
              className="w-full object-cover h-80"
            />
          </div>
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
            <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px] flex items-center gap-4">
              <LayoutGrid size={32} />
              {assets.name}
            </h1>
            <div className="flex items-center gap-4">
              <Link href="https://brasil.un.org/pt-br/sdgs/11" target="_blank">
                <Globe />
              </Link>
              <Button onClick={() => router.push(`${pathname}#ongs`)}>
                <Heart className="mr-2 h-4 w-4 fill-white" />
                Doar
              </Button>
            </div>
          </div>
          <div className="mx-auto max-w-5xl px-6">
            <p>{assets.description}</p>
          </div>
          <div className="mx-auto max-w-5xl px-6 mt-8">
            <Card className="p-6">
              <Title>Crescimento de investimento</Title>
              <LineChart
                curveType="natural"
                data={chartdata}
                index="month"
                categories={["Investimento"]}
                colors={["green"]}
                valueFormatter={formatCurrencyValueWithSuffix}
                yAxisWidth={40}
              />
            </Card>
          </div>
          <div className="mx-auto max-w-5xl px-6 mt-8" id="ongs">
            <Card>
              <CardHeader>
                <CardTitle>ONGs apoiadoras</CardTitle>
              </CardHeader>
              {!!ongs?.length ? (
                <CardContent className="w-full grid grid-cols-6 gap-4 overflow-hidden items-center ">
                  {ongsLoading ? (
                    <>
                      <Skeleton className="h-[100px]" />
                      <Skeleton className="h-[100px]" />
                      <Skeleton className="h-[100px]" />
                      <Skeleton className="h-[100px]" />
                      <Skeleton className="h-[100px]" />
                      <Skeleton className="h-[100px]" />
                    </>
                  ) : (
                    ongs?.slice(0, 6).map((item) => (
                      <Card
                        key={item.id}
                        className="items-center flex flex-col gap-4 text-center hover:bg-primary/30 overflow-hidden h-[200px] cursor-pointer"
                        onClick={() => router.push(`/ongs/${item.id}`)}
                      >
                        <div className="w-full">
                          <Image
                            alt="as"
                            src={item.logo}
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
              ) : (
                <CardContent className="flex w-full flex-col items-center gap-4">
                  <XCircle size={50} />
                  <Text>Este ativo não possui ONGs apoiadoras</Text>
                  <Button onClick={() => router.push("/ongs")}>Ver outras ONGs</Button>
                </CardContent>
              )}
            </Card>
          </div>
        </>
      )}
    </main>
  )
}
