"use client";

import { useState, useEffect } from "react";
import { AdminListSkeleton } from "@/app/components/SkeletonLoader";

interface NavLink {
  id: string;
  linkId: string;
  title: string;
  order: number;
  isActive: boolean;
}

export default function NavLinksManagement() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNavLink, setEditingNavLink] = useState<NavLink | null>(null);
  const [formData, setFormData] = useState({
    linkId: "",
    title: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchNavLinks();
  }, []);

  const fetchNavLinks = async () => {
    try {
      const response = await fetch("/api/navlinks?admin=true");
      const data = await response.json();
      setNavLinks(data);
    } catch (error) {
      console.error("Error fetching navlinks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingNavLink
        ? `/api/navlinks/${editingNavLink.id}`
        : "/api/navlinks";
      const method = editingNavLink ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchNavLinks();
        closeModal();
      }
    } catch (error) {
      console.error("Error saving navlink:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this navigation link?")) return;
    try {
      const response = await fetch(`/api/navlinks/${id}`, { method: "DELETE" });
      if (response.ok) fetchNavLinks();
    } catch (error) {
      console.error("Error deleting navlink:", error);
    }
  };

  const openModal = (navLink?: NavLink) => {
    if (navLink) {
      setEditingNavLink(navLink);
      setFormData({
        linkId: navLink.linkId,
        title: navLink.title,
        order: navLink.order,
        isActive: navLink.isActive,
      });
    } else {
      setEditingNavLink(null);
      setFormData({
        linkId: "",
        title: "",
        order: navLinks.length,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNavLink(null);
    setFormData({
      linkId: "",
      title: "",
      order: 0,
      isActive: true,
    });
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Navigation Links</h1>
        </div>
        <div className="space-y-4">
          {[...Array(7)].map((_, i) => (
            <AdminListSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Navigation Links</h1>
        <button
          onClick={() => openModal()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          Add Link
        </button>
      </div>

      <div className="grid gap-4">
        {navLinks.map((link) => (
          <div
            key={link.id}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  {link.title}
                </h3>
                <p className="text-gray-400 mb-2">ID: {link.linkId}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Order: {link.order}</span>
                  <span
                    className={
                      link.isActive ? "text-green-400" : "text-red-400"
                    }
                  >
                    {link.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(link)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
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
              {editingNavLink ? "Edit Navigation Link" : "Add Navigation Link"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Link ID</label>
                <input
                  type="text"
                  value={formData.linkId}
                  onChange={(e) =>
                    setFormData({ ...formData, linkId: e.target.value })
                  }
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                  placeholder="e.g., about, work, projects"
                  disabled={!!editingNavLink}
                />
                {editingNavLink && (
                  <p className="text-gray-400 text-sm mt-1">
                    Link ID cannot be changed after creation
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required
                  placeholder="e.g., About, Work, Projects"
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
                  {editingNavLink ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
