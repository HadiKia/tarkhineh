"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Edit, Trash } from "iconsax-reactjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EDIT_BRANCH_PATH } from "@/constants/branches";
import type { Branch } from "@/types";
import DeleteBranchModal from "./DeleteBranchModal";

type BranchesTableProps = {
  branches: Branch[];
};

const BranchesTable = ({ branches }: BranchesTableProps) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const columns = useMemo<ColumnDef<Branch>[]>(
    () => [
      {
        accessorKey: "title",
        header: "عنوان شعبه",
        size: 100,
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-gray-8">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "phoneNumber1",
        header: "شماره تلفن ۱",
        size: 120,
        cell: ({ getValue }) => (
          <span dir="ltr" className="text-xs text-gray-7">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "phoneNumber2",
        header: "شماره تلفن ۲",
        size: 120,
        cell: ({ getValue }) => {
          const phone = getValue<string | null>();

          return (
            <span dir="ltr" className="text-xs text-gray-7">
              {phone || "-"}
            </span>
          );
        },
      },
      {
        accessorKey: "address",
        header: "آدرس",
        size: 200,
        cell: ({ getValue }) => (
          <span className="mx-auto block max-w-55 truncate text-xs text-gray-7">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "workingHours",
        header: "ساعات کاری",
        size: 100,
        cell: ({ getValue }) => (
          <span className="mx-auto block max-w-35 truncate text-xs text-gray-7">
            {getValue<string>()}
          </span>
        ),
      },
      {
        id: "edit",
        header: "ویرایش",
        size: 60,
        cell: ({ row }) => (
          <Button type="button" variant="secondary" asChild className="p-1">
            <Link href={`${EDIT_BRANCH_PATH}/${row.original._id}`}>
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
            onClick={() => setSelectedBranch(row.original)}
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
    data: branches,
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
      <DeleteBranchModal
        open={selectedBranch !== null}
        onClose={() => setSelectedBranch(null)}
        branchId={selectedBranch?._id ?? ""}
      />
    </>
  );
};

export default BranchesTable;
