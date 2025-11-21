"use client";

import { useState, useEffect } from "react";
import { AdminCardSkeleton } from "@/app/components/SkeletonLoader";
import { useRouter } from "next/navigation";

interface Project {
  id?: string;
  name: string;
  description: string;
  tags: Array<{ name: string; color: string }> | string;
  image: string;
  imageUrl?: string; // For displaying signed URL
  sourceCodeLink?: string | null;
  source_code_link?: string | null;
  deployLink?: string;
  deploy_link?: string;
  platform: string;
  order?: number;
  isActive?: boolean;
}

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
    image: "",
    sourceCodeLink: "",
    deployLink: "",
    platform: "Web",
    order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", res.status, errorData);
        setProjects([]);
        return;
      }
      
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("Invalid response format:", data);
        setProjects([]);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tagsArray = formData.tags.split(",").map(tag => ({
        name: tag.trim(),
        color: "blue-text-gradient"
      }));

      const payload = {
        ...formData,
        tags: tagsArray,
        source_code_link: formData.sourceCodeLink || null,
        deploy_link: formData.deployLink,
      };

      if (editingProject) {
        await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, id: editingProject.id, isActive: true }),
        });
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setShowForm(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    const tagsArray = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
    const tags = tagsArray.map((t: any) => t.name).join(", ");
    setFormData({
      name: project.name,
      description: project.description,
      tags,
      image: project.image,
      sourceCodeLink: project.sourceCodeLink || "",
      deployLink: project.deployLink || "",
      platform: project.platform,
      order: project.order || 0,
    });
    setEditingProject(project);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      tags: "",
      image: "",
      sourceCodeLink: "",
      deployLink: "",
      platform: "Web",
      order: 0,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "projects");

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

  if (loading) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Manage <span className="text-[#915EFF]">Projects</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdminCardSkeleton />
            <AdminCardSkeleton />
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
              Manage <span className="text-[#915EFF]">Projects</span>
            </h1>
            <p className="text-secondary text-lg">Create, edit, and organize your portfolio projects</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              resetForm();
              setEditingProject(null);
            }}
            className="bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Project
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1d1836] rounded-2xl p-8 mb-8 border border-[#915EFF]/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#915EFF] rounded-full"></span>
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors resize-none"
                  rows={4}
                  placeholder="Describe your project"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="nextjs, react, typescript"
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                  required
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Image URL
                  </label>
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
                      Or Upload Image
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
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white focus:outline-none focus:border-[#915EFF] transition-colors cursor-pointer"
                  >
                  <option>Web</option>
                  <option>Vercel</option>
                  <option>Netlify</option>
                  <option>Figma</option>
                  <option>Wordpress</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Source Code Link
                </label>
                <input
                  type="text"
                  value={formData.sourceCodeLink}
                  onChange={(e) => setFormData({ ...formData, sourceCodeLink: e.target.value })}
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                  placeholder="GitHub repository URL"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Deploy Link
                </label>
                <input
                  type="text"
                  value={formData.deployLink}
                  onChange={(e) => setFormData({ ...formData, deployLink: e.target.value })}
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                  placeholder="Live project URL"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {editingProject ? "✓ Update" : "+ Create"} Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                  resetForm();
                }}
                className="px-8 py-4 bg-tertiary hover:bg-tertiary/80 text-white font-bold rounded-xl border-2 border-white/10 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1d1836] rounded-2xl p-6 border border-[#915EFF]/20 hover:border-[#915EFF]/40 transition-all duration-300 shadow-lg hover:shadow-2xl group"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    {(project.imageUrl || project.image) && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-tertiary flex-shrink-0">
                        <img 
                          src={project.imageUrl || project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#915EFF] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-secondary text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(() => {
                      const tagsArray = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
                      return tagsArray.map((tag: any, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 bg-tertiary text-[#915EFF] rounded-full text-xs font-semibold border border-[#915EFF]/30"
                        >
                          #{tag.name}
                        </span>
                      ));
                    })()}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#915EFF] rounded-full"></span>
                      {project.platform}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Order: {project.order}
                    </span>
                  </div>
                </div>
                <div className="flex lg:flex-col gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 lg:flex-none bg-[#915EFF] hover:bg-[#7c3aed] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => project.id && handleDelete(project.id)}
                    className="flex-1 lg:flex-none bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 border-2 border-red-600/30 hover:border-red-600 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
