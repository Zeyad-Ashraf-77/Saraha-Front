import { Card } from "flowbite-react";
import { Copy, Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareProfile() {
  const [copied, setCopied] = useState(false);
  const shareLink = "https://saraha-app.vercel.app/user/zeyad123";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-lg">
        Share Your Profile
      </h1>

      <Card className="max-w-lg w-full bg-white shadow-xl p-6">
        <p className="text-gray-600 mb-4">
          Share your anonymous message link with friends and receive honest feedback!
        </p>

        <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
          <input
            type="text"
            readOnly
            value={shareLink}
            className="flex-grow px-3 py-2 bg-transparent text-gray-700 outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-pink-600 text-white px-4 py-2 hover:bg-pink-700"
          >
            {copied ? "Copied!" : <Copy size={18} />}
          </button>
        </div>

        <button className="flex items-center gap-2 bg-pink-600 text-white px-5 py-2 rounded-lg shadow hover:bg-pink-700 mt-5">
          <Share2 size={18} /> Share on Socials
        </button>
      </Card>
    </div>
  );
}
