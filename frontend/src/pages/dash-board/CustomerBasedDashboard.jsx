import DashboardLayout from "../../layouts/DashboardLayout"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCustRFqs } from "../../features/rfq/rfqSlice";
import { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState } from "react";
import RFQTable from "../../components/CustomerTables/RfqTable";
const CustomerBasedDashboard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const navigateToCreateRFQ = ()=>{
    navigate("/createrfq")
  }
  const {customerRfqs,loading} = useSelector((state)=>state.rfq)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCustRFqs({ page: 1, limit: 5 }))
  },[dispatch])
   useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // cleanup
  }, []);


  return (

    <DashboardLayout>
      {
        show?(
           <div className="p-8 space-y-10 bg-gray-50 min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Dashboard
          </h1>

          <button onClick={navigateToCreateRFQ} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
            + Create RFQ
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">My RFQs</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-600">12</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Pending RFQs</p>
            <h2 className="text-3xl font-bold mt-2 text-yellow-500">4</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Quotations Received</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-600">18</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Approved Quotes</p>
            <h2 className="text-3xl font-bold mt-2 text-green-600">6</h2>
          </div>

        </div>


       {/* My RFQs */}
{customerRfqs && customerRfqs.length > 0 ? (
  <RFQTable/>
) : (
  <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
    No RFQs found
  </div>
)}
      </div>
        ):(
          <LoadingSpinner/>

        )
      }
      
      

     

    </DashboardLayout>

  )
}

export default CustomerBasedDashboard