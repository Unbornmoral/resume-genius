import React from "react";

function PersonalInfoForm({ personalInfo, setPersonalInfo }) {
  return (
    <form className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={personalInfo.name}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, name: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 p-3"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={personalInfo.email}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, email: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 p-3"
          placeholder="Enter your email address"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          value={personalInfo.phone}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, phone: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 p-3"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={personalInfo.address}
          onChange={(e) =>
            setPersonalInfo({ ...personalInfo, address: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 p-3"
          placeholder="Enter your address"
        />
      </div>
    </form>
  );
}

export default PersonalInfoForm;
