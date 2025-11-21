"use client";

import { useState, useEffect } from "react";
import { AdminCardSkeleton } from "@/app/components/SkeletonLoader";

interface Diagram {
  id: string;
  title: string;
  description: string;
  image: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
}

export default function AdminDiagrams() {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDiagram, setEditingDiagram] = useState<Diagram | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    order: 0,
  });

  useEffect(() => {
    fetchDiagrams();
  }, []);

  const fetchDiagrams = async () => {
    try {
      const res = await fetch("/api/admin/diagrams");
      const data = await res.json();
      setDiagrams(data);
    } catch (error) {
      console.error("Failed to fetch diagrams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingDiagram) {
        const res = await fetch(`/api/diagrams`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingDiagram.id, ...formData }),
        });

        if (res.ok) {
          alert("Diagram updated successfully!");
          fetchDiagrams();
          resetForm();
        }
      } else {
        const res = await fetch("/api/diagrams", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Diagram created successfully!");
          fetchDiagrams();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Failed to save diagram:", error);
      alert("Failed to save diagram");
    }
  };

  const handleEdit = (diagram: Diagram) => {
    setEditingDiagram(diagram);
    setFormData({
      title: diagram.title,
      description: diagram.description,
      image: diagram.image,
      order: diagram.order,
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "diagrams");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this diagram?")) return;

    try {
      const res = await fetch("/api/diagrams", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Diagram deleted successfully!");
        fetchDiagrams();
      }
    } catch (error) {
      console.error("Failed to delete diagram:", error);
      alert("Failed to delete diagram");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      order: 0,
    });
    setEditingDiagram(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Architecture <span className="text-[#915EFF]">Diagrams</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminCardSkeleton />
            <AdminCardSkeleton />
            <AdminCardSkeleton />
            <AdminCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Architecture <span className="text-[#915EFF]">Diagrams</span>
            </h1>
            <p className="text-secondary text-lg">Showcase your system architecture and design</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            {showForm ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Diagram
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1d1836] rounded-2xl p-8 mb-8 border border-[#915EFF]/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#915EFF] rounded-full"></span>
              {editingDiagram ? "Edit Diagram" : "New Diagram"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    placeholder="System Architecture, Database Schema, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors resize-none"
                    rows={3}
                    placeholder="Describe the architecture diagram"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    placeholder="Enter URL or upload image below"
                    required
                  />
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-secondary mb-2 uppercase">
                      Or Upload Diagram
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="w-full px-4 py-3 bg-tertiary border-2 border-dashed border-[#915EFF]/30 rounded-xl text-white focus:outline-none focus:border-[#915EFF] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#915EFF] file:text-white hover:file:bg-[#7c3aed] file:cursor-pointer disabled:opacity-50 cursor-pointer"
                    />
                    {uploading && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#915EFF]"></div>
                        <p className="text-sm text-[#915EFF] font-semibold">Uploading...</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {editingDiagram ? "✓ Update" : "+ Create"} Diagram
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 bg-tertiary hover:bg-tertiary/80 text-white font-bold rounded-xl border-2 border-white/10 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {diagrams.map((diagram) => (
            <div
              key={diagram.id}
              className="bg-[#1d1836] rounded-2xl p-6 border border-[#915EFF]/20 hover:border-[#915EFF]/40 transition-all duration-300 shadow-lg hover:shadow-2xl group"
            >
              {(diagram.imageUrl || diagram.image) && (
                <div className="w-full h-64 rounded-xl overflow-hidden bg-tertiary mb-4">
                  <img
                    src={diagram.imageUrl || diagram.image}
                    alt={diagram.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#915EFF] transition-colors">
                {diagram.title}
              </h3>
              <p className="text-secondary text-sm mb-4">{diagram.description}</p>
              <p className="text-sm text-secondary mb-4">Order: {diagram.order}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(diagram)}
                  className="flex-1 bg-[#915EFF] hover:bg-[#7c3aed] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(diagram.id)}
                  className="flex-1 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border-2 border-red-600/30 hover:border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
