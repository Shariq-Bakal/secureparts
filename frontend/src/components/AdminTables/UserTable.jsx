import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../features/admin/adminSlice"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table"
import {
  tableWrapperClass,
  thClass,
  tdClass,
  rowClass,
  headerClass,
} from "../table/TableStyle"// or inline classes if you don't have this yet

const columnHelper = createColumnHelper()

const UsersTable = () => {
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.admin)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getAllUsers(page))
  }, [dispatch, page])

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => (
          <span className="font-medium text-slate-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => (
          <span className="text-slate-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("role", {
        header: () => "Role",
        cell: (info) => {
          const value = info.getValue()
          return (
            <span
              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                value === "vendor"
                  ? "bg-yellow-100 text-yellow-700"
                  : value === "customer"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {value}
            </span>
          )
        },
      }),
      columnHelper.display({
        id: "actions",
        header: () => "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow transition hover:bg-red-600">
              Delete
            </button>
            <button className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white shadow transition hover:bg-purple-700">
              View
            </button>
          </div>
        ),
      }),
    ],
    []
  )

  const totalPages = users?.totalPages || 1
  const table = useReactTable({
    data: users?.users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={tableWrapperClass}>
      {/* Header Section */}
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900">Users</h2>
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className={headerClass}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={thClass}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-sm text-slate-500"
                >
                  Loading users...
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={rowClass}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={tdClass}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-sm text-slate-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-slate-100 px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              page === 1
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              page === totalPages
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default UsersTable