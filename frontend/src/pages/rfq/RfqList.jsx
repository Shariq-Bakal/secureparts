import { useState, useEffect } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { getOpenRfqs } from "../../features/rfq/rfqSlice"
import { useDispatch, useSelector } from "react-redux"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"

dayjs.extend(relativeTime)

const RFQList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [minTimeDone, setMinTimeDone] = useState(false)

  // ✅ FIXED: correct state
  const rfqs = useSelector((state) => state.rfq.openRfqs) || []
  const loading = useSelector((state) => state.rfq.loading)
  const error = useSelector((state) => state.rfq.error)

  // Fetch RFQs
  useEffect(() => {
    dispatch(getOpenRfqs(page))
  }, [dispatch, page])
  console.log(rfqs)

  // Minimum 2 sec loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeDone(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const statusStyle = {
    open: "bg-yellow-50 text-yellow-700 border-yellow-200",
    quoted: "bg-blue-50 text-blue-700 border-blue-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    closed: "bg-gray-50 text-gray-700 border-gray-200"
  }

  // Loader condition
  if (loading || !minTimeDone) {
    return <LoadingSpinner />
  }

  // Calculate days left
  const calculateDaysLeft = (deadline) => {
    const today = dayjs()
    const end = dayjs(deadline)
    const diff = end.diff(today, "day")
    return diff >= 0 ? `${diff} days left` : "Expired"
  }

  const handleView = (id) => {
    navigate(`/rfqs/${id}`)
  }

  return (
    <DashboardLayout>
      {error ? (
        <p className="text-center mt-10 text-red-600">
          {error.message || error}
        </p>
      ) : (
        <div className="p-8 bg-gray-50 min-h-screen">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">RFQs</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track request for quotations
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-full border-collapse">
              
              <thead className="bg-blue-600 h-16">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-white">Part Name</th>
                  <th className="px-4 py-3 text-left text-sm text-white">Posted by</th>
                  <th className="px-4 py-3 text-left text-sm text-white">Category</th>
                  <th className="px-4 py-3 text-left text-sm text-white">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm text-white">Deadline</th>
                  <th className="px-4 py-3 text-left text-sm text-white">Days Left</th>
                  <th className="px-4 py-3 text-left text-sm text-white">Status</th>
                  <th className="px-4 py-3 text-left text-sm text-white">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rfqs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">
                      No RFQs found
                    </td>
                  </tr>
                ) : (
                  rfqs.map((rfq) => (
                    <tr
                      key={rfq._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-sm">{rfq.partName}</td>
                      <td className="px-4 py-3 text-sm">{rfq.createdBy.name}</td>
                      <td className="px-4 py-3 text-sm">{rfq.category}</td>
                      <td className="px-4 py-3 text-sm">{rfq.quantity}</td>

                      <td className="px-4 py-3 text-sm">
                        {dayjs(rfq.deadline).format("DD/MM/YYYY")}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {calculateDaysLeft(rfq.deadline)}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusStyle[rfq.status?.toLowerCase()] || ""
                          }`}
                        >
                          {rfq.status
                            ? rfq.status.charAt(0).toUpperCase() +
                              rfq.status.slice(1)
                            : "N/A"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleView(rfq._id)}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
              <p className="text-sm text-gray-600">
                Showing page {page}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 border rounded bg-blue-600 text-white"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default RFQList