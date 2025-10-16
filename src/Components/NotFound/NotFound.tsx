import { Button } from "flowbite-react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="text-pink-600 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold text-pink-600 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Button
        className="bg-pink-600 hover:bg-pink-700"
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
}
