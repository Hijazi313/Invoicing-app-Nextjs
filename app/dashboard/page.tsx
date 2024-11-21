import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {} from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

import { db } from "@/db";
import { Invoices } from "@/db/schema";

export default async function Home() {
  const results = await db.select().from(Invoices);
  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12 ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p>
          <Button variant="ghost" className="inline-flex gap-2" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map(({ id, status, createTs, value }) => (
            <TableRow key={id}>
              <TableCell className="p-0 font-medium text-left">
                <Link href={`/invoices/${id}`} className="p-4  block">
                  {new Date(createTs).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Link>
              </TableCell>
              <TableCell className="p-0 text-left">
                <Link href={`/invoices/${id}`} className="p-4  block">
                  Hamza
                </Link>
              </TableCell>
              <TableCell className="p-0 text-left">
                <Link href={`/invoices/${id}`} className="p-4  block">
                  hamza@gm.com
                </Link>
              </TableCell>
              <TableCell className="p-0 text-center">
                <Link href={`/invoices/${id}`} className="p-4  block">
                  <Badge>{status}</Badge>
                </Link>
              </TableCell>
              <TableCell className="p-0 text-right">
                <Link href={`/invoices/${id}`} className="p-4  block">
                  $ {(value / 100).toFixed(2)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
