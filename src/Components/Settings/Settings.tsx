import { Card, ToggleSwitch } from "flowbite-react";
import { Bell, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-lg">Settings</h1>

      <Card className="max-w-lg w-full bg-white shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="text-pink-600" />
            <span className="font-medium text-gray-700">Enable Notifications</span>
          </div>
          <ToggleSwitch
            checked={notifications}
            onChange={setNotifications}
            color="pink"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-pink-600" />
            <span className="font-medium text-gray-700">Hide My Profile</span>
          </div>
          <ToggleSwitch checked={privacy} onChange={setPrivacy} color="pink" />
        </div>
      </Card>
    </div>
  );
}
