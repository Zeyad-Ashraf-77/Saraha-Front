import { Card, Button } from "flowbite-react";
import { CheckCircle } from "lucide-react";

export default function ConfirmEmail() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Card className="max-w-md w-full p-6 shadow-xl bg-white text-center">
        <CheckCircle className="text-pink-600 w-12 h-12 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-pink-600 mb-2">Confirm Your Email</h1>
        <p className="text-gray-600 mb-4">
          We’ve sent you a confirmation link. Please check your inbox and click the link to verify your account.
        </p>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full">
          Resend Email
        </Button>
      </Card>
    </div>
  );
}
