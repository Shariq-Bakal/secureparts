import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRfq } from "../../features/rfq/rfqSlice";

const Home= () => {
  const dispatch = useDispatch();
  const [page] = useState(1);

  const rfqs = useSelector((state) => state.rfq.rfqs) || [];
  const loading = useSelector((state) => state.rfq.loading);
  const error = useSelector((state) => state.rfq.error);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getRfq(page));
  }, [dispatch, page]);

  const total = rfqs.length;
  const pending = rfqs.filter((r) => r.status === "open").length;
  const approved = rfqs.filter((r) => r.status === "approved").length;
  const quoted = rfqs.filter((r) => r.status === "quoted").length;

  const daysLeft = (deadline) => {
    const now = new Date();
    const d = new Date(deadline);
    const diffTime = d - now;
    return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl p-8 md:p-12 mb-10 shadow-lg text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Hello, {user?.name || "User"}!
        </h1>
        <p className="text-md md:text-lg mb-4">
          Manage your RFQs efficiently. Track, create, and monitor requests in one place.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
          <a
            href="/rfqs/create"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            Create New RFQ
          </a>
          <a
            href="/rfqs"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            View All RFQs
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-gray-500 mb-2">Total RFQs</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl shadow text-center">
          <h2 className="text-yellow-700 mb-2">Pending</h2>
          <p className="text-2xl font-bold">{pending}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow text-center">
          <h2 className="text-blue-700 mb-2">Quoted</h2>
          <p className="text-2xl font-bold">{quoted}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow text-center">
          <h2 className="text-green-700 mb-2">Approved</h2>
          <p className="text-2xl font-bold">{approved}</p>
        </div>
      </section>

      {/* Recent RFQs Table */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-x-auto shadow">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Part Name</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Deadline</th>
              <th className="px-6 py-3 text-left">Days Left</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rfqs.slice(0, 5).map((rfq) => (
              <tr key={rfq._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{rfq.partName}</td>
                <td className="px-6 py-4 text-gray-600">{rfq.quantity}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(rfq.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-gray-600">{daysLeft(rfq.deadline)} days</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full border text-xs ${
                      rfq.status === "open"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : rfq.status === "quoted"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-green-50 text-green-700 border-green-200"
                    }`}
                  >
                    {rfq.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Home;