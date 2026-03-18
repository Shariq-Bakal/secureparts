import DashboardLayout from "../../layouts/DashboardLayout"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getStats, getAllUsers, getRFQs, getAllPendingVendors } from "../../features/admin/adminSlice"

const AdminDashboard = () => {

  const dispatch = useDispatch()

  const { stats, users, rfqs, loading, pendingVendors } = useSelector((state) => state.admin)

  const [activeTab, setActiveTab] = useState("users")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5

  // =============================
  // Fetch data
  // =============================

  useEffect(() => {

    dispatch(getStats())
    dispatch(getRFQs(currentPage))
    dispatch(getAllUsers(currentPage))
    dispatch(getAllPendingVendors(currentPage))

  }, [dispatch, currentPage])
  console.log(pendingVendors,"pendingVendors")


  // =============================
  // Dummy Vendors
  // =============================

  const vendors = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    company: `Vendor ${i + 1}`,
    email: `vendor${i + 1}@company.com`,
    location: ["USA", "UK", "Canada", "Australia", "Germany"][i % 5],
    status: i % 3 === 0 ? "pending" : "approved"
  }))



  // =============================
  // Table Data
  // =============================

  const tableData =
    activeTab === "users"
      ? users?.users || []
      : activeTab === "rfqs"
      ? rfqs || []
      : vendors.filter((v) => v.status === "pending")



  // =============================
  // Pagination
  // =============================

  const totalPages =
    activeTab === "users"
      ? users?.totalPages || 1
      : Math.ceil(tableData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage

  const paginatedData =
    activeTab === "users"
      ? tableData
      : tableData.slice(startIndex, startIndex + itemsPerPage)



  // =============================
  // Tab Change
  // =============================

  const handleTabChange = (tab) => {

    setActiveTab(tab)
    setCurrentPage(1)

    if (tab === "users") dispatch(getAllUsers(1))
    if (tab === "rfqs") dispatch(getRFQs())

  }



  // =============================
  // Pagination Actions
  // =============================

  const handleNext = () => {

    if (currentPage < totalPages) {
    setCurrentPage((p) => p + 1)
  }

  }

  const handlePrev = () => {

    setCurrentPage((p) => Math.max(1, p - 1))

  }



  return (

    <DashboardLayout>

      <div className="min-h-screen bg-gray-50 p-6 lg:p-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>



        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <StatCard label="Total Users" value={stats?.totalUsers || 0} />

          <StatCard label="Total RFQs" value={stats?.totalRFQs || 0} />

          <StatCard label="Accepted Quotes" value={stats?.acceptedQuotations || 0} />

          <StatCard label="Total Quotes" value={stats?.totalQuotations || 0} />

        </div>



        {/* Tabs */}

        <div className="flex gap-4 mb-6">

          <TabButton
            label="Users"
            active={activeTab === "users"}
            onClick={() => handleTabChange("users")}
          />

          <TabButton
            label="RFQs"
            active={activeTab === "rfqs"}
            onClick={() => handleTabChange("rfqs")}
          />

          <TabButton
            label="Pending Vendors"
            active={activeTab === "vendors"}
            onClick={() => handleTabChange("vendors")}
          />

        </div>



        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="overflow-x-auto">

            <table className="min-w-full text-sm">

              <thead className="bg-gray-100 text-gray-600 text-xs uppercase">

                {activeTab === "users" && (

                  <tr>

                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>

                  </tr>

                )}

                {activeTab === "rfqs" && (

                  <tr>

                    <th className="px-6 py-3 text-left">Part Name</th>

                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Quantity</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Category</th>
                     <th className="px-6 py-3 text-left">Deadline</th>
                  </tr>

                )}

                {activeTab === "vendors" && (

                  <tr>

                    <th className="px-6 py-3 text-left">Company</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Location</th>

                  </tr>

                )}

              </thead>



              <tbody className="divide-y">

                {loading ? (

                  <tr>
                    <td colSpan="4" className="text-center py-6">
                      Loading...
                    </td>
                  </tr>

                ) : paginatedData.map((item, i) => (

                  activeTab === "users" ? (

                    <tr key={item._id || i}>

                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.role}</td>

                    </tr>

                  ) : activeTab === "rfqs" ? (

                    <tr key={item._id || i}>

                      <td className="px-6 py-4">{item.partName}</td>
                      <td className="px-6 py-4">{item.createdBy.name}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.deadline}</td>

                    </tr>

                  ) : (

                    <tr key={item.id}>

                      <td className="px-6 py-4">{item.company}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.location}</td>

                    </tr>

                  )

                ))}

              </tbody>

            </table>

          </div>



          {/* Pagination */}

          <div className="flex justify-between items-center p-4 border-t">

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex gap-2">

              <button
                onClick={handlePrev}
                className="px-3 py-1 border rounded"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                className="px-3 py-1 border rounded"
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



const StatCard = ({ label, value }) => (

  <div className="bg-white p-6 rounded-xl shadow">

    <p className="text-gray-500 text-sm">{label}</p>

    <h2 className="text-3xl font-bold text-blue-600">
      {value}
    </h2>

  </div>

)



const TabButton = ({ label, active, onClick }) => (

  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm ${
      active ? "bg-blue-600 text-white" : "bg-white border"
    }`}
  >
    {label}
  </button>

)

export default AdminDashboard