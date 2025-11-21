"use client";

import { useState, useEffect } from "react";
import { AdminListSkeleton } from "@/app/components/SkeletonLoader";

interface Service {
  id: string;
  title: string;
  icon: string;
  iconUrl?: string;
  order: number;
  isActive: boolean;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    order: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingService) {
        const res = await fetch(`/api/services`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingService.id, ...formData }),
        });

        if (res.ok) {
          alert("Service updated successfully!");
          fetchServices();
          resetForm();
        }
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Service created successfully!");
          fetchServices();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Failed to save service:", error);
      alert("Failed to save service");
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      icon: service.icon, // Use original S3 path for editing
      order: service.order,
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
      formData.append("folder", "services");

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
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch("/api/services", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Service deleted successfully!");
        fetchServices();
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
      alert("Failed to delete service");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      icon: "",
      order: 0,
    });
    setEditingService(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Manage <span className="text-[#915EFF]">Services</span>
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
              Manage <span className="text-[#915EFF]">Services</span>
            </h1>
            <p className="text-secondary text-lg">Showcase what you offer</p>
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
                Add Service
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1d1836] rounded-2xl p-8 mb-8 border border-[#915EFF]/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#915EFF] rounded-full"></span>
              {editingService ? "Edit Service" : "New Service"}
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
                    placeholder="Web Development, Design, etc."
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
                  {editingService ? "✓ Update" : "+ Create"} Service
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#1d1836] rounded-2xl p-6 border border-[#915EFF]/20 hover:border-[#915EFF]/40 transition-all duration-300 shadow-lg hover:shadow-2xl group"
            >
              <div className="flex flex-col items-center text-center">
                {(service.iconUrl || service.icon) && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-tertiary flex items-center justify-center mb-4">
                    <img
                      src={service.iconUrl || service.icon}
                      alt={service.title}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#915EFF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-secondary mb-4">Order: {service.order}</p>

                <div className="flex gap-3 w-full mt-4">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 bg-[#915EFF] hover:bg-[#7c3aed] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border-2 border-red-600/30 hover:border-red-600"
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
