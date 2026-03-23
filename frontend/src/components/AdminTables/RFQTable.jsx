import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRFQs } from "../../features/admin/adminSlice"

const RFQTable = () => {

  const dispatch = useDispatch()
  const { rfqs, loading } = useSelector((state) => state.admin)
  console.log(rfqs,"fsfsafadsf")

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getRFQs(page))
  }, [dispatch, page])

  const totalPages = rfqs?.totalPages || 1

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          RFQS
        </h2>

        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm text-left">

          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">Part Name</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Category</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : rfqs.length > 0 ? (

              rfqs.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50 transition">

                  {/*Part Name */}
                  <td className="p-4 font-medium text-gray-800">
                    {r.partName}
                  </td>

                   <td className="p-4 font-medium text-gray-800">
                    {r.quantity}
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {r.category}
                  </td>
                   <td className="p-4 font-medium text-gray-800">
                    {r.createdBy.name}
                  </td>

                  {/* Email */}
                  <td className="p-4 text-gray-600">
                    {r.email}
                  </td>


                </tr>
              ))

            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
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