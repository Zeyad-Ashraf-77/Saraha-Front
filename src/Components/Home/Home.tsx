import { Button, Card } from "flowbite-react";
import { MessageSquare, ShieldCheck, Share2, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { getToken } from "../utils/auth";
export default function Home() {



  useEffect(() => {
    const token = getToken();
    console.log(token);
    

  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-center">
      {/* ===== Hero Section ===== */}
      <section className="w-full bg-pink-600 text-white py-20 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-md">
            Welcome to <span className="text-white">SarahaApp</span>
          </h1>
          <p className="text-lg text-pink-100 mb-8">
            Get honest feedback from your friends — completely anonymous and secure.
          </p>
          <div className="flex justify-center gap-4">
            <Button color="light" className="bg-white text-pink-600 font-semibold hover:bg-pink-100">
              Get Started
            </Button>
            <Button className="bg-pink-700 hover:bg-pink-800">
              Learn More <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="max-w-6xl w-full grid md:grid-cols-3 gap-6 py-16 px-6">
        <Card className="shadow-xl hover:shadow-2xl transition">
          <MessageSquare className="w-10 h-10 text-pink-600 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Send Anonymous Messages</h3>
          <p className="text-gray-600 text-sm">
            Receive honest thoughts and opinions from your friends without revealing their identity.
          </p>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition">
          <ShieldCheck className="w-10 h-10 text-pink-600 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
          <p className="text-gray-600 text-sm">
            We ensure your privacy with secure authentication and encrypted messages.
          </p>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition">
          <Share2 className="w-10 h-10 text-pink-600 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Share Your Link</h3>
          <p className="text-gray-600 text-sm">
            Easily share your profile link with friends and start receiving messages today!
          </p>
        </Card>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="bg-pink-600 text-white w-full py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-3">Start Your Honest Journey Now!</h2>
          <p className="text-pink-100 mb-6">
            Join thousands of users who are already sharing and receiving anonymous messages.
          </p>
          <Button className="bg-white text-pink-600 font-semibold hover:bg-pink-100">
            Join Now
          </Button>
        </div>
      </section>

 
    </div>
  );
}
