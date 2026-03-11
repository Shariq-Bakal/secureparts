import DashboardLayout from "../../layouts/DashboardLayout"
import { useSelector } from "react-redux"

const Profile = () => {
  const user = useSelector((state)=>state.auth.user);
  console.log(user)
  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto px-4">

        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">
          {user.name}
        </h1>

        {/* Profile Card */}
        <div className="bg-white shadow rounded-lg p-6">

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
              {user.name[0]}
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-xl font-semibold">
                {user.name}
              </h2>

              <p className="text-gray-500">
                {user.email}
              </p>

              <span className="mt-2 inline-block bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full">
                {user.role}
              </span>
            </div>

          </div>

        </div>


        {/* Account Details */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">

          <h2 className="text-lg font-semibold mb-4">
            Account Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Role</p>
              <p className="font-medium">{user.role}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Account Status</p>
              <p className="font-medium text-green-600">Active</p>
            </div>

          </div>

        </div>


        {/* Edit Profile Button */}
        <div className="mt-6 flex justify-center sm:justify-start">

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Edit Profile
          </button>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Profile