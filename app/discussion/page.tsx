"use client";

import { MessageSquare, Send } from "lucide-react";

export default function DiscussionPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-green-100 p-8">
        
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-800">
            Discussion Forum
          </h1>
          <p className="text-green-600 mt-2">
            Ask questions and explore discussions
          </p>
        </div>

        {/* View Discussion Button */}
        <div className="mb-8">
          <button className="w-full flex items-center justify-center gap-3 bg-green-100 hover:bg-green-200 transition-all text-green-800 font-semibold py-4 rounded-2xl border border-green-200">
            <MessageSquare size={22} />
            View Discussions
          </button>
        </div>

        {/* Ask Question Section */}
        <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Your Question
          </h2>

          <textarea
            placeholder="Ask anything about colleges, placements, courses..."
            className="w-full h-36 rounded-xl border border-green-200 bg-white px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700"
          />

          <button className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition-all">
            <Send size={18} />
            Ask Question
          </button>
        </div>
      </div>
    </div>
  );
}