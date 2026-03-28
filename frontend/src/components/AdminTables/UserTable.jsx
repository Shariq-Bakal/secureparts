import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../features/admin/adminSlice"
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"

const UsersTable = () => {
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.admin)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getAllUsers(page))
  }, [dispatch, page])

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => {
        const value = info.getValue()
        return (
          <span
            className={`${
              value === "vendor"
                ? "bg-yellow-100 text-yellow-800"
                : value === "customer"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            } px-2 py-1 rounded-full text-xs font-semibold`}
          >
            {value}
          </span>
        )
      }
    })
  ]

  const totalPages = users?.totalPages || 1
  const table = useReactTable({
    data: users?.users || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 font-medium text-gray-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            page === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            page === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UsersTable