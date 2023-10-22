"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/lib/api/user"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
//@ts-ignore
import { CirlcleCards } from "@/components/circle-cards"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/utils/format-currency"
import { format } from "date-fns"
import Link from "next/link"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function Page() {
  const supabase = createClientComponentClient()
  const [loadingAssets, setLoadingAssets] = useState(true)
  const [donations, setDonations] = useState<any[] | null>(null)

  const router = useRouter()

  const { data: user, loading: userLoading } = useUser({
    onSuccess: async (response) => {
      const { data, error } = await supabase
        .from("donation")
        .select("*, ong_id(*), asset_id(*)")
        .eq("user_id", response.data[0].id)
      if (!!error) return
      setDonations(data)
      console.log(data)
      setLoadingAssets(false)
    },
  })

  return (
    <main className="py-12">
      {userLoading ? (
        <div className="mx-auto max-w-5xl px-6 mt-8">
          <Skeleton className="h-[180px] w-full" />
        </div>
      ) : (
        <CirlcleCards user={user!} />
      )}
      <div className="mx-auto max-w-5xl px-6 mt-8">
        {loadingAssets ? (
          <Skeleton className="h-[180px] w-full" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Doações</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Lista de doações realizadas.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ONG</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead>Dada de doação</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium max-w-[200px] truncate whitespace-nowrap">
                        <Link className="underline" href={`/ongs/${item.ong_id.id}`}>
                          {item.ong_id.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link className="underline" href={`/ativos/${item.asset_id.id}`}>
                          {item.asset_id.name}
                        </Link>
                      </TableCell>
                      <TableCell>{format(new Date(item.created_at), "dd/MM/yyyy HH:mm")}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
