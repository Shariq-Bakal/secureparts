import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRFQs } from "../../features/admin/adminSlice"
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table"
import {User} from "lucide-react"

const RFQTable = () => {

  const dispatch = useDispatch()
  const { rfqs, loading } = useSelector((state) => state.admin)


  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getRFQs(page))
  }, [dispatch, page])
  const totalPages = rfqs?.totalPages || 1
  const columHelper = createColumnHelper();
  const columns = [
    columHelper.accessor("partName",{
      cell:(info)=>info.getValue(),
      header:()=>(
        <span className="flex items-center">
          PART NAME
        </span>
      ),
      

    }),
    columHelper.accessor("quantity",{
      cell:(info)=>info.getValue(),
      header:()=>(
        <span className="flex items-center">
          Quantity
        </span>
      ),
      

    }),
    columHelper.accessor(row => row.createdBy?.name, {
  id: "customer",
  cell: (info) => info.getValue(),
  header: () => (
    <span className="flex items-center">
      Customer
    </span>
  ),
}),
    columHelper.accessor("status",{
      cell:(info)=>info.getValue(),
      header:()=>(
        <span className="flex items-center">
          STATUS
        </span>
      ),
      

    })
  ]
  const table = useReactTable({
    data:rfqs|| [],
    columns,
    getCoreRowModel:getCoreRowModel()
  })
  console.log(table .getHeaderGroups(),"safasdfsdf")

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="overflow-x-auto">

        <table className="min-w-full text-sm text-left">

          <thead className="bg-gray-50">
            {
              table.getHeaderGroups().map(headerGroup=>(
                <tr key={headerGroup.id} className="px-6 py-3 text-xs text-left uppercase" >
                  {
                    headerGroup.headers.map(header=>(
                      <th key={header.id}>
                        <div>
                          {
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          }
                        </div>

                      </th>
                    ))
                  }

                </tr>
              ))
            }
          </thead>
          <tbody className="divide-y bg-white divide-gray-200">

  {loading ? (
    <tr>
      <td colSpan="4" className="text-center py-6 text-gray-500">
        Loading RFQs...
      </td>
    </tr>
  ) : table.getRowModel().rows.length > 0 ? (

    table.getRowModel().rows.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50 transition">

        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
      <td colSpan="4" className="text-center py-6 text-gray-400">
        No RFQS found
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
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
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
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Next
        </button>

      </div>

    </div>
  )
}

export default RFQTable