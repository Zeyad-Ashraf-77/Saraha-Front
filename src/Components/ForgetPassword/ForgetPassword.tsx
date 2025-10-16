import { Card, Button, TextInput } from "flowbite-react";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Card className="max-w-md w-full p-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-pink-600 mb-4 text-center">Forgot Password</h1>
        <p className="text-gray-600 mb-4 text-center">
          Enter your email and we’ll send you a password reset link.
        </p>
        <TextInput
          type="email"
          icon={Mail}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Button
          className="bg-pink-600 hover:bg-pink-700 w-full"
          onClick={handleSubmit}
        >
          Send Reset Link
        </Button>
        {sent && (
          <p className="text-green-600 text-sm text-center mt-3">
            ✅ Reset link sent to {email}
          </p>
        )}
      </Card>
    </div>
  );
}
