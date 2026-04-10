import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRFQs } from "../../features/admin/adminSlice"
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table"
import {User} from "lucide-react"
import { tableWrapperClass,headerClass, thClass, tdClass, rowClass } from "../table/TableStyle"
import { getCustRFqs } from "../../features/rfq/rfqSlice"
const RFQTable = () => {

 


  const [page, setPage] = useState(1)

  const {customerRfqs,loading} = useSelector((state)=>state.rfq)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getCustRFqs({ page: 1, limit: 5 }))
    },[dispatch])
     useEffect(() => {
      const timer = setTimeout(() => {
        setShow(true);
      }, 2000); // 2 seconds delay
  
      return () => clearTimeout(timer); // cleanup
    }, []);
    console.log(customerRfqs,"customerrfqs")
  const totalPages = customerRfqs?.totalPages || 1
  const columnHelper = createColumnHelper();
  const columns = [
     columnHelper.accessor("partName", {
        header: () => "Part Name",
        cell: (info) => (
          <span className="font-medium text-slate-900">{info.getValue()}</span>
        ),
      }),
    columnHelper.accessor("quantity",{
      cell:(info)=>info.getValue(),
      header:()=>(
        <span className="flex items-center">
          Quantity
        </span>
      ),
      

    }),
    columnHelper.accessor("category", {
  cell: (info) => info.getValue(),
  header: () => (
    <span className="flex items-center">
      Category
    </span>
  ),
}),
    columnHelper.accessor("status",{
      cell:(info)=>info.getValue(),
      header:()=>(
        <span className="flex items-center">
          STATUS
        </span>
      ),
      

    })
  ]
  const table = useReactTable({
    data:customerRfqs|| [],
    columns,
    getCoreRowModel:getCoreRowModel()
  })
  console.log(table .getHeaderGroups(),"safasdfsdf")

  return (
    <div className={tableWrapperClass}>
        <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900">RFQS</h2>
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">

        <table className="min-w-full table-auto">

          <thead className={headerClass}>
            {
              table.getHeaderGroups().map(headerGroup=>(
                <tr key={headerGroup.id} className="px-6 py-3 text-xs text-left uppercase" >
                  {
                    headerGroup.headers.map(header=>(
                      <th key={header.id} className={thClass}>
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
          <tbody className="divide-y divide-slate-200 bg-white">

  {loading ? (
    <tr>
      <td colSpan="4" className="text-center py-6 text-gray-500">
        Loading RFQs...
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
      <td colSpan="4" className="text-center py-6 text-gray-400">
        No RFQS found
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

export default RFQTable