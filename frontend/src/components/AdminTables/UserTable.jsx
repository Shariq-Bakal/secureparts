import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../features/admin/adminSlice"

const UsersTable = () => {

  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.admin)

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getAllUsers(page))
  }, [dispatch, page])

  const totalPages = users?.totalPages || 1

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Users
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
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : users?.users?.length > 0 ? (

              users.users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition">

                  {/* Name */}
                  <td className="p-4 font-medium text-gray-800">
                    {u.name}
                  </td>

                  {/* Email */}
                  <td className="p-4 text-gray-600">
                    {u.email}
                  </td>

                  {/* Role */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : u.role === "vendor"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                </tr>
              ))

            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
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

export default UsersTable