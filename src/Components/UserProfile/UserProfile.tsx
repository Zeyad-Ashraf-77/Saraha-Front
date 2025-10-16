import { Card } from "flowbite-react";
import { Edit, LogOut, Snowflake } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-lg">
        User Profile
      </h1>

      <Card className="max-w-md w-full p-6 bg-white shadow-xl">
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-28 h-28 rounded-full mb-4 shadow-md"
          />
          <h2 className="text-2xl font-semibold">Zeyad Ashraf</h2>
          <p className="text-gray-500 text-sm mb-2">zeyad@example.com</p>
          <p className="text-gray-600 text-sm mb-4">Joined: Jan 2025</p>

          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700">
              <Edit size={18} /> Edit Profile
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300">
              <Snowflake size={18} /> Freeze
            </button>
          </div>

          <button className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 mt-6 rounded-lg shadow hover:bg-red-600">
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </Card>
    </div>
  );
}
