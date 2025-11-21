"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminListSkeleton } from "@/app/components/SkeletonLoader";

interface Experience {
  id: string;
  title: string;
  companyName: string;
  icon: string;
  iconUrl?: string;
  iconBg: string;
  date: string;
  points: string;
  order: number;
  isActive: boolean;
}

export default function AdminExperiences() {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    icon: "",
    iconBg: "#FFFFFF",
    date: "",
    points: "",
    order: 0,
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/admin/experiences");
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      points: formData.points.split("\n").filter(p => p.trim()),
    };

    try {
      if (editingExperience) {
        const res = await fetch(`/api/experiences`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingExperience.id, ...payload }),
        });
        
        if (res.ok) {
          alert("Experience updated successfully!");
          fetchExperiences();
          resetForm();
        }
      } else {
        const res = await fetch("/api/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        
        if (res.ok) {
          alert("Experience created successfully!");
          fetchExperiences();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Failed to save experience:", error);
      alert("Failed to save experience");
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      companyName: experience.companyName,
      icon: experience.icon,
      iconBg: experience.iconBg,
      date: experience.date,
      points: Array.isArray(experience.points) 
        ? experience.points.join("\n") 
        : experience.points,
      order: experience.order,
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
      formData.append("folder", "experiences");

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
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const res = await fetch("/api/experiences", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Experience deleted successfully!");
        fetchExperiences();
      }
    } catch (error) {
      console.error("Failed to delete experience:", error);
      alert("Failed to delete experience");
    }
  };

  const toggleActive = async (experience: Experience) => {
    try {
      const res = await fetch("/api/experiences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: experience.id,
          isActive: !experience.isActive,
        }),
      });

      if (res.ok) {
        fetchExperiences();
      }
    } catch (error) {
      console.error("Failed to toggle experience:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      companyName: "",
      icon: "",
      iconBg: "#FFFFFF",
      date: "",
      points: "",
      order: 0,
    });
    setEditingExperience(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Manage <span className="text-[#915EFF]">Experiences</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Manage <span className="text-[#915EFF]">Experiences</span>
            </h1>
            <p className="text-secondary text-lg">Create and manage your work experience timeline</p>
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
                Add Experience
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1d1836] rounded-2xl p-8 mb-8 border border-[#915EFF]/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#915EFF] rounded-full"></span>
              {editingExperience ? "Edit Experience" : "New Experience"}
            </h2>
          
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    placeholder="Senior Developer"
                    required
                  />
                    </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    placeholder="Google, Microsoft, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Icon URL</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    placeholder="Enter URL or upload image below"
                    required
                  />
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-secondary mb-2 uppercase">
                      Or Upload Icon
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
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Icon Background Color</label>
                  <input
                    type="color"
                    value={formData.iconBg}
                    onChange={(e) => setFormData({ ...formData, iconBg: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl h-14 cursor-pointer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    placeholder="e.g., Jan 2020 - Present"
                    required
                  />
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

              <div className="mt-6">
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Points (one per line)</label>
                <textarea
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors resize-none"
                  rows={6}
                  placeholder="Each line will be a bullet point&#10;- Led team of developers&#10;- Implemented new features"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {editingExperience ? "✓ Update" : "+ Create"} Experience
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

        <div className="grid gap-6">{experiences.map((experience) => (
          <div
            key={experience.id}
            className={`bg-gray-800 p-6 rounded-lg ${
              !experience.isActive ? "opacity-50" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <p className="text-gray-400">{experience.companyName}</p>
                <p className="text-sm text-gray-500">{experience.date}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: experience.iconBg }}
                  />
                  <span className="text-sm text-gray-400">Order: {experience.order}</span>
                </div>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-300">
                  {(Array.isArray(experience.points) 
                    ? experience.points 
                    : experience.points.split("\n")
                  ).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(experience)}
                  className={`px-3 py-1 rounded ${
                    experience.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {experience.isActive ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => handleEdit(experience)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
