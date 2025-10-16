import { Card, Spinner } from "flowbite-react";
import { Mail, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setMessages([
        { id: 1, text: "You are doing a great job!", date: "2025-10-16" },
        { id: 2, text: "Keep improving yourself, you got this 💪", date: "2025-10-15" },
        { id: 3, text: "Love your honesty and creativity!", date: "2025-10-14" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleDelete = (id) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-lg">
        Received Messages
      </h1>

      {loading ? (
        <Spinner color="pink" size="xl" />
      ) : messages.length === 0 ? (
        <p className="text-gray-500 text-sm">No messages yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {messages.map((msg) => (
            <Card key={msg.id} className="p-5 bg-white shadow-md hover:shadow-xl transition">
              <Mail className="text-pink-600 w-8 h-8 mb-3" />
              <p className="text-gray-700 text-base mb-4">"{msg.text}"</p>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <span>{msg.date}</span>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
