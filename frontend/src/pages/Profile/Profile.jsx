import { useState } from "react";

import {
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";


function Profile() {

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("LungAI User");
  const [email, setEmail] = useState("user@lungai.com");


  const handleSave = () => {

    setEditing(false);

    alert("Profile updated successfully.");

  };


  const handleCancel = () => {

    setName("LungAI User");
    setEmail("user@lungai.com");

    setEditing(false);

  };


  return (

    <div>

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
                {name}
              </h2>

              <p className="text-blue-100 mt-2">
                AI Lung Disease Detection Platform
              </p>

            </div>

          </div>

        </div>


        {/* Account Information */}

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


              {editing ? (

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              ) : (

                <p className="text-lg font-semibold">
                  {name}
                </p>

              )}

            </div>


            {/* Email */}

            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-3 mb-2">

                <FaEnvelope className="text-blue-600" />

                <p className="text-sm text-gray-500">
                  Email
                </p>

              </div>


              {editing ? (

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              ) : (

                <p className="text-lg font-semibold">
                  {email}
                </p>

              )}

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


          {/* Buttons */}

          {!editing ? (

            <button
              onClick={() => setEditing(true)}
              className="mt-8 flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >

              <FaEdit />

              Edit Profile

            </button>

          ) : (

            <div className="flex gap-4 mt-8">

              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
              >

                <FaSave />

                Save Changes

              </button>


              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-3 bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-xl font-semibold transition"
              >

                <FaTimes />

                Cancel

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}


export default Profile;