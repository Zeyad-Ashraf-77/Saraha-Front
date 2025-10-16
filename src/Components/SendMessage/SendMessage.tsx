import { Card, Textarea, Button } from "flowbite-react";
import { Send } from "lucide-react";
import { useState } from "react";

export default function SendMessage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-lg">
        Send an Anonymous Message
      </h1>

      <Card className="max-w-lg w-full bg-white shadow-lg p-6">
        <p className="text-gray-600 mb-3">
          Write your message below. It will be sent anonymously.
        </p>
        <Textarea
          placeholder="Type your message..."
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4 border-pink-300 focus:ring-pink-500"
        />
        <Button
          onClick={handleSend}
          className="bg-pink-600 hover:bg-pink-700 text-white w-full flex items-center justify-center gap-2"
        >
          <Send size={18} /> Send Message
        </Button>

        {sent && (
          <p className="text-green-600 mt-4 text-sm font-semibold text-center">
            ✅ Message sent successfully!
          </p>
        )}
      </Card>
    </div>
  );
}
