import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "@/components/Navbar";
import NoticeForm, { NoticeFormData } from "@/components/NoticeForm";

export default function EditNoticePage() {
  const router = useRouter();

  const { id } = router.query;

  const [loading, setLoading] = useState(true);

  const [notice, setNotice] =
    useState<NoticeFormData>();

  useEffect(() => {
    if (!id) return;

    fetchNotice();
  }, [id]);

  async function fetchNotice() {
    try {
      const res = await axios.get(
        `/api/notices/${id}`
      );

      const data = res.data;

      setNotice({
        title: data.title,
        body: data.body,
        category: data.category,
        priority: data.priority,
        publishDate: data.publishDate
          .substring(0, 10),
        image: data.image || "",
      });
    } catch (error) {
      console.error(error);

      alert("Unable to load notice.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="text-center py-20">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-5 py-8">

        {notice && (
          <NoticeForm
            initialData={notice}
            noticeId={Number(id)}
            isEdit
          />
        )}

      </main>
    </>
  );
}