import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 shadow">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link
          href="/notices"
          className="text-white text-2xl font-bold"
        >
          Notice Board
        </Link>

        <Link
          href="/notices/new"
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
        >
          + Add Notice
        </Link>
      </div>
    </nav>
  );
}