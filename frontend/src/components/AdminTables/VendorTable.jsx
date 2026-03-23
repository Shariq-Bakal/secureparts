import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPendingVendors, approveVend } from "../../features/admin/adminSlice"

const VendorTable = () => {

  const dispatch = useDispatch()
  const { pendingVendors, loading, noPendingVendors } = useSelector(
    (state) => state.admin
  )

  useEffect(() => {
    dispatch(getAllPendingVendors())
  }, [dispatch])

  const handleApprove = (id) => {
    dispatch(approveVend(id))
  }

  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">Pending Vendors</h2>

      {noPendingVendors && (
        <p className="text-green-600">All vendors approved ✅</p>
      )}

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan="3">Loading...</td></tr>
          ) : pendingVendors.length > 0 ? (
            pendingVendors.map((v) => (
              <tr key={v._id}>
                <td className="p-3">{v.name}</td>
                <td className="p-3">{v.email}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleApprove(v._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No vendors</td></tr>
          )}
        </tbody>

      </table>

    </div>
  )
}

export default VendorTable