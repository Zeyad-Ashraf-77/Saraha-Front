import { Card, Button, TextInput } from "flowbite-react";
import { Lock } from "lucide-react";
import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);

  const handleReset = () => {
    if (password && password === confirm) {
      setDone(true);
      setPassword("");
      setConfirm("");
      setTimeout(() => setDone(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Card className="max-w-md w-full p-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-pink-600 mb-4 text-center">
          Reset Password
        </h1>
        <TextInput
          type="password"
          icon={Lock}
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <TextInput
          type="password"
          icon={Lock}
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mb-4"
        />
        <Button
          className="bg-pink-600 hover:bg-pink-700 w-full"
          onClick={handleReset}
        >
          Reset Password
        </Button>

        {done && (
          <p className="text-green-600 text-sm text-center mt-3">
            ✅ Password reset successfully!
          </p>
        )}
      </Card>
    </div>
  );
}
