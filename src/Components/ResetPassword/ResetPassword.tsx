import { Card, Button, TextInput } from "flowbite-react";
import { Lock, Mail, Key } from "lucide-react";
import { useState } from "react";
import axios from "axios";

 export type ResetPasswordState = {
  email: string;
  otp: string;
  password: string;
  confirm: string;
  done: boolean;
  error: string;
  loading: boolean;
};

export default function ResetPassword(){
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleReset = async (): Promise<void> => {
    setError("");
    if (!email || !otp || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (typeof otp !== "string" || !otp.trim()) {
      setError("OTP is required and must be a string.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    console.log({ email, otp, password, confirm });
    setLoading(true);
    try {
      const { data }: { data: { message?: string } } = await axios.post(
        "https://saraha-app-theta.vercel.app/auth/resetPassword",
        {
          email,
          otp: String(otp),
          newPassword: password,
          reNewPassword: confirm
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (data?.message === "Password reset successfully") {
        setDone(true);
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirm("");
        setTimeout(() => setDone(false), 2000);
      } else {
        setError(data?.message || "Error resetting password");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error resetting password");
      } else {
        setError("Error resetting password");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Card className="max-w-md w-full p-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-pink-600 mb-4 text-center">
          Reset Password
        </h1>
        <TextInput
          type="email"
          icon={Mail}
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <TextInput
          type="text"
          icon={Key}
          placeholder="Enter OTP code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mb-3"
        />
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
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
        {error && (
          <p className="text-red-600 text-sm text-center mt-3">{error}</p>
        )}
        {done && (
          <p className="text-green-600 text-sm text-center mt-3">
            ✅ Password reset successfully!
          </p>
        )}
      </Card>
    </div>
  );
}
