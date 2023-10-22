"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMount } from "ahooks"
//@ts-ignore
import { IUser } from "@/types/user"
import { Metric, Text } from "@tremor/react"
import { DollarSign, HeartHandshake, PersonStanding } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const CirlcleCards = ({ user }: { user: IUser }) => {
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
    <div className="mx-auto max-w-5xl px-6 mt-8">
      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full border-primary border-[12px] h-44 w-44 flex justify-center items-center">
            <DollarSign size={50} strokeWidth={3} className="text-primary" />
          </div>
          <div className="flex flex-col items-center">
            <Metric className="text-primary font-bold">{donationSum}</Metric>
            <Text>Total doado</Text>
          </div>
        </div>
        <div className="-m-12 flex flex-col items-center gap-4">
          <div className="rounded-full border-primary border-[12px] h-44 w-44 flex justify-center items-center">
            <HeartHandshake size={50} strokeWidth={3} className="text-primary" />
          </div>
          <div className="flex flex-col items-center">
            <Metric className="text-primary font-bold">{assets?.length}</Metric>
            <Text>ONGs apoiadas</Text>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full border-primary border-[12px] h-44 w-44 flex justify-center items-center">
            <PersonStanding size={50} strokeWidth={3} className="text-primary" />
          </div>
          <div className="flex flex-col items-center">
            <Metric className="text-primary font-bold">{assets?.length}</Metric>
            <Text>Ativos apoiados</Text>
          </div>
        </div>
      </div>
    </div>
  )
}
