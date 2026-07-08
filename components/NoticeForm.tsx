import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export interface NoticeFormData {
  title: string;
  body: string;
  category: "Exam" | "Event" | "General";
  priority: "Normal" | "Urgent";
  publishDate: string;
  image?: string;
}

interface NoticeFormProps {
  initialData?: NoticeFormData;
  noticeId?: number;
  isEdit?: boolean;
}

const defaultValues: NoticeFormData = {
  title: "",
  body: "",
  category: "General",
  priority: "Normal",
  publishDate: "",
  image: "",
};

export default function NoticeForm({
  initialData,
  noticeId,
  isEdit = false,
}: NoticeFormProps) {
  const router = useRouter();

  const [formData, setFormData] =
    useState<NoticeFormData>(defaultValues);

  const [errors, setErrors] = useState({
    title: "",
    body: "",
    publishDate: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {
      title: "",
      body: "",
      publishDate: "",
    };

    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!formData.body.trim()) {
      newErrors.body = "Body is required";
      isValid = false;
    }

    if (!formData.publishDate) {
      newErrors.publishDate = "Publish date is required";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  }

async function handleSubmit(e: FormEvent) {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    if (isEdit && noticeId) {
      await axios.put(`/api/notices/${noticeId}`, formData);
    } else {
      await axios.post("/api/notices", formData);
    }

    router.push("/notices");
  } catch (error: any) {
    alert(
      error?.response?.data?.message ||
        "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8">

      <h1 className="text-3xl font-bold mb-8">
        {isEdit ? "Edit Notice" : "Add Notice"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* TITLE */}

        <div>

          <label className="block font-semibold mb-2">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          {errors.title && (
            <p className="text-red-600 text-sm mt-1">
              {errors.title}
            </p>
          )}

        </div>

        {/* BODY */}

        <div>

          <label className="block font-semibold mb-2">
            Body
          </label>

          <textarea
            rows={6}
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          {errors.body && (
            <p className="text-red-600 text-sm mt-1">
              {errors.body}
            </p>
          )}

        </div>

        {/* CATEGORY */}

        <div>

          <label className="block font-semibold mb-2">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option value="Exam">
              Exam
            </option>

            <option value="Event">
              Event
            </option>

            <option value="General">
              General
            </option>

          </select>

        </div>

        {/* PRIORITY */}

        <div>

          <label className="block font-semibold mb-2">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option value="Normal">
              Normal
            </option>

            <option value="Urgent">
              Urgent
            </option>

          </select>

        </div>

        {/* DATE */}

        <div>

          <label className="block font-semibold mb-2">
            Publish Date
          </label>

          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          {errors.publishDate && (
            <p className="text-red-600 text-sm mt-1">
              {errors.publishDate}
            </p>
          )}

        </div>

        {/* IMAGE */}

        <div>

          <label className="block font-semibold mb-2">
            Image URL (Optional)
          </label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded p-3"
          />

        </div>

        {/* PREVIEW */}

        {formData.image && (
          <div>

            <p className="font-semibold mb-2">
              Preview
            </p>

            <img
              src={formData.image}
              alt="Preview"
              className="rounded shadow w-full max-h-80 object-cover"
            />

          </div>
        )}

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Notice"
            : "Create Notice"}
        </button>

      </form>
    </div>
  );
}