"use server";

import { db } from "@/db";
import { Customers, Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { expirePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;

  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);

  const description = String(formData.get("description"));
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const [customer] = await db
    .insert(Customers)
    .values({
      userId,
      name,
      email,
    })
    .returning({ id: Customers.id });

  const results = await db
    .insert(Invoices)
    .values({
      description,
      value,
      userId,
      customerId: customer.id,
      status: "open",
    })
    .returning({ id: Invoices.id });
  redirect(`/invoices/${results[0].id}`);
}

export async function updateInvoiceStateById(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as Status;
  const result = await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));
  expirePath(`/invoices/${id}`, "page");
  // revalidatePath(result);
}

export async function deleteInvoiceByIdAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return;

  const id = String(formData.get("id"));
  const result = await db
    .delete(Invoices)
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));
  redirect("/dashboard");
}
