"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ProgressCircle } from "@tremor/react"
import { useMount } from "ahooks"
import { floor } from "mathjs"
import { useState } from "react"

interface Props {
  ong: any
}

export const OngGoal = ({ ong }: Props) => {
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
    <ProgressCircle value={goalSum / ong.amount_goal} size="sm" color="green">
      <span className="text-xs text-gray-700 font-medium">{floor(goalSum / ong.amount_goal)}%</span>
    </ProgressCircle>
  )
}
