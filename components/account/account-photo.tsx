"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

import { useUser } from "@/lib/api/user"
import { getFirstTwoLettersOfString } from "@/lib/utils"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Dropzone, FileWithPreview } from "../ui/dropzone"
import { Skeleton } from "../ui/skeleton"

export const AccountPhoto = () => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  const { data: user, loading: userLoading } = useUser({})

  return (
    <div className="mx-auto my-8 max-w-5xl space-y-4 px-6">
      {userLoading ? (
        <Skeleton className="h-[350px] w-full" />
      ) : (
        <Card className="grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
          <CardHeader>
            <CardTitle>Foto da conta</CardTitle>
            <CardDescription>Foto da sua conta EcoXP</CardDescription>
            <Avatar className="w-full h-full rounded-sm shrink-[none] p-6">
              <AvatarImage src={user?.url_photo} className="rounded-sm object-contain" />
              <AvatarFallback>{getFirstTwoLettersOfString(String(user?.name))}</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="!p-6 flex flex-col gap-4 justify-between">
            <Dropzone
              name="import"
              accept={{
                "image/jpeg": [".jpeg"],
                "image/png": [".png"],
              }}
              maxFiles={1}
              maxSize={1024 * 1024 * 2} // 1MB
              files={files}
              setFiles={setFiles}
              className="h-full"
            />
            <div className="flex justify-end">
              <Button>Atualizar foto</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
