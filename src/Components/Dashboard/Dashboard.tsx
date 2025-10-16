import { Card } from "flowbite-react";
import { User, Mail, MessageCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-lg">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="hover:shadow-2xl transition bg-white">
          <User className="text-pink-600 w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-600 text-sm mb-3">
            Manage your profile and update your personal info.
          </p>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700">
            Go to Profile
          </button>
        </Card>

        <Card className="hover:shadow-2xl transition bg-white">
          <Mail className="text-pink-600 w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold">Messages</h2>
          <p className="text-gray-600 text-sm mb-3">
            View and manage all messages you’ve received.
          </p>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700">
            View Messages
          </button>
        </Card>

        <Card className="hover:shadow-2xl transition bg-white">
          <MessageCircle className="text-pink-600 w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold">Share Profile</h2>
          <p className="text-gray-600 text-sm mb-3">
            Copy and share your anonymous message link.
          </p>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700">
            Share Now
          </button>
        </Card>
      </div>
    </div>
  );
}
