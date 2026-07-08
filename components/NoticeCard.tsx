import Link from "next/link";

export interface Notice {
  id: number;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  image?: string | null;
}

interface Props {
  notice: Notice;
  onDelete: (id: number) => void;
}

export default function NoticeCard({
  notice,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">

      {notice.image && (
        <img
          src={notice.image}
          alt={notice.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">

        <div className="flex justify-between items-start">

          <h2 className="text-xl font-bold">
            {notice.title}
          </h2>

          {notice.priority === "Urgent" && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              Urgent
            </span>
          )}

        </div>

        <p className="text-gray-600 mt-3">
          {notice.body}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">

          <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded">
            {notice.category}
          </span>

          <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">
            {new Date(notice.publishDate).toLocaleDateString()}
          </span>

        </div>

        <div className="mt-6 flex gap-3">

          <Link
            href={`/notices/${notice.id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(notice.id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}