"use client"

import { Card, CardTitle } from "../ui/card"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"

export const AccountDelete = () => {
  return (
    <div className="mx-auto my-8 max-w-5xl space-y-4 px-6">
      <Card className="p-6 flex flex-col gap-6">
        <CardTitle>Apagar conta</CardTitle>
        <Alert variant="destructive" className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4" />
            <div>
              <AlertTitle>Excluir esta conta removerá seus dados.</AlertTitle>
              <AlertDescription>
                Certifique-se de quer efetivmente excluir sua conta
              </AlertDescription>
            </div>
          </div>
          <div>
            <Button variant="destructive" className="mt-2 ml-auto">
              Excluir conta
            </Button>
          </div>
        </Alert>
      </Card>
    </div>
  )
}
