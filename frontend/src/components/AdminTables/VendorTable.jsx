import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPendingVendors, approveVend } from "../../features/admin/adminSlice"
import { createColumnHelper,getCoreRowModel,useReactTable, flexRender  } from "@tanstack/react-table"
import { useState } from "react"
const VendorTable = () => {

  const dispatch = useDispatch()
  const { pendingVendors, loading, noPendingVendors } = useSelector(
    (state) => state.admin
  )
  console.log(pendingVendors)
   const [page, setPage] = useState(1)


  useEffect(() => {
    dispatch(getAllPendingVendors(page))
  }, [dispatch,page])


  const handleApprove = (id) => {
    dispatch(approveVend(id))
  }
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name",{
      cell:(info)=>info.getValue(),
      header: <span className="flex items-center">NAME</span>,
    }),
    columnHelper.accessor("email",{
      cell:(info)=>info.getValue(),
      header: <span className="flex items-center">EMAIL</span>,
    }),
    columnHelper.accessor("role",{
      cell:(info)=>info.getValue(),
      header: <span className="flex items-center">PART NAME</span>,
    }),
  ]
  const table = useReactTable({
    data:pendingVendors || [],
    columns,
    getCoreRowModel:getCoreRowModel()
    
  })

  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">Pending Vendors</h2>

      {noPendingVendors && (
        <p className="text-green-600">All vendors approved ✅</p>
      )}

      <table className="w-full border">

        <thead className="bg-gray-50">
  {table.getHeaderGroups().map(headerGroup => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map(header => (
        <th key={header.id} className="px-6 py-3 text-xs text-left uppercase">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  ))}
</thead>
      <tbody className="divide-y bg-white divide-gray-200">
  {loading ? (
    <tr>
      <td colSpan={columns.length} className="text-center py-6 text-gray-500">
        Loading...
      </td>
    </tr>
  ) : pendingVendors&& pendingVendors.length > 0 ? (
    table.getRowModel().rows.map(row => (
      <tr key={row.id} className="hover:bg-gray-50">
        {row.getVisibleCells().map(cell => (
          <td key={cell.id} className="px-6 py-4 text-sm text-gray-500">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))
  ) :(
    <tr>
      <td colSpan={columns.length} className="text-center py-6 text-gray-400">
        No Pending Vendors
      </td>
    </tr>
  ) }
</tbody>


      </table>

    </div>
  )
}

export default VendorTable