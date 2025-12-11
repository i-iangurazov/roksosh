"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  productsList: string[];
  customer: string;
  totalPrice: string;
  itemCount: number;
  isPaid: boolean;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium">{row.original.customer}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{row.original.phone}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => navigator.clipboard.writeText(row.original.phone)}
            aria-label="Copy phone"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "productsList",
    header: "Products",
    cell: ({ row }) => (
      <ul className="space-y-1">
        {row.original.productsList.map((line, index) => (
          <li key={index} className="text-sm leading-5">
            {line}
          </li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: "address",
    header: "Shipping",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "itemCount",
    header: "Items",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
