import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-xl w-full text-center">

        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Notice Board
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome to the Notice Board application. You can create, view,
          edit, and delete notices using the buttons below.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/notices"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View Notices
          </Link>
           <br></br>
          <Link
            href="/notices/new"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Add Notice
          </Link>

        </div>

      </div>
    </main>
  );
}