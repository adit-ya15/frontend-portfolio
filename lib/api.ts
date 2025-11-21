// API URL helper
const API_BASE = typeof window !== 'undefined' ? '' : 'http://localhost:3000';

// Fetch functions for server and client components
export async function fetchNavLinks() {
  try {
    const res = await fetch(`${API_BASE}/api/navlinks`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error('Error fetching nav links:', error);
    return [];
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE}/api/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function fetchTechnologies() {
  try {
    const res = await fetch(`${API_BASE}/api/technologies`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    // API returns array of groups directly now
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return [];
  }
}

export async function fetchExperiences() {
  try {
    const res = await fetch(`${API_BASE}/api/experiences`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_BASE}/api/testimonials`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/api/stats`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}
