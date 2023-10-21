"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

import { useState } from "react"
import { Dropzone, FileWithPreview } from "../ui/dropzone"

export const AccountPhoto = () => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  return (
    <div className="mx-auto my-8 max-w-5xl space-y-4 px-6">
      <Card className="grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
        <CardHeader>
          <CardTitle>Foto da conta</CardTitle>
          <CardDescription>Foto da sua conta Skylab</CardDescription>
        </CardHeader>
        <CardContent className="!p-6">
          <Dropzone
            name="import"
            accept={{
              "text/csv": [".csv"],
            }}
            maxFiles={1}
            maxSize={1024 * 1024 * 1} // 1MB
            files={files}
            setFiles={setFiles}
            className="mt-4"
          />
        </CardContent>
      </Card>
    </div>
  )
}
