"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAdaptation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    authorName: "",
    authorNationality: "",
    bookTitle: "",
    bookYear: "",
    bookGenre: "",
    adaptationTitle: "",
    adaptationType: "Film",
    releaseYear: "",
    platform: "",
    status: "Released",
    imdbRating: "",
    rtScore: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/adaptations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        alert("Failed to create adaptation");
      }
    } catch (error) {
      alert("Error creating adaptation");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Add New Adaptation</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Author</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="authorName"
              placeholder="Author Name"
              value={formData.authorName}
              onChange={handleChange}
              required
              className="bg-gray-700 p-3 rounded"
            />
            <input
              name="authorNationality"
              placeholder="Nationality"
              value={formData.authorNationality}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded"
            />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Book</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="bookTitle"
              placeholder="Book Title"
              value={formData.bookTitle}
              onChange={handleChange}
              required
              className="bg-gray-700 p-3 rounded"
            />
            <input
              name="bookYear"
              type="number"
              placeholder="Publication Year"
              value={formData.bookYear}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded"
            />
            <input
              name="bookGenre"
              placeholder="Genre"
              value={formData.bookGenre}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded col-span-2"
            />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Adaptation</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="adaptationTitle"
              placeholder="Adaptation Title"
              value={formData.adaptationTitle}
              onChange={handleChange}
              required
              className="bg-gray-700 p-3 rounded"
            />
            <select
              name="adaptationType"
              value={formData.adaptationType}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded"
            >
              <option value="Film">Film</option>
              <option value="TV Series">TV Series</option>
              <option value="Limited Series">Limited Series</option>
            </select>
            <input
              name="releaseYear"
              type="number"
              placeholder="Release Year"
              value={formData.releaseYear}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded"
            />
            <input
              name="platform"
              placeholder="Platform (Netflix, HBO, etc.)"
              value={formData.platform}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded"
            >
              <option value="Announced">Announced</option>
              <option value="In Production">In Production</option>
              <option value="Released">Released</option>
            </select>
            <input
              name="imdbRating"
              type="number"
              step="0.1"
              placeholder="IMDb Rating"
              value={formData.imdbRating}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded"
            />
            <input
              name="rtScore"
              type="number"
              placeholder="Rotten Tomatoes %"
              value={formData.rtScore}
              onChange={handleChange}
              className="bg-gray-700 p-3 rounded"
            />
          </div>
        </section>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Adaptation"}
          </button>
          <a href="/" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded">
            Cancel
          </a>
        </div>
      </form>
    </main>
  );
}