import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Invoice from "./Invoice";

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const parsedId = parseInt(id);
  const { userId } = await auth();
  if (!userId) return;
  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.id ,Customers.id))
    .where(and(eq(Invoices.id, parsedId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!result) notFound();
  console.log(result)
  const invoice = {...result.invoices, customer: result.customers}

  return <Invoice invoice={invoice} />;
}
