"use client";

import { useCallback, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ColumnDef,
  type ExpandedState,
} from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  EDIT_CATEGORY_PATH,
  productTypeLabels,
} from "@/constants/categories";
import { categoryQueryKeys, useReorderCategories } from "@/hooks/useCategories";
import { Category, ProductCategoryType, type ApiError } from "@/types";
import Link from "next/link";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { cn } from "@/lib/utils";
import { ArrowLeft2, Category as CategoryIcon, Edit, Trash } from "iconsax-reactjs";
import { formatDate } from "@/utils/numberFormatter";

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
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const reorderMutation = useReorderCategories();

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

  const getSiblings = useCallback(
    (rowId: string): CategoryTableRow[] => {
      const parent = tableData.find((mealCourse) =>
        mealCourse.subRows?.some((child) => child._id === rowId),
      );
      return parent?.subRows ?? tableData;
    },
    [tableData],
  );

  const handleDragStart = useCallback(
    (rowId: string) => (e: React.DragEvent<HTMLSpanElement>) => {
      e.dataTransfer.setData("text/plain", rowId);
      e.dataTransfer.effectAllowed = "move";
      setDraggingId(rowId);
    },
    [],
  );

  const handleDragOver = useCallback(
    (rowId: string) => (e: React.DragEvent<HTMLTableRowElement>) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (rowId !== draggingId) {
        setDropTargetId(rowId);
      }
    },
    [draggingId],
  );

  const commitReorder = useCallback(
    async (sourceId: string, targetId: string) => {
      const siblings = getSiblings(sourceId);
      if (!siblings.some((category) => category._id === targetId)) return;

      const sourceIndex = siblings.findIndex(
        (category) => category._id === sourceId,
      );
      const nextOrder = siblings.filter(
        (category) => category._id !== sourceId,
      );
      const targetIndex = nextOrder.findIndex(
        (category) => category._id === targetId,
      );
      nextOrder.splice(
        targetIndex + (targetIndex > sourceIndex ? 1 : 0),
        0,
        siblings[sourceIndex],
      );

      try {
        const response = await reorderMutation.mutateAsync(
          nextOrder.map((category) => category._id),
        );
        toast.success(response.message);
        await queryClient.invalidateQueries({
          queryKey: categoryQueryKeys.all,
        });
      } catch (error) {
        const err = error as ApiError;
        toast.error(err.response?.data?.message ?? "تغییر ترتیب انجام نشد");
      }
    },
    [getSiblings, queryClient, reorderMutation],
  );

  const handleDrop = useCallback(
    (targetId: string) => (e: React.DragEvent<HTMLTableRowElement>) => {
      e.preventDefault();
      const sourceId = draggingId;
      setDraggingId(null);
      setDropTargetId(null);

      if (!sourceId || sourceId === targetId || reorderMutation.isPending)
        return;

      void commitReorder(sourceId, targetId);
    },
    [commitReorder, draggingId, reorderMutation.isPending],
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDropTargetId(null);
  }, []);

  const columns = useMemo<ColumnDef<CategoryTableRow>[]>(
    () => [
      {
        id: "order",
        header: "ترتیب",
        size: 60,
        cell: ({ row }) => (
          <Button
          variant="ghost"
            draggable={!reorderMutation.isPending}
            onDragStart={handleDragStart(row.original._id)}
            onDragEnd={handleDragEnd}
            aria-label="جابه‌جایی دسته‌بندی"
            className={cn(
              "inline-flex cursor-grab touch-none text-gray-5 transition-colors hover:text-gray-8 active:cursor-grabbing",
              reorderMutation.isPending && "pointer-events-none opacity-40",
            )}
          >
            <CategoryIcon className="size-5" />
          </Button>
        ),
      },
      {
        accessorKey: "title",
        header: () => (
          <div className="flex items-center">
            <div className="size-7.5 shrink-0" />
            <span className="w-full">عنوان</span>
          </div>
        ),
        cell: ({ row, getValue }) => {
          const isSubRow = row.depth > 0;

          return (
            <div
              onClick={
                row.getCanExpand() ? row.getToggleExpandedHandler() : undefined
              }
              className={cn(
                "flex items-center",
                row.getCanExpand() && "cursor-pointer",
              )}
            >
              {row.getCanExpand() ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="p-1"
                  aria-label={row.getIsExpanded() ? "بستن" : "باز کردن"}
                >
                  <ArrowLeft2
                    className={cn(
                      "size-5 transition-transform duration-300 ease-linear",
                      row.getIsExpanded() && "-rotate-90",
                    )}
                  />
                </Button>
              ) : (
                <span className="size-7.5 shrink-0" />
              )}

              <span
                className={cn(
                  "min-w-0 flex-1 font-medium",
                  isSubRow ? "text-gray-7 text-xs" : "text-gray-8 text-sm",
                )}
              >
                {getValue<string>()}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "englishTitle",
        header: "عنوان انگلیسی",
        size: 100,
        cell: ({ getValue }) => (
          <span
            className="block max-w-25 truncate text-xs text-gray-7"
            dir="ltr"
          >
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "productType",
        size: 100,
        header: "نوع",
        cell: ({ row }) => {
          const productType = row.original.productType;
          const isSubRow = row.depth > 0;

          if (!productType || productType === "static_filter") return "-";

          return (
            <span
              className={cn(
                "rounded-lg px-2 py-1 text-xs",
                isSubRow
                  ? "bg-secondary text-primary"
                  : "bg-primary text-white",
              )}
            >
              {productTypeLabels[productType]}
            </span>
          );
        },
      },
      {
        accessorKey: "description",
        header: "توضیحات",
        cell: ({ getValue }) => (
          <span className="mx-auto block max-w-40 truncate text-center text-xs text-gray-7">
            {getValue<string>()}
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
        header: "آخرین تغییر",
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
            <Link href={`${EDIT_CATEGORY_PATH}/${row.original._id}`}>
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
            onClick={() => setSelectedCategory(row.original)}
            className="p-1"
          >
            <Trash className="size-5" />
          </Button>
        ),
      },
    ],
    [handleDragStart, handleDragEnd, reorderMutation.isPending],
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
      <div className="overflow-hidden rounded-lg bg-background">
        <div className="overflow-x-auto">
          <table className="min-w-full w-max">
            <thead className="bg-gray-2">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 text-xs font-semibold text-gray-7"
                      style={{
                        width: header.getSize(),
                      }}
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
                  onDragOver={handleDragOver(row.original._id)}
                  onDrop={handleDrop(row.original._id)}
                  className={cn(
                    "transition-colors",
                    row.getIsExpanded() ? "bg-gray-1" : "hover:bg-gray-1",
                    row.depth === 0
                      ? "border-t border-gray-3"
                      : "border-t border-gray-2",
                    draggingId === row.original._id && "opacity-50",
                    dropTargetId === row.original._id && "border-t-primary",
                  )}
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
      <DeleteCategoryModal
        open={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
        categoryId={selectedCategory?._id ?? ""}
      />
    </>
  );
};

export default CategoriesTable;
