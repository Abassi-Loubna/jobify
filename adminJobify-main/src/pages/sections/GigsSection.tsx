import React, { useState } from "react";
import { Search, Trash2, AlertCircle } from "lucide-react";
import type { Gig } from "../../types";

interface GigsSectionProps {
  gigs: Gig[];
  onDeleteGig: (id: string) => Promise<void>;
}

const GigsSection: React.FC<GigsSectionProps> = ({ gigs, onDeleteGig }) => {
  const [searchGig, setSearchGig] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredGigs = gigs.filter((gig) =>
    gig.title.toLowerCase().includes(searchGig.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDeleteGig(id);
    setDeletingId(null);
  };

  return (
    <section className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-black text-green-400">Gigs</h2>
          <p className="text-gray-400 mt-1">Manage platform gigs</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search gigs..."
            value={searchGig}
            onChange={(e) => setSearchGig(e.target.value)}
            className="bg-[#020617] border border-gray-700 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-green-500 w-full lg:w-80 text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#020617]">
            <tr className="text-left text-gray-400 text-sm">
              <th className="p-5">Title</th>
              <th className="p-5">Seller</th>
              <th className="p-5">Category</th>
              <th className="p-5">Price</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredGigs.length > 0 ? (
              filteredGigs.map((gig) => (
                <tr
                  key={gig._id}
                  className="border-b border-gray-800 hover:bg-[#1e293b] transition"
                >
                  <td className="p-5 font-semibold text-white truncate max-w-xs">{gig.title}</td>
                  <td className="p-5 text-gray-300">{gig.user?.username || "Unknown"}</td>
                  <td className="p-5 text-gray-300">{gig.category}</td>
                  <td className="p-5 text-green-400 font-bold"><span className="text-green-300 px-2">DZ</span>{gig.package_price}</td>
                  <td className="p-5 text-center">
                    <button
                      onClick={() => handleDelete(gig._id)}
                      disabled={deletingId === gig._id}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete gig"
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
                    <p className="text-gray-400">No gigs found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-sm text-gray-400">
        Showing {filteredGigs.length} of {gigs.length} gigs
      </div>
    </section>
  );
};

export default GigsSection;
