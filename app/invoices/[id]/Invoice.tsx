"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { deleteInvoiceByIdAction, updateInvoiceStateById } from "@/app/actions";
import { ChevronDown, Ellipsis, Trash2 } from "lucide-react";
import { Customers, Invoices } from "@/db/schema";
import { useOptimistic } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect & {
    customer: typeof Customers.$inferSelect
  };
}
export default function Invoice({ invoice }: InvoiceProps) {
  const { id, status, description, createTs, value,  customer } = invoice;

  const [currentStatus, setCurrentStatus] = useOptimistic(
    status,
    (state, newStatus: string) => newStatus
  );
  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus = currentStatus;
    setCurrentStatus(String(formData.get("status")));
    try {
      await updateInvoiceStateById(formData);
    } catch (e) {
      setCurrentStatus(originalStatus);
    }
  }
  return (
    <main className="w-full h-full  gap-6">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">
            Invoice # {id}
            <Badge
              className={cn(
                "rounded-full capitalize",
                currentStatus === "open" && "bg-blue-500",
                currentStatus === "paid" && "bg-green-600",
                currentStatus === "void" && "bg-zinc-700",
                currentStatus === "uncollectible" && "bg-red-600"
              )}
            >
              {currentStatus}
            </Badge>
          </h1>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Change Status <ChevronDown className="w-4 h-auto" />{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => {
                  return (
                    <DropdownMenuItem key={status.id}>
                      <form action={handleOnUpdateStatus}>
                        <input type="hidden" name="id" value={id} />
                        <input type="hidden" name="status" value={status.id} />
                        <button className="w-full block px-5 mx-0 h-auto">
                          {status.label}
                        </button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <span className="sr-only"> More Options </span>
                    <Ellipsis className="w-4 h-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DialogTrigger asChild>
                      <button className="flex gap-2">
                        <Trash2 className="w-4 h-auto" />
                        Delete Invoice
                      </button>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent className="bg-white" >
                <DialogHeader >
                  <DialogTitle className="text-2xl" >Delete Invoice?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your invoice and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <form  className="flex justify-center" action={deleteInvoiceByIdAction}>
                    <input type="hidden" name="id" value={id} />

                    <Button variant="destructive" className="flex gap-2">
                        <Trash2 className="w-4 h-auto" />
                        Delete Invoice
                      </Button>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <p className="text-3xl mb-3">{description} </p>

        <p className="text-lg mb-8"></p>

        <h2 className="font-bold text-lg mb-4">Billing Details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{id}</span>
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
            <span>{customer.name} </span>
          </li>

          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span>
            {customer.email}

            </span>
          </li>

          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Value
            </strong>
            <span> $ {(value / 100).toFixed(2)}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
