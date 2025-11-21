"use client";

import { useState, useEffect } from "react";
import { AdminCardSkeleton } from "@/app/components/SkeletonLoader";

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoUrlSigned?: string;
  thumbnail?: string;
  thumbnailSigned?: string;
  tags: string;
  order: number;
  isActive: boolean;
}

export default function VideosManagement() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    tags: "",
    order: 0,
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/admin/videos");
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", response.status, errorData);
        setVideos([]);
        return;
      }
      
      const data = await response.json();
      if (Array.isArray(data)) {
        setVideos(data);
      } else {
        console.error("Invalid response format:", data);
        setVideos([]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingVideo
        ? `/api/admin/videos/${editingVideo.id}`
        : "/api/admin/videos";
      const method = editingVideo ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchVideos();
        setShowForm(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchVideos();
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video");
    }
  };

  const handleEdit = (video: Video) => {
    const tags = JSON.parse(video.tags || "[]");
    const tagsString = tags.map((t: any) => t.name).join(", ");

    setFormData({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail || "",
      tags: tagsString,
      order: video.order,
    });
    setEditingVideo(video);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      thumbnail: "",
      tags: "",
      order: 0,
    });
    setEditingVideo(null);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please upload a video file");
      return;
    }

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("folder", "videos");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, videoUrl: data.url }));
      }
    } catch (error) {
      console.error("Video upload failed:", error);
      alert("Failed to upload video");
    } finally {
      setUploading(false);
    }
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setUploadingThumbnail(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("folder", "thumbnails");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, thumbnail: data.url }));
      }
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
      alert("Failed to upload thumbnail");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              Manage <span className="text-[#915EFF]">Videos</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Manage <span className="text-[#915EFF]">Videos</span>
            </h1>
            <p className="text-secondary text-lg">
              Create, edit, and organize your video demos
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
            className="bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Video
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1d1836] rounded-2xl p-8 mb-8 border border-[#915EFF]/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#915EFF] rounded-full"></span>
              {editingVideo ? "Edit Video" : "Add New Video"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Video Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors resize-none"
                  rows={4}
                  placeholder="Describe your video"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Video URL
                </label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  placeholder="Enter video URL or upload below"
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                  required
                />
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-secondary mb-2 uppercase">
                    Or Upload Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={uploading}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-dashed border-[#915EFF]/30 rounded-xl text-white focus:outline-none focus:border-[#915EFF] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#915EFF] file:text-white hover:file:bg-[#7c3aed] file:cursor-pointer disabled:opacity-50 cursor-pointer"
                  />
                  {uploading && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#915EFF]"></div>
                      <p className="text-sm text-[#915EFF] font-semibold">
                        Uploading video...
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: MP4, WebM, MOV
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Thumbnail (optional)
                </label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  placeholder="Enter thumbnail URL or upload below"
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                />
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-secondary mb-2 uppercase">
                    Or Upload Thumbnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    disabled={uploadingThumbnail}
                    className="w-full px-4 py-3 bg-tertiary border-2 border-dashed border-[#915EFF]/30 rounded-xl text-white focus:outline-none focus:border-[#915EFF] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#915EFF] file:text-white hover:file:bg-[#7c3aed] file:cursor-pointer disabled:opacity-50 cursor-pointer"
                  />
                  {uploadingThumbnail && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#915EFF]"></div>
                      <p className="text-sm text-[#915EFF] font-semibold">
                        Uploading thumbnail...
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="tutorial, demo, cloud, devops"
                  className="w-full px-4 py-3 bg-tertiary border-2 border-transparent rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#915EFF] transition-colors"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {editingVideo ? "✓ Update" : "+ Create"} Video
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
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
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-[#1d1836] rounded-2xl p-6 border border-[#915EFF]/20 hover:border-[#915EFF]/40 transition-all duration-300 shadow-lg hover:shadow-2xl group"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    {video.thumbnail && (
                      <div className="w-32 h-20 rounded-xl overflow-hidden bg-tertiary flex-shrink-0">
                        <img
                          src={video.thumbnailSigned || video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#915EFF] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(() => {
                      const tagsArray =
                        typeof video.tags === "string"
                          ? JSON.parse(video.tags)
                          : video.tags;
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
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Order: {video.order}
                    </span>
                    <a
                      href={video.videoUrlSigned || video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#915EFF] hover:text-[#7c3aed]"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Watch Video
                    </a>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => handleEdit(video)}
                    className="flex-1 lg:flex-none bg-[#915EFF] hover:bg-[#7c3aed] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="flex-1 lg:flex-none bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 border-2 border-red-600/30 hover:border-red-600 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">
              No videos yet. Click "Add Video" to create your first video demo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
