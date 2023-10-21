import { IUser } from "@/types/user"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js"
import { useMount } from "ahooks"
import { useState } from "react"

interface Props {
  onSuccess?: (response: PostgrestSingleResponse<any[]>) => void
  onError?: (error: PostgrestError) => void
}

export const useUser = ({ onSuccess }: Props) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IUser | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)

  const supabase = createClientComponentClient()

  useMount(async () => {
    const { data: userData } = await supabase.auth.getUser()
    const userComplement = await supabase
      .from("Users_Complement")
      .select("*")
      .eq("id", userData.user?.id)

    if (!!userComplement.error) {
      setError(userComplement.error)
      return setLoading(false)
    }

    setData(userComplement.data[0])
    setLoading(false)
    if (!!onSuccess) {
      onSuccess(userComplement)
    }
  })

  return {
    data,
    loading,
    error,
  }
}
