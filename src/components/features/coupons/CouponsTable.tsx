"use client";

import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import { Edit, Trash } from "iconsax-reactjs";

import { EDIT_COUPON_PATH, couponTypeLabels } from "@/constants/coupons";
import { Button } from "@/components/ui/button";
import type { Coupon } from "@/types";
import Link from "next/link";
import {
  formatDate,
  formatPrice,
  toPersianDigits,
} from "@/utils/numberFormatter";
import DeleteCouponModal from "./DeleteCouponModal";

function CouponDeleteAction({ couponId }: { couponId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        className="p-1"
        onClick={() => setOpen(true)}
      >
        <Trash className="size-5" />
      </Button>
      <DeleteCouponModal
        open={open}
        onClose={() => setOpen(false)}
        couponId={couponId}
      />
    </>
  );
}

type CouponsTableProps = {
  coupons: Coupon[];
};

export default function CouponsTable({ coupons }: CouponsTableProps) {
  const columns = useMemo<ColumnDef<Coupon>[]>(
    () => [
      {
        accessorKey: "code",
        header: "کد تخفیف",
        size: 110,
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-gray-8" dir="ltr">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "نوع",
        size: 90,
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">
            {couponTypeLabels[getValue<Coupon["type"]>()]}
          </span>
        ),
      },
      {
        accessorKey: "amount",
        header: "مقدار",
        size: 100,
        cell: ({ row }) => (
          <span className="rounded-lg px-2 py-0.5 text-xs font-medium bg-error-extraLight text-error">
            {row.original.type === "percent"
              ? `${toPersianDigits(row.original.amount)}٪`
              : `${formatPrice(row.original.amount)} تومان`}
          </span>
        ),
      },
      {
        id: "usage",
        header: "ظرفیت مصرف",
        size: 110,
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2 text-xs text-gray-7 ">
            <span>{toPersianDigits(row.original.usageCount)}</span>
            <span>استفاده از</span>
            <span>{toPersianDigits(row.original.usageLimit)}</span>
          </div>
        ),
      },
      {
        id: "categories",
        header: "دسته‌بندی‌های مشمول",
        size: 170,
        cell: ({ row }) => (
          <span className="block max-w-45 truncate text-xs text-gray-7">
            {row.original.categoryIds.length > 0
              ? row.original.categoryIds.map(({ title }) => title).join("، ")
              : "-"}
          </span>
        ),
      },
      {
        accessorKey: "expireDate",
        header: "تاریخ انقضا",
        size: 100,
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">
            {formatDate(getValue<string>())}
          </span>
        ),
      },
      {
        id: "edit",
        header: "ویرایش",
        size: 60,
        cell: ({ row }) => (
          <Button asChild variant="secondary" className="p-1">
            <Link href={`${EDIT_COUPON_PATH}/${row.original._id}`}>
              <Edit className="size-5" />
            </Link>
          </Button>
        ),
      },
      {
        id: "delete",
        header: "حذف",
        size: 60,
        cell: ({ row }) => <CouponDeleteAction couponId={row.original._id} />,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: coupons,
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
