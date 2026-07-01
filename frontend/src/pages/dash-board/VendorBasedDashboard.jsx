import DashboardLayout from "../../layouts/DashboardLayout";
import socket from "../../sockets/socket.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const VendorBasedDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  
  console.log(user, "vendorrrr");

  useEffect(() => {
    if (!user?.id) return;

    const sendVendor = () => {
      if (socket.readyState === WebSocket.OPEN) {  // FIXED: Use WebSocket.OPEN instead of 1
        socket.send(JSON.stringify({
          role: "vendor",
          userId: user.id
        }));
        console.log("Vendor registered sent");
      } else {
        console.log("Socket not ready");
      }
    };

    const handleOpen = () => {
      console.log("Socket opened → registering vendor");
      sendVendor();
    };

    socket.addEventListener("open", handleOpen);

    // Important: also send immediately if already open
    sendVendor();

    return () => {
      socket.removeEventListener("open", handleOpen);
    };
  }, [user?.id]); // FIXED: Changed from user?._id to user?.id for consistency

  useEffect(() => {
    const handleMessage = (event) => {
      console.log("RAW WS MESSAGE:", event.data);

      let data;
      try {
        data = JSON.parse(event.data);
      } catch (err) {
        console.log("Not JSON:", event.data);
        return;
      }

      console.log("PARSED:", data);

      // Safer check
      const message = data?.message || data?.msg;

      if (message) {
        alert(message);
      } else {
        console.log("No message field found:", data);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, []); // FIXED: Removed socket from dependencies as it's external

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Title */}
        <h1 className="text-2xl font-bold">
          Vendor Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Available RFQs</p>
            <h2 className="text-2xl font-bold mt-2">34</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Quotes Submitted</p>
            <h2 className="text-2xl font-bold mt-2">12</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Accepted Orders</p>
            <h2 className="text-2xl font-bold mt-2">5</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <h2 className="text-2xl font-bold mt-2">$4200</h2>
          </div>
        </div>

        {/* Available RFQs */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Available RFQs
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th>Quantity</th>
                <th>Budget</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Steel Pipes</td>
                <td>500</td>
                <td>$2000</td>
                <td>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Send Quote
                  </button>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Aluminium Sheets</td>
                <td>200</td>
                <td>$1500</td>
                <td>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Send Quote
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* My Quotes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            My Submitted Quotes
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th>My Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Steel Pipes</td>
                <td>$1900</td>
                <td className="text-yellow-500">Pending</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Aluminium Sheets</td>
                <td>$1400</td>
                <td className="text-green-600">Accepted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorBasedDashboard;