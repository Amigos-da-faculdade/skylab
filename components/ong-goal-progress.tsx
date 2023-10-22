"use client"

import { formatCurrency } from "@/utils/format-currency"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Flex, ProgressBar, Text } from "@tremor/react"
import { useMount } from "ahooks"
import { useState } from "react"

interface Props {
  ong: any
}

export const OngGoalProgress = ({ ong }: Props) => {
  const supabase = createClientComponentClient()

  const [goalSum, setGoalSum] = useState(0)
  const [loading, setLoading] = useState(true)

  useMount(async () => {
    const { data, error } = await supabase.from("donation").select("amount").eq("ong_id", ong.id)
    if (!!error) return
    setGoalSum(data.reduce((accumulator, currentObject) => accumulator + currentObject.amount, 0))
    setLoading(false)
  })

  return (
    <>
      <Flex>
        <Text>
          {formatCurrency(goalSum)} &bull; {(goalSum / ong.amount_goal).toFixed(4)}%
        </Text>
        <Text>{formatCurrency(ong.amount_goal)}</Text>
      </Flex>
      <ProgressBar value={goalSum / ong.amount_goal} color="green" className="mt-3" />
    </>
  )
}
