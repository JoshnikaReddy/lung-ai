import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";

function Profile() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your LungAI profile and account information.
        </p>
      </div>


      {/* Profile Card */}
      <div className="max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Top section */}
        <div className="bg-blue-600 px-8 py-10">

          <div className="flex flex-col sm:flex-row items-center gap-6 text-white">

            <FaUserCircle
              size={110}
              className="text-white"
            />

            <div className="text-center sm:text-left">

              <h2 className="text-3xl font-bold">
                LungAI User
              </h2>

              <p className="text-blue-100 mt-2">
                AI Lung Disease Detection Platform
              </p>

            </div>

          </div>

        </div>


        {/* Account information */}
        <div className="p-8">

          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>


          <div className="grid md:grid-cols-2 gap-6">

            {/* Name */}
            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-3 mb-2">

                <FaUserCircle className="text-blue-600" />

                <p className="text-sm text-gray-500">
                  Name
                </p>

              </div>

              <p className="text-lg font-semibold">
                LungAI User
              </p>

            </div>


            {/* Email */}
            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-3 mb-2">

                <FaEnvelope className="text-blue-600" />

                <p className="text-sm text-gray-500">
                  Email
                </p>

              </div>

              <p className="text-lg font-semibold">
                user@lungai.com
              </p>

            </div>


            {/* Role */}
            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-3 mb-2">

                <FaShieldAlt className="text-blue-600" />

                <p className="text-sm text-gray-500">
                  Account Role
                </p>

              </div>

              <p className="text-lg font-semibold">
                User
              </p>

            </div>


            {/* Member Since */}
            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-3 mb-2">

                <FaCalendarAlt className="text-blue-600" />

                <p className="text-sm text-gray-500">
                  Member Since
                </p>

              </div>

              <p className="text-lg font-semibold">
                2026
              </p>

            </div>

          </div>


          {/* Edit button */}
          <button
            className="mt-8 flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
          >

            <FaEdit />

            Edit Profile

          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;