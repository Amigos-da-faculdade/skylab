"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/utils/format-currency"
import { Metric, Title } from "@tremor/react"
//@ts-ignore
import { IUser } from "@/types/user"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMount } from "ahooks"
import AnimatedNumber from "animated-number-react"
import { ChevronRight } from "lucide-react"
import { random } from "mathjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const DashboardInvested = ({ user }: { user: IUser }) => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [donationSum, setDonationSum] = useState(0)
  const [assets, setAssets] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useMount(async () => {
    const { data, error } = await supabase
      .from("donation")
      .select("amount, asset_id(*)")
      .eq("user_id", user.id)
    console.log(data)
    if (!!error) return
    setDonationSum(
      data.reduce((accumulator, currentObject) => accumulator + currentObject.amount, 0)
    )
    setAssets(
      data
        .map((item) => item.asset_id)
        .filter((obj, index, self) => index === self.findIndex((o) => o.id === obj.id))
    )
    setLoading(false)
  })

  return (
    <div className="mx-auto max-w-5xl px-6 my-8">
      <Card>
        <CardHeader>
          <CardTitle>Total doado</CardTitle>
          <CardDescription>Todo seu doado desde que entrou na EcoXP.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Metric className="text-primary font-extrabold">
            <AnimatedNumber
              value={donationSum}
              formatValue={formatCurrency}
              duration={random() * (1200 - 800) + 800}
            />
          </Metric>
          <div className="flex flex-col w-full gap-2">
            {assets?.map((item) => (
              <Card
                className="w-full h-16 flex items-center gap-4 hover:bg-primary/40 cursor-pointer overflow-hidden"
                onClick={() => router.push(`/ativos/${item.id}`)}
                key={item.id}
              >
                <div className="h-full">
                  <Image
                    width={64}
                    height={64}
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
        </CardContent>
      </Card>
    </div>
  )
}
