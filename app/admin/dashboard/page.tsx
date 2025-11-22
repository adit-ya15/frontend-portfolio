"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    technologies: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, experiencesRes, technologiesRes, testimonialsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/experiences'),
          fetch('/api/technologies?format=flat'),
          fetch('/api/testimonials'),
        ]);

        const [projects, experiences, technologies, testimonials] = await Promise.all([
          projectsRes.json(),
          experiencesRes.json(),
          technologiesRes.json(),
          testimonialsRes.json(),
        ]);

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          experiences: Array.isArray(experiences) ? experiences.length : 0,
          technologies: Array.isArray(technologies) ? technologies.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      href: "/admin/projects",
      icon: "📁",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Experiences",
      description: "Manage work and education history",
      href: "/admin/experiences",
      icon: "💼",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Technologies",
      description: "Manage tech stack and skills",
      href: "/admin/technologies",
      icon: "⚙️",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Testimonials",
      description: "Manage testimonials and social links",
      href: "/admin/testimonials",
      icon: "💬",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Services",
      description: "Manage service offerings",
      href: "/admin/services",
      icon: "🎯",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Videos",
      description: "Manage video demos and tutorials",
      href: "/admin/videos",
      icon: "🎥",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Diagrams",
      description: "Manage architecture diagrams",
      href: "/admin/diagrams",
      icon: "📊",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Navigation",
      description: "Manage navigation menu links",
      href: "/admin/navlinks",
      icon: "🧭",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Resume",
      description: "Manage resume files",
      href: "/admin/resume",
      icon: "📄",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Manage your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="block group"
          >
            <div className={`bg-gradient-to-br ${card.color} p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105`}>
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-white/80 text-sm">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{stats.projects}</div>
            <div className="text-gray-400 text-sm mt-1">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{stats.experiences}</div>
            <div className="text-gray-400 text-sm mt-1">Experiences</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{stats.technologies}</div>
            <div className="text-gray-400 text-sm mt-1">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{stats.testimonials}</div>
            <div className="text-gray-400 text-sm mt-1">Testimonials</div>
          </div>
        </div>
      </div>
    </div>
  );
}
