"use client";

import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Edit2 } from "iconsax-reactjs";

import { deliveryMethodLabels, getOrderStatusLabel } from "@/constants/orders";
import { Button } from "@/components/ui/button";
import type { AdminPaymentResult } from "@/types";
import {
  formatDate,
  formatPrice,
  toPersianDigits,
} from "@/utils/numberFormatter";

type OrdersTableProps = {
  payments: AdminPaymentResult[];
};

function getOrderReceiver(payment: AdminPaymentResult) {
  const { user, checkout } = payment;
  const address = checkout?.address;

  if (checkout?.deliveryMethod === "courier" && address) {
    if (address.isSelfReceiver) {
      return {
        name: user?.name,
        phone: address.phoneNumber ?? user?.phoneNumber,
      };
    }

    return {
      name: address.receiverName,
      phone: address.receiverPhoneNumber,
    };
  }

  return {
    name: user?.name,
    phone: user?.phoneNumber,
  };
}

export default function OrdersTable({ payments }: OrdersTableProps) {
  const columns = useMemo<ColumnDef<AdminPaymentResult>[]>(
    () => [
      {
        accessorKey: "invoiceNumber",
        header: "شماره سفارش",
        size: 130,
        cell: ({ getValue }) => (
          <span className="text-xs font-medium text-gray-8" dir="ltr">
            {getValue<string>() || "-"}
          </span>
        ),
      },
      {
        id: "customer",
        header: "تحویل‌گیرنده",
        size: 120,
        cell: ({ row }) => {
          const receiver = getOrderReceiver(row.original);

          return (
            <div className="flex flex-col items-center gap-0.5 text-xs text-gray-7">
              <span className="block max-w-25 truncate">
                {receiver.name || "-"}
              </span>
              <span dir="ltr">
                {receiver.phone ? toPersianDigits(receiver.phone) : "-"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "تاریخ ثبت",
        size: 90,
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">
            {formatDate(getValue<string>())}
          </span>
        ),
      },
      {
        id: "items",
        header: "تعداد",
        size: 50,
        cell: ({ row }) => (
          <span className="text-xs text-gray-7">
            {toPersianDigits(
              row.original.cart?.productDetail?.reduce(
                (total, item) => total + item.quantity,
                0,
              ) ?? 0,
            )}
          </span>
        ),
      },
      {
        accessorKey: "amount",
        header: "مبلغ",
        size: 120,
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">
            {formatPrice(getValue<number>())} تومان
          </span>
        ),
      },
      {
        id: "deliveryMethod",
        header: "روش تحویل",
        size: 100,
        cell: ({ row }) => (
          <span className="text-xs text-gray-7">
            {row.original.checkout?.deliveryMethod
              ? deliveryMethodLabels[row.original.checkout.deliveryMethod]
              : "-"}
          </span>
        ),
      },
      {
        id: "orderStatus",
        header: "وضعیت سفارش",
        size: 130,
        cell: ({ row }) => (
          <span className="rounded-lg bg-secondary px-2 py-1 text-xs text-primary">
            {getOrderStatusLabel(
              row.original.orderStatus,
              row.original.checkout?.deliveryMethod,
            )}
          </span>
        ),
      },
      {
        id: "statusAction",
        header: "تغییر وضعیت",
        size: 90,
        cell: () => (
          <Button
            type="button"
            variant="secondary"
            className="p-1"
            aria-label="تغییر وضعیت سفارش"
          >
            <Edit2 className="size-5" />
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-lg bg-background">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full w-max">
          <thead className="bg-gray-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 py-3.75 text-xs font-semibold text-gray-7"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-3 transition-colors hover:bg-gray-1"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
