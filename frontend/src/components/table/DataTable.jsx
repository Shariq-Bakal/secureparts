// DataTable.jsx
import React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  tableWrapperClass,
  thClass,
  tdClass,
  rowClass,
  headerClass,
} from "./tableStyles"

function DataTable({
  data = [],
  columns = [],
  title,
  isLoading = false,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (isLoading) {
    return (
      <div className={tableWrapperClass}>
        <div className="p-6 text-sm text-slate-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className={tableWrapperClass}>
      {title && (
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full table-auto">
          <thead className={headerClass}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className={thClass}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className={rowClass}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={tdClass}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length === 0 && (
        <div className="p-6 text-sm text-slate-500">No data found.</div>
      )}
    </div>
  )
}

export default DataTable