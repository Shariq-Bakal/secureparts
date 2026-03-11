import { useState, useEffect } from "react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { getRfq } from "../../features/rfq/rfqSlice"
import { useDispatch, useSelector } from "react-redux"
import dayjs from "dayjs" // to handle date calculations
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const RFQList = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)

  const rfqs = useSelector((state) => state.rfq.rfqs) || []
  const loading = useSelector((state) => state.rfq.loading)
  const error = useSelector((state) => state.rfq.error)

  useEffect(() => {
    dispatch(getRfq(page))
  }, [dispatch, page])

  const statusStyle = {
    open: "bg-yellow-50 text-yellow-700 border-yellow-200",
    quoted: "bg-blue-50 text-blue-700 border-blue-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    closed: "bg-gray-50 text-gray-700 border-gray-200"
  }

  if (loading) return <p className="text-center mt-10">Loading RFQs...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error.message || error}</p>

  // Calculate remaining days for deadline
  const calculateDaysLeft = (deadline) => {
    const today = dayjs()
    const end = dayjs(deadline)
    const diff = end.diff(today, "day")
    return diff >= 0 ? `${diff} days left` : "Expired"
  }

  return (
    <DashboardLayout>
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">RFQs</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track request for quotations</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">Part Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3">Days Left</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rfqs.map((rfq) => (
                <tr key={rfq._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{rfq.partName}</td>
                  <td className="px-6 py-4 text-gray-600">{rfq.description}</td>
                  <td className="px-6 py-4 text-gray-600">{rfq.category}</td>
                  <td className="px-6 py-4">{rfq.quantity}</td>
                  <td className="px-6 py-4">{dayjs(rfq.deadline).format("DD/MM/YYYY")}</td>
                  <td className="px-6 py-4">{calculateDaysLeft(rfq.deadline)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-medium ${statusStyle[rfq.status.toLowerCase()]}`}
                    >
                      {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1 text-sm text-gray-500 hover:text-black">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing page {page}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RFQList