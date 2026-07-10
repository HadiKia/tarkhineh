"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ColumnDef,
  type ExpandedState,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCategoryDate, productTypeLabels } from "@/constants/categories";
import { Category, ProductCategoryType } from "@/types";
import Link from "next/link";
import DeleteCategoryModal from "./DeleteCategoryModal";

type CategoriesTableProps = {
  categories: Category[];
};

type CategoryTableRow = Category & {
  subRows?: CategoryTableRow[];
};

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const tableData = useMemo<CategoryTableRow[]>(() => {
    const mealCourses = categories.filter(
      (category) => category.productType === ProductCategoryType.MEAL_COURSE,
    );
    const foodGroups = categories.filter(
      (category) => category.productType === ProductCategoryType.FOOD_GROUP,
    );

    return mealCourses.map((mealCourse) => ({
      ...mealCourse,
      subRows: foodGroups.filter(
        (foodGroup) => foodGroup.parentId === mealCourse._id,
      ),
    }));
  }, [categories]);

  const columns = useMemo<ColumnDef<CategoryTableRow>[]>(
    () => [
      {
        accessorKey: "title",
        header: "عنوان",
        cell: ({ row, getValue }) => (
          <div
            className="flex items-center gap-2"
            style={{ paddingInlineStart: `${row.depth * 24}px` }}
          >
            {row.getCanExpand() ? (
              <Button
                type="button"
                variant="ghost"
                onClick={row.getToggleExpandedHandler()}
                className="h-7 w-7 shrink-0 p-0"
                aria-label={row.getIsExpanded() ? "بستن" : "باز کردن"}
              >
                {row.getIsExpanded() ? (
                  <ChevronDownIcon className="size-4" />
                ) : (
                  <ChevronLeftIcon className="size-4" />
                )}
              </Button>
            ) : (
              <span className="size-7 shrink-0" />
            )}
            <span
              className="font-medium text-gray-10"
              onClick={row.getToggleExpandedHandler()}
            >
              {getValue<string>()}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "englishTitle",
        header: "عنوان انگلیسی",
        cell: ({ getValue }) => (
          <span className="block text-xs text-gray-6" dir="ltr">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "productType",
        header: "نوع",
        cell: ({ row }) => {
          const productType = row.original.productType;

          if (!productType || productType === "static_filter") return "-";

          return (
            <span className="rounded-md bg-gray-1 px-2 py-1 text-xs text-gray-7">
              {productTypeLabels[productType]}
            </span>
          );
        },
      },
      {
        accessorKey: "description",
        header: "توضیحات",
        cell: ({ getValue }) => (
          <span className="line-clamp-2 text-xs leading-6 text-gray-7 lg:text-sm w-full  ">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "تاریخ ایجاد",
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">
            {formatCategoryDate(getValue<string>())}
          </span>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "آخرین تغییر",
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-7">
            {formatCategoryDate(getValue<string>())}
          </span>
        ),
      },
      {
        id: "edit",
        header: "ویرایش",
        cell: ({ row }) => (
          <Button
            type="button"
            variant="ghost"
            asChild
            className="h-auto p-0 text-xs text-primary hover:bg-transparent"
          >
            <Link href={`/admin/categories/edit-category/${row.original._id}`}>
              ویرایش
            </Link>
          </Button>
        ),
      },
      {
        id: "delete",
        header: "حذف",
        cell: ({ row }) => (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setSelectedCategory(row.original)}
            className="h-auto p-0 text-xs text-destructive hover:bg-transparent"
          >
            حذف
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-2 bg-background">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center">
            <thead className="bg-gray-1">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 text-xs font-semibold text-gray-7"
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
                  className={
                    row.depth === 0
                      ? "border-t border-gray-2"
                      : "border-t border-gray-1 bg-gray-0"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 text-sm">
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
      <DeleteCategoryModal
        open={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
        categoryId={selectedCategory?._id ?? ""}
      />
    </>
  );
};

export default CategoriesTable;
