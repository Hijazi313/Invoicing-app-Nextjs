import {} from "next";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const parsedId = parseInt(id);
  const [result] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, parsedId))
    .limit(1);

    if(!result) notFound()
  const { value, createTs, status, description } = result;

  return (
    <main className="h-full  gap-6 max-w-5xl mx-auto my-12 ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Invoice # {id}
        <Badge className={cn("rounded-full capitalize", status==="open" && "bg-blue-500")} >{status}</Badge>
          
           </h1>
        <p></p>
      </div>

      <p className="text-3xl mb-3">{description} </p>

      <p className="text-lg mb-8"></p>

      <h2 className="font-bold text-lg mb-4">Billing Details</h2>

      <ul className="grid gap-2">
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice ID
          </strong>
          <span>{parsedId}</span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice Date
          </strong>
          <span>
            {new Date(createTs).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing name
          </strong>
          <span></span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing Email
          </strong>
          <span></span>
        </li>

        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Value
          </strong>
          <span> $ {(value / 100).toFixed(2)}</span>
        </li>
      </ul>
    </main>
  );
}
