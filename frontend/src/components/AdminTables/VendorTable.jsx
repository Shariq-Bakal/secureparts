import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllPendingVendors,
  approveVend,
} from "../../features/admin/adminSlice"
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
} from "../table/TableStyle"

const columnHelper = createColumnHelper()

const VendorTable = () => {
  const dispatch = useDispatch()
  const { pendingVendors, loading, noPendingVendors } = useSelector(
    (state) => state.admin
  )
  const [page, setPage] = useState(1)
  const totalPages = pendingVendors?.totalPages || 1

  useEffect(() => {
    dispatch(getAllPendingVendors(page))
  }, [dispatch, page])

  const handleApprove = (id) => {
    dispatch(approveVend(id))
  }

  const handleReject = (id) => {
    console.log("Reject vendor:", id)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        cell: (info) => (
          <span className="font-medium text-slate-900">{info.getValue()}</span>
        ),
        header: () => <span className="flex items-center">NAME</span>,
      }),
      columnHelper.accessor("email", {
        cell: (info) => (
          <span className="text-slate-600">{info.getValue()}</span>
        ),
        header: () => <span className="flex items-center">EMAIL</span>,
      }),
      columnHelper.accessor("role", {
        cell: (info) => (
          <span className="text-slate-600">{info.getValue()}</span>
        ),
        header: () => <span className="flex items-center">PART NAME</span>,
      }),
      columnHelper.accessor("vendorStatus", {
        cell: (info) => {
          const value = info.getValue()
          return (
            <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
              {value}
            </span>
          )
        },
        header: () => <span className="flex items-center">STATUS</span>,
      }),
      columnHelper.display({
        id: "actions",
        header: () => <span>ACTIONS</span>,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleReject(row.original._id)}
              className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow transition hover:cursor-pointer hover:bg-red-600"
            >
              Reject
            </button>
            <button
              onClick={() => handleApprove(row.original._id)}
              className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white shadow transition hover:cursor-pointer hover:bg-green-600"
            >
              Accept
            </button>
          </div>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data: pendingVendors || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Pending Vendors</h2>
      </div>

      {noPendingVendors && (
        <p className="text-sm font-medium text-green-600">
          All vendors approved ✅
        </p>
      )}

      <div className={tableWrapperClass}>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full table-auto">
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
                    Loading...
                  </td>
                </tr>
              ) : pendingVendors && pendingVendors.length > 0 ? (
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
                    No Pending Vendors
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional temporary pagination buttons if you already use page state */}
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

export default VendorTable