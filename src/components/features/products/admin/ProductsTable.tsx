"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EDIT_PRODUCT_PATH } from "@/constants/products";
import { Product } from "@/types";
import { Edit, Trash } from "iconsax-reactjs";
import DeleteProductModal from "./DeleteProductModal";
import { toPersianDigits } from "@/utils/numberFormatter";

type ProductsTableProps = {
  products: Product[];
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price);
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "mainImageUrl",
        header: "تصویر",
        size: 40,
        cell: ({ row }) => {
          const imageUrl = row.original.mainImageUrl;
          return (
            <div className="relative size-10 overflow-hidden rounded-lg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={row.original.title}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-gray-2 text-xs text-gray-5">
                  -
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "title",
        header: "عنوان",
        size: 100,
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-gray-8 break-all line-clamp-3">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorFn: (row) => row.category?.title ?? "-",
        id: "category",
        header: "دسته‌بندی",
        size: 90,
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "قیمت",
        size: 100,
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">
            {formatPrice(getValue<number>())} تومان
          </span>
        ),
      },
      {
        accessorKey: "offPrice",
        header: "قیمت نهایی",
        size: 90,
        cell: ({ getValue }) => (
          <span className="text-xs font-medium text-primary">
            {getValue<number>() > 0
              ? `${formatPrice(getValue<number>())} تومان`
              : "رایگان"}
          </span>
        ),
      },
      {
        accessorKey: "discount",
        header: "تخفیف",
        size: 50,
        cell: ({ getValue }) => {
          const discount = getValue<number>();
          return discount > 0 ? (
            <span className="rounded-lg px-2 py-0.5 text-xs font-medium bg-error-extraLight text-error">
              {toPersianDigits(discount)}%
            </span>
          ) : (
            <span className="text-xs text-gray-7">-</span>
          );
        },
      },
      {
        accessorKey: "countInStock",
        header: "موجودی",
        size: 50,
        cell: ({ getValue }) => (
          <span className="text-xs font-medium text-primary">
            {toPersianDigits(getValue<number>())}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "تاریخ ایجاد",
        size: 80,
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">
            {formatDate(getValue<string>())}
          </span>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "اخرین تغییر",
        size: 80,
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
          <Button type="button" variant="secondary" asChild className="p-1">
            <Link href={`${EDIT_PRODUCT_PATH}/${row.original._id}`}>
              <Edit className="size-5" />
            </Link>
          </Button>
        ),
      },
      {
        id: "delete",
        header: "حذف",
        size: 60,
        cell: ({ row }) => (
          <Button
            type="button"
            variant="destructive"
            onClick={() => setSelectedProduct(row.original)}
            className="p-1"
          >
            <Trash className="size-5" />
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteProductModal
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        productId={selectedProduct?._id ?? ""}
      />
    </>
  );
};

export default ProductsTable;
