"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { loadArray, saveArray } from "@/lib/demo-store"

export type Payment = { id: string; amount: number; date: string; method: string; status: "paid" | "failed" | "pending" }
const KEY = "user:payments:list"

export default function UserPaymentsPage() {
  const [items, setItems] = useState<Payment[]>([])
  const [amount, setAmount] = useState("")

  useEffect(() => { setItems(loadArray<Payment>(KEY)) }, [])

  function pay() {
    if (!amount) return
    const p: Payment = { id: `PMT-${Math.floor(1000+Math.random()*9000)}`, amount: Number(amount), date: new Date().toISOString().slice(0,10), method: "card", status: "paid" }
    const next = [p, ...items]
    setItems(next); saveArray(KEY, next)
    setAmount("")
    toast({ title: "Payment successful", description: p.id })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="text-sm text-muted-foreground">View history and make a payment</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Make a Payment</CardTitle>
          <CardDescription>Enter an amount to simulate a payment</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input placeholder="Amount (SLE)" type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-48" />
          <Button onClick={pay} disabled={!amount}>Pay now</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-sm text-muted-foreground">No payments yet.</TableCell></TableRow>
              ) : items.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>{p.amount.toLocaleString()}</TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell><Badge variant={p.status === 'paid' ? 'default' : p.status === 'pending' ? 'secondary' : 'destructive'} className="capitalize">{p.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
