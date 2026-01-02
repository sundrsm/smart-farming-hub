import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProposalsFull() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/proposals");
      setProposals(res.data || []);
    } catch (err) {
      console.error("Error fetching proposals:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading proposals...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Active Proposals</h1>
        <Link to="/dashboard" className="text-sm text-green-600 hover:underline">Back to Dashboard</Link>
      </div>

      {proposals.length === 0 ? (
        <div className="text-gray-600">No active proposals found.</div>
      ) : (
        <div className="space-y-4">
          {proposals.map((p) => (
            <div key={p._id || p.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{p.title}</div>
                <div className="text-sm text-gray-600">{p.description}</div>
                <div className="text-sm text-gray-500 mt-2">By: {p.proposer?.name || "Unknown"}</div>
              </div>
              <div className="text-right">
                <div className="text-green-700 font-bold text-xl">₹{p.price}</div>
                <div className="mt-2">
                  <Link to={`/proposals/${p._id || p.id}`} className="text-sm text-blue-600 hover:underline">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
