"use client";

import { useState, useEffect } from "react";
import { AdminListSkeleton } from "@/app/components/SkeletonLoader";

interface Resume {
  id: string;
  type: string;
  title: string;
  fileUrl: string;
  fileUrlSigned?: string;
  order: number;
  isActive: boolean;
}

export default function AdminResume() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    type: "professional",
    title: "",
    fileUrl: "",
    order: 0,
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await fetch("/api/admin/resume");
      const data = await res.json();
      setResumes(data);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingResume) {
        const res = await fetch(`/api/resume`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingResume.id, ...formData }),
        });

        if (res.ok) {
          alert("Resume updated successfully!");
          fetchResumes();
          resetForm();
        }
      } else {
        const res = await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Resume created successfully!");
          fetchResumes();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Failed to save resume:", error);
      alert("Failed to save resume");
    }
  };

  const handleEdit = (resume: Resume) => {
    setEditingResume(resume);
    setFormData({
      type: resume.type,
      title: resume.title,
      fileUrl: resume.fileUrl,
      order: resume.order,
    });
    setShowForm(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "resume");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, fileUrl: data.url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      const res = await fetch("/api/resume", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Resume deleted successfully!");
        fetchResumes();
      }
    } catch (error) {
      console.error("Failed to delete resume:", error);
      alert("Failed to delete resume");
    }
  };

  const resetForm = () => {
    setFormData({
      type: "professional",
      title: "",
      fileUrl: "",
      order: 0,
    });
    setEditingResume(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Resume <span className="text-[#915EFF]">Management</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Resume <span className="text-[#915EFF]">Management</span>
            </h1>
            <p className="text-secondary text-lg">Manage your professional and college resumes</p>
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
                Add Resume
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1d1836] rounded-2xl p-8 mb-8 border border-[#915EFF]/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#915EFF] rounded-full"></span>
              {editingResume ? "Edit Resume" : "New Resume"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white focus:outline-none focus:border-[#915EFF] transition-colors"
                    required
                  >
                    <option value="professional">Professional Resume</option>
                    <option value="college">College Resume</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    placeholder="Software Engineer Resume 2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">File URL</label>
                  <input
                    type="text"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                    placeholder="Enter URL or upload file below"
                    required
                  />
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-secondary mb-2 uppercase">
                      Or Upload Resume
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
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
                  {editingResume ? "✓ Update" : "+ Create"} Resume
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
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-[#1d1836] rounded-2xl p-6 border border-[#915EFF]/20 hover:border-[#915EFF]/40 transition-all duration-300 shadow-lg hover:shadow-2xl group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#915EFF]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#915EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    resume.type === 'professional' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {resume.type === 'professional' ? 'Professional' : 'College'}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#915EFF] transition-colors">
                {resume.title}
              </h3>
              <p className="text-sm text-secondary mb-4 truncate">{resume.fileUrl}</p>
              <p className="text-sm text-secondary mb-4">Order: {resume.order}</p>

              <div className="flex gap-2 mb-3">
                {resume.fileUrlSigned && (
                  <a
                    href={resume.fileUrlSigned}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600/20 hover:bg-green-600 text-green-500 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border-2 border-green-600/30 hover:border-green-600 text-center"
                  >
                    Preview
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(resume)}
                  className="flex-1 bg-[#915EFF] hover:bg-[#7c3aed] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(resume.id)}
                  className="flex-1 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border-2 border-red-600/30 hover:border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {resumes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-[#915EFF]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#915EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Resumes Yet</h3>
            <p className="text-secondary mb-6">Upload your first resume to get started</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Add Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
