import Navbar from "@/components/Navbar";
import NoticeForm from "@/components/NoticeForm";

export default function NewNoticePage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-5 py-8">
        <NoticeForm />
      </main>
    </>
  );
}