import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "@/components/Navbar";
import NoticeCard, { Notice } from "@/components/NoticeCard";
import ConfirmModal from "@/components/ConfirmModal";

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  async function fetchNotices() {
    try {
      setLoading(true);

      const res = await axios.get("/api/notices");

      setNotices(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  function handleDeleteClick(id: number) {
    setSelectedId(id);
    setShowModal(true);
  }

  async function confirmDelete() {
    if (!selectedId) return;

    try {
      await axios.delete(`/api/notices/${selectedId}`);

      setShowModal(false);
      setSelectedId(null);

      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("Failed to delete notice.");
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-5 py-8">

        <h1 className="text-3xl font-bold mb-8">
          All Notices
        </h1>

        {loading ? (
          <div className="text-center text-gray-600 py-16">
            Loading...
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold mb-2">
              No Notices Found
            </h2>

            <p className="text-gray-500">
              Click "Add Notice" to create your first notice.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDelete={handleDeleteClick}
              />
            ))}

          </div>
        )}

      </main>

      <ConfirmModal
        open={showModal}
        title="Delete Notice"
        message="Are you sure you want to delete this notice?"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowModal(false);
          setSelectedId(null);
        }}
      />
    </>
  );
}