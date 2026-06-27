import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table"
import { tableWrapperClass,headerClass, thClass, tdClass, rowClass } from "../../components/table/TableStyle"

import {
  getCusTomerRfqDetails
} from "../../features/rfq/rfqSlice";

import {
  getQuotationsByRfqThunk
} from "../../features/quotation/quotationSlice";

const CustomerRFQDetail = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  
  // Debug logging
  useEffect(() => {
    console.log("=== CustomerRFQDetail Debug ===");
    console.log("URL path:", location.pathname);
    console.log("ID from params:", id);
    console.log("State from navigation:", location.state);
  }, [location, id]);

  // ================= RFQ STATE =================
  const {
    customerRfqDetails,
    loading,
    error
  } = useSelector((state) => state.rfq);

  // ================= QUOTATION STATE =================
  const {
    vendorQuotations,
    loading: quoteLoading,
    error: quoteError
  } = useSelector((state) => state.quotation);

  // ================= FETCH DATA =================
  useEffect(() => {
    if (id) {
      console.log("Fetching data for RFQ ID:", id);
      dispatch(getCusTomerRfqDetails(id));
      console.log(vendorQuotations)
      dispatch(getQuotationsByRfqThunk(id));
      console.log(vendorQuotations)
    } else {
      console.error("No ID found in URL params");
    }
  }, [id, dispatch]);

  // Helper function to safely get error message
  const getErrorMessage = (err) => {
    if (!err) return null;
    if (typeof err === 'string') return err;
    if (err.message) return err.message;
    if (err.error) return err.error;
    return "An unexpected error occurred";
  };

  // If no ID, show error
  if (!id) {
    return (
      <DashboardLayout>
        <div className="min-h-screen py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-red-600 text-xl font-bold mb-2">Error: No RFQ ID</h2>
              <p className="text-red-500 mb-4">
                Unable to find RFQ ID in the URL.
              </p>
              <button
                onClick={() => navigate("/customer/rfqs")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Back to RFQs
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ================= LOADING =================
  if (loading || quoteLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mt-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ================= ERROR =================
  if (error || quoteError) {
    const errorMessage = getErrorMessage(error) || getErrorMessage(quoteError) || "An error occurred";
    
    return (
      <DashboardLayout>
        <div className="min-h-screen py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-red-600 text-xl font-bold mb-2">Error Loading Data</h2>
              <p className="text-red-500 mb-4">
                {errorMessage}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    dispatch(getCusTomerRfqDetails(id));
                    dispatch(getQuotationsByRfqThunk(id));
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Retry
                </button>
                <button
                  onClick={() => navigate("/customer/rfqs")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Back to RFQs
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Check if RFQ exists
  if (!loading && !customerRfqDetails) {
    return (
      <DashboardLayout>
        <div className="min-h-screen py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-yellow-600 text-xl font-bold mb-2">RFQ Not Found</h2>
              <p className="text-yellow-500 mb-4">
                The requested RFQ could not be found.
              </p>
              <button
                onClick={() => navigate("/customer/rfqs")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Back to RFQs
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* HEADER */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/customer/rfqs")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold mt-4">
              RFQ Details
            </h1>
          </div>

          {/* RFQ DETAILS */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow">
            <div className="grid grid-cols-2 gap-4">
              <p><b>ID:</b> {customerRfqDetails?._id || id}</p>
              <p><b>Part Name:</b> {customerRfqDetails?.partName || 'N/A'}</p>
              <p><b>Created:</b> {customerRfqDetails?.createdAt ? new Date(customerRfqDetails.createdAt).toLocaleDateString() : 'N/A'}</p>
              <p><b>Deadline:</b> {customerRfqDetails?.deadline ? new Date(customerRfqDetails.deadline).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="mt-4">
              <p><b>Description:</b> {customerRfqDetails?.description || 'No description'}</p>
            </div>
          </div>

          {/* QUOTATIONS */}
          <h2 className="text-2xl font-bold mb-4">
            Quotations
          </h2>

          {!vendorQuotations || vendorQuotations.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">
                No quotations found for this RFQ yet.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                When vendors submit quotations, they will appear here.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {vendorQuotations.map((q) => (
                <div
                  key={q._id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {q.supplierName || "Supplier"}
                  </h3>

                  <p className="text-purple-600 text-2xl font-bold mb-3">
                    ${q.totalAmount?.toLocaleString() || '0'}
                  </p>

                  <div className="space-y-1 text-gray-600">
                    <p>Delivery: {q.deliveryTime || 'N/A'}</p>
                    <p>Payment Terms: {q.paymentTerms || 'N/A'}</p>
                  </div>

                  {/* ITEMS */}
                  {q.items && Array.isArray(q.items) && q.items.length > 0 && (
                    <div className="mt-4 pt-3 border-t">
                      <p className="font-semibold mb-2">Items:</p>
                      <div className="space-y-1">
                        {q.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.name || 'Item'} x {item.quantity || 0}
                            </span>
                            <span className="font-medium">
                              ${item.total?.toLocaleString() || '0'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerRFQDetail;