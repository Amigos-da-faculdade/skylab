"use client"

import { DonateModal } from "@/components/donate-modal"
import { OngGoalProgress } from "@/components/ong-goal-progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMount } from "ahooks"
import { ExternalLink, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const chartdata = [
  {
    year: 1970,
    "Export Growth Rate": 2000,
    "Import Growth Rate": 5000,
  },
  {
    year: 1971,
    "Export Growth Rate": 3000,
    "Import Growth Rate": 10000,
  },
  {
    year: 1972,
    "Export Growth Rate": 500,
    "Import Growth Rate": 4000,
  },
  {
    year: 1973,
    "Export Growth Rate": 1000,
    "Import Growth Rate": 1000,
  },
  {
    year: 1974,
    "Export Growth Rate": 2034,
    "Import Growth Rate": 8000,
  },
]

export default function Page({ params }: { params: { id: string } }) {
  const ongId = params.id
  const supabase = createClientComponentClient()

  const [ongs, setOngs] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useMount(async () => {
    const { data, error } = await supabase.from("ongs").select("*, assets_id(*)").eq("id", ongId)
    if (!!error) return
    setOngs(data[0])
    setLoading(false)
  })

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
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
            <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px] flex items-center gap-4">
              <Image
                width={32}
                height={32}
                className="rounded-sm"
                src={ongs.logo ?? ""}
                alt="ong"
              />
              <div className="flex flex-col">
                {ongs.name}
                <CardDescription>{ongs.tax_id}</CardDescription>
              </div>
            </h1>
            <div className="flex items-center gap-4">
              <Link href={ongs.url} target="_blank">
                <ExternalLink />
              </Link>
              <DonateModal
                ong={ongs}
                trigger={
                  <Button>
                    <Heart className="mr-2 h-4 w-4 fill-white" />
                    Doar
                  </Button>
                }
              />
            </div>
          </div>
          <div className="mx-auto max-w-5xl px-6">
            <p>{ongs.description}</p>
          </div>
          <div className="mx-auto max-w-5xl px-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Meta da ONG</CardTitle>
              </CardHeader>
              <CardContent>
                <OngGoalProgress ong={ongs} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </main>
  )
}
