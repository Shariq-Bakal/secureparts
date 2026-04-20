import DashboardLayout from "../../layouts/DashboardLayout"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getOpenRfqsDetail } from "../../features/rfq/rfqSlice"
import { submiTQuotation } from "../../features/quotation/quotationSlice"
import { useState } from "react"

const RfqDetails = () => {
    const {id} = useParams();
    const {openRfqDetails} = useSelector((state=>state.rfq));
    const [quotationData, setQuotationData] = useState({
        price: 0,
        deliveryTime: 0,
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setQuotationData({
            ...quotationData,
            [name]: value
        })
    }
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getOpenRfqsDetail(id))   
    }, [dispatch, id])
    const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!id) {
    alert('No RFQ ID found')
    return
  }
  
  setIsSubmitting(true)
  
  try {
    console.log("Dispatching with ID:", id)
    console.log("Dispatching with data:", quotationData)
    
    // ✅ Pass as object matching the thunk expectation
    const result = await dispatch(submiTQuotation({ 
      data: quotationData, 
      id: id 
    }))
    
    if (result.error) {
      throw new Error(result.error)
    }
    
    console.log("Success result:", result)
    alert('Quotation submitted successfully!')
    
    // Optional: Reset form
    setQuotationData({
      price: 0,
      deliveryTime: 0,
      message: "",
    })
    
  } catch (error) {
    console.log('Submission error:', error)
    alert('Failed to submit quotation. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}
    
    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">RFQ Details</h1>
                    <p className="text-gray-500 mt-1">Review requirements and submit your quotation</p>
                </div>

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT: RFQ DETAILS */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main RFQ Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-900">Request Details</h2>
                            </div>
                            
                            <div className="p-6">
                                <dl className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Part Name</dt>
                                        <dd className="col-span-2 text-sm font-medium text-gray-900">{openRfqDetails?.partName}</dd>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Category</dt>
                                        <dd className="col-span-2 text-sm text-gray-900">{openRfqDetails?.category}</dd>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Quantity</dt>
                                        <dd className="col-span-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700">
                                                {openRfqDetails?.quantity}
                                            </span>
                                        </dd>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Deadline</dt>
                                        <dd className="col-span-2">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm text-gray-900">{openRfqDetails?.deadline}</span>
                                                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">12 days left</span>
                                            </div>
                                        </dd>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                                        <dd className="col-span-2 text-sm text-gray-700 leading-relaxed">
                                            {openRfqDetails?.description}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-900">Requirements</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-700">ISO 9001:2015 certified</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-700">Material: Ceramic composite</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-700">Warranty: Minimum 12 months</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: QUOTATION FORM */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-6">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
                                <h2 className="text-lg font-semibold text-white">Submit Quotation</h2>
                                <p className="text-blue-100 text-sm mt-1">Provide your best offer</p>
                            </div>

                            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price per Unit <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="0.00"
                                            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                                            value={quotationData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Total: ${(quotationData.price * (openRfqDetails?.quantity || 0)).toFixed(2)} for {openRfqDetails?.quantity || 0} units
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Delivery Timeline (days) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            name="deliveryTime"
                                            placeholder="Enter number of days"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                                            value={quotationData.deliveryTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Production and shipping time</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Message
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="Include any special notes, terms, or conditions..."
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none resize-none"
                                        value={quotationData.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !openRfqDetails?._id}
                                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Quotation'}
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Save as Draft
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 text-center">
                                        By submitting, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default RfqDetails