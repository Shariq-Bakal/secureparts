import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerRFQDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rfq, setRfq] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchRFQDetails();
  }, [id]);

  const fetchRFQDetails = async () => {
    try {
      setLoading(true);
      // Fetch RFQ details
      const rfqResponse = await axios.get(`/api/rfqs/${id}`);
      setRfq(rfqResponse.data.data);
      
      // Fetch quotations for this RFQ
      const quotesResponse = await axios.get(`/api/rfqs/${id}/quotations`);
      setQuotations(quotesResponse.data.data);
      
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch RFQ details');
      console.error('Error fetching details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptQuote = async (quotationId) => {
    try {
      setProcessingId(quotationId);
      await axios.put(`/api/quotations/${quotationId}/accept`, {
        status: 'accepted'
      });
      
      setQuotations(prevQuotes =>
        prevQuotes.map(quote =>
          quote._id === quotationId
            ? { ...quote, status: 'accepted' }
            : quote
        )
      );
      
      alert('Quote accepted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept quote');
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectQuote = async (quotationId) => {
    try {
      setProcessingId(quotationId);
      await axios.put(`/api/quotations/${quotationId}/reject`, {
        status: 'rejected'
      });
      
      setQuotations(prevQuotes =>
        prevQuotes.map(quote =>
          quote._id === quotationId
            ? { ...quote, status: 'rejected' }
            : quote
        )
      );
      
      alert('Quote rejected successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject quote');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          <p className="mt-4 text-lg">Loading RFQ details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/customer/rfqs')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Back to RFQs
          </button>
        </div>
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">RFQ not found</h2>
          <button
            onClick={() => navigate('/customer/rfqs')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Back to RFQs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/customer/rfqs')}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all hover:translate-x-[-5px] inline-flex items-center gap-2"
          >
            ← Back to RFQs
          </button>
          <h1 className="text-3xl font-bold text-white mt-4">RFQ Details</h1>
        </div>

        {/* RFQ Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {rfq.title || 'Request for Quotation'}
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              rfq.status === 'open' ? 'bg-blue-100 text-blue-700' :
              rfq.status === 'closed' ? 'bg-gray-100 text-gray-700' :
              rfq.status === 'awarded' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {rfq.status || 'Open'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold">RFQ ID</label>
              <p className="text-gray-800 font-medium">{rfq.rfqNumber || rfq._id?.slice(-8)}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold">Created Date</label>
              <p className="text-gray-800">{new Date(rfq.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold">Deadline</label>
              <p className="text-gray-800">
                {rfq.deadline ? new Date(rfq.deadline).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold">Total Quotes</label>
              <p className="text-2xl font-bold text-purple-600">{quotations.length}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-500 uppercase font-semibold block mb-2">Description</label>
            <p className="text-gray-700 leading-relaxed">
              {rfq.description || 'No description provided'}
            </p>
          </div>

          {rfq.requirements && rfq.requirements.length > 0 && (
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-2">Requirements</label>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {rfq.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Quotations Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Quotations Received</h2>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white font-semibold">
              {quotations.length} Quotes
            </span>
          </div>

          {quotations.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 text-center text-white">
              <p className="text-lg mb-2">No quotations received yet</p>
              <p className="text-white/80">Check back later or share your RFQ with suppliers.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quotations.map((quote) => (
                <div
                  key={quote._id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                    quote.status === 'accepted' ? 'ring-2 ring-green-500' :
                    quote.status === 'rejected' ? 'ring-2 ring-red-500' :
                    'hover:shadow-xl'
                  }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {quote.supplierName || 'Supplier Quote'}
                      </h3>
                      {quote.status && (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          quote.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          quote.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {quote.status}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="text-2xl font-bold text-purple-600">
                          ${quote.totalAmount?.toLocaleString() || 'N/A'}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Time:</span>
                        <span className="text-gray-800 font-medium">
                          {quote.deliveryTime || 'Not specified'}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Valid Until:</span>
                        <span className="text-gray-800">
                          {quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : 'Not specified'}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Terms:</span>
                        <span className="text-gray-800">{quote.paymentTerms || 'Not specified'}</span>
                      </div>
                    </div>

                    {/* Items */}
                    {quote.items && quote.items.length > 0 && (
                      <div className="mb-4">
                        <label className="text-xs text-gray-500 uppercase font-semibold block mb-2">
                          Items Included
                        </label>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          {quote.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-700">
                                {item.name} x {item.quantity}
                              </span>
                              <span className="font-medium text-gray-800">
                                ${item.total?.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {quote.notes && (
                      <div className="mb-4">
                        <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">
                          Additional Notes
                        </label>
                        <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded">
                          {quote.notes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    {(!quote.status || quote.status === 'pending') && (
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => handleAcceptQuote(quote._id)}
                          disabled={processingId === quote._id}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                        >
                          {processingId === quote._id ? 'Processing...' : '✓ Accept Quote'}
                        </button>
                        <button
                          onClick={() => handleRejectQuote(quote._id)}
                          disabled={processingId === quote._id}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                        >
                          {processingId === quote._id ? 'Processing...' : '✗ Reject Quote'}
                        </button>
                      </div>
                    )}

                    {/* Status Badges */}
                    {quote.status === 'accepted' && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <p className="text-green-700 font-semibold">
                          ✓ Quote Accepted - Supplier will contact you soon
                        </p>
                      </div>
                    )}

                    {quote.status === 'rejected' && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                        <p className="text-red-700 font-semibold">
                          ✗ Quote Rejected
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerRFQDetail;