import React, { useState } from "react";
import { Search, Trash2, AlertCircle } from "lucide-react";
import type { User } from "../../types";

interface UsersSectionProps {
  users: User[];
  onDeleteUser: (id: string) => Promise<void>;
}

const UsersSection: React.FC<UsersSectionProps> = ({ users, onDeleteUser }) => {
  const [searchUser, setSearchUser] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDeleteUser(id);
    setDeletingId(null);
  };

  return (
    <section className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 mb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-black text-blue-400">Users</h2>
          <p className="text-gray-400 mt-1">Manage platform users</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="bg-[#020617] border border-gray-700 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-blue-500 w-full lg:w-80 text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#020617]">
            <tr className="text-left text-gray-400 text-sm">
              <th className="p-5">Username</th>
              <th className="p-5">Email</th>
              <th className="p-5">Country</th>
              <th className="p-5">Role</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-800 hover:bg-[#1e293b] transition"
                >
                  <td className="p-5 font-semibold text-white">{user.username}</td>
                  <td className="p-5 text-gray-300">{user.email}</td>
                  <td className="p-5 text-gray-300">{user.country}</td>
                  <td className="p-5">
                    {user.isAdmin ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                        Admin
                      </span>
                    ) : (
                      <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                        User
                      </span>
                    )}
                  </td>
                  <td className="p-5 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deletingId === user._id}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <AlertCircle className="text-gray-500" size={32} />
                    <p className="text-gray-400">No users found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-sm text-gray-400">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </section>
  );
};

export default UsersSection;
