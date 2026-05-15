// AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import UsersSection from "./sections/UsersSection";
import GigsSection from "./sections/GigsSection";
import AdvancedAnalyticsSection from "./sections/AdvancedAnalyticsSection";

const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  _id: string;
  username: string;
  email: string;
  country: string;
  isAdmin: boolean;
}

export interface Gig {
  _id: string;
  title: string;
  package_price: number;
  category: string;
  user: {
    username: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resUsers, resGigs] = await Promise.all([
        axios.get(`${API_URL}/admin/users`),
        axios.get(`${API_URL}/admin/gigs`),
      ]);

      setUsers(resUsers.data);
      setGigs(resGigs.data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch data";
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE USER =================
  const handleDeleteUser = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/admin/user/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      alert("Failed to delete user");
      console.error(err);
    }
  };

  // ================= DELETE GIG =================
  const handleDeleteGig = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this gig?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/admin/gig/${id}`);
      setGigs((prev) => prev.filter((gig) => gig._id !== id));
    } catch (err) {
      alert("Failed to delete gig");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#020617]">
      {/* Sidebar */}
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-black  from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-3 text-lg">Monitor platform activity and analytics</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400">
              {error}
            </div>
          )}

          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <>
              {/* <StatsSection users={users} gigs={gigs} /> */}
              {/* <AnalyticsSection gigs={gigs} users={users} /> */}
              <AdvancedAnalyticsSection users={users} gigs={gigs} />
            </>
          )}

          {/* Users Section */}
          {activeSection === "users" && (
            <UsersSection users={users} onDeleteUser={handleDeleteUser} />
          )}

          {/* Gigs Section */}
          {activeSection === "gigs" && (
            <GigsSection gigs={gigs} onDeleteGig={handleDeleteGig} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;