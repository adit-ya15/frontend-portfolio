"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminListSkeleton } from "@/app/components/SkeletonLoader";

interface Technology {
  id: string;
  name: string;
  icon: string;
  iconUrl?: string;
  category: string;
  order: number;
  isActive: boolean;
}

export default function AdminTechnologies() {
  const router = useRouter();
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    category: "Frontend",
    order: 0,
  });

  const categories = [
    "Frontend",
    "Core Frontend Concepts",
    "Languages",
    "Backend & Messaging",
    "Databases & Cache",
    "Cloud & DevOps",
    "Tools & Platforms",

  ];

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const res = await fetch("/api/admin/technologies");
      const data = await res.json();
      setTechnologies(data);
    } catch (error) {
      console.error("Failed to fetch technologies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTechnology) {
        const res = await fetch(`/api/technologies`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingTechnology.id, ...formData }),
        });

        if (res.ok) {
          alert("Technology updated successfully!");
          fetchTechnologies();
          resetForm();
        }
      } else {
        const res = await fetch("/api/technologies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Technology created successfully!");
          fetchTechnologies();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Failed to save technology:", error);
      alert("Failed to save technology");
    }
  };

  const handleEdit = (technology: Technology) => {
    setEditingTechnology(technology);
    setFormData({
      name: technology.name,
      icon: technology.icon,
      category: technology.category,
      order: technology.order,
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
      formData.append("folder", "technologies");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, icon: data.url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this technology?")) return;

    try {
      const res = await fetch(`/api/technologies?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Technology deleted successfully!");
        fetchTechnologies();
      }
    } catch (error) {
      console.error("Failed to delete technology:", error);
      alert("Failed to delete technology");
    }
  };

  const toggleActive = async (technology: Technology) => {
    try {
      const res = await fetch("/api/technologies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: technology.id,
          name: technology.name,
          icon: technology.icon,
          category: technology.category,
          order: technology.order,
          isActive: !technology.isActive,
        }),
      });

      if (res.ok) {
        fetchTechnologies();
      }
    } catch (error) {
      console.error("Failed to toggle technology:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      icon: "",
      category: "Frontend",
      order: 0,
    });
    setEditingTechnology(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Manage <span className="text-[#915EFF]">Technologies</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdminListSkeleton />
            <AdminListSkeleton />
            <AdminListSkeleton />
            <AdminListSkeleton />
            <AdminListSkeleton />
            <AdminListSkeleton />
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
              Manage <span className="text-[#915EFF]">Technologies</span>
            </h1>
            <p className="text-secondary text-lg">Add and organize your tech stack</p>
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
                Add Technology
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1d1836] rounded-2xl p-8 mb-8 border border-[#915EFF]/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#915EFF] rounded-full"></span>
              {editingTechnology ? "Edit Technology" : "New Technology"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Icon URL</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full p-2 bg-gray-700 rounded"
                    placeholder="Enter URL or upload image below"
                    required
                  />
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Or Upload Icon
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 disabled:opacity-50"
                    />
                    {uploading && <p className="text-sm text-purple-400 mt-1">Uploading...</p>}
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  {editingTechnology ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {categories.map(category => {
            const categoryTechs = technologies.filter(t => t.category === category);
            if (categoryTechs.length === 0) return null;

            return (
              <div key={category} className="mb-6">
                <h2 className="text-2xl font-bold mb-3">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTechs.map((technology) => (
                    <div
                      key={technology.id}
                      className={`bg-gray-800 p-4 rounded-lg ${!technology.isActive ? "opacity-50" : ""
                        }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <img
                            src={technology.iconUrl || technology.icon}
                            alt={technology.name}
                            className="w-10 h-10 object-contain"
                          />
                          <div>
                            <h3 className="font-bold">{technology.name}</h3>
                            <p className="text-sm text-gray-400">Order: {technology.order}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleActive(technology)}
                            className={`px-2 py-1 text-xs rounded ${technology.isActive
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gray-600 hover:bg-gray-700"
                              }`}
                          >
                            {technology.isActive ? "Active" : "Inactive"}
                          </button>
                          <button
                            onClick={() => handleEdit(technology)}
                            className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 text-xs rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(technology.id)}
                            className="bg-red-600 hover:bg-red-700 px-2 py-1 text-xs rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
