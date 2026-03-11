import DashboardLayout from "../../layouts/DashboardLayout"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createRfq } from "../../features/rfq/rfqSlice"

const CreateRFQ = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [rfqData, setRfqData] = useState({
    partName: "",
    category: "",
    quantity: "",
    deadline: "",
    description: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setRfqData({
      ...rfqData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    console.log(rfqData)
    await dispatch(createRfq(rfqData)).unwrap()

    navigate("/dashboard")

  } catch (error) {

    console.log("RFQ creation failed:", error)

  }
}

  return (

    <DashboardLayout>

      <div className="p-8 bg-gray-50 min-h-screen">

        <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8 space-y-6">

          <h1 className="text-2xl font-bold text-gray-800">
            Create RFQ
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Part Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Part Name
              </label>

              <input
                type="text"
                name="partName"
                value={rfqData.partName}
                onChange={handleChange}
                placeholder="Enter Part Name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>

              <select
                name="category"
                value={rfqData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="steel">Steel</option>
                <option value="electronics">Electronics</option>
                <option value="construction">Construction</option>
                <option value="machinery">Machinery</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={rfqData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={rfqData.deadline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={rfqData.description}
                onChange={handleChange}
                placeholder="Describe your requirement"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Submit RFQ
              </button>

              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </DashboardLayout>

  )
}

export default CreateRFQ