export default function Home() {

  async function hundleSendMessage() {
    
    
  }
  return (
    <div className="flex flex-col items-center min-h-screen py-8 bg-[#f8fbff]">
      <div className="bg-[#b6f8fa] rounded-2xl p-8 mb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Send an Anonymous Message</h2>
        <textarea
          className="w-full p-4 rounded-lg border border-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-[#32d1c7]"
          rows={4}
          placeholder="Write your message here..."
        ></textarea>
        <button
          className="w-full py-3 bg-[#32d1c7] text-white rounded-lg text-lg font-semibold hover:bg-[#26bdb3] transition-colors"
        >
          Send Message
        </button>
      </div>
      <div className="w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Messages you received</h3>
        {/* مكان جلب الرسائل من الباك */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow">
          <span className="font-bold">Anonymous User</span>
          <p className="mt-2">You are awesome!</p>
        </div>
        <div className="bg-white rounded-xl p-5 mb-4 shadow">
          <span className="font-bold">Anonymous User</span>
          <p className="mt-2">Hello!</p>
        </div>
      </div>
    </div>
  );
}