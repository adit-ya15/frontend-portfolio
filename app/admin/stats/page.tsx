"use client";

import { useState, useEffect } from "react";
import { AdminListSkeleton } from "@/app/components/SkeletonLoader";

interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export default function StatsManagement() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    icon: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingStat ? `/api/stats/${editingStat.id}` : "/api/stats";
      const method = editingStat ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchStats();
        closeModal();
      }
    } catch (error) {
      console.error("Error saving stat:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this stat?")) return;
    try {
      const response = await fetch(`/api/stats/${id}`, { method: "DELETE" });
      if (response.ok) fetchStats();
    } catch (error) {
      console.error("Error deleting stat:", error);
    }
  };

  const openModal = (stat?: Stat) => {
    if (stat) {
      setEditingStat(stat);
      setFormData({
        label: stat.label,
        value: stat.value,
        icon: stat.icon,
        order: stat.order,
        isActive: stat.isActive,
      });
    } else {
      setEditingStat(null);
      setFormData({
        label: "",
        value: "",
        icon: "",
        order: stats.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStat(null);
    setFormData({
      label: "",
      value: "",
      icon: "",
      order: 0,
      isActive: true,
    });
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Stats Management</h1>
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <AdminListSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Stats Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          Add Stat
        </button>
      </div>

      <div className="grid gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="text-4xl">{stat.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-3xl font-bold text-purple-400 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Order: {stat.order}</span>
                    <span
                      className={
                        stat.isActive ? "text-green-400" : "text-red-400"
                      }
                    >
                      {stat.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(stat)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stat.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingStat ? "Edit Stat" : "Add Stat"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                  placeholder="e.g., Total Projects"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Value</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                  placeholder="e.g., 15+"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Icon (emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                  placeholder="e.g., 📊"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="mr-2"
                />
                <label className="text-white">Active</label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                  {editingStat ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
