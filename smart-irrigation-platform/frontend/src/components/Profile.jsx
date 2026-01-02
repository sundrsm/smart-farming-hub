import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile({ token, user }) {
  const [myProposals, setMyProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role === "provider") fetchMyProposals();
  }, [user]);

  const fetchMyProposals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/proposals");
      const proposals = res.data.filter((p) => {
        const proposerId = p.proposer?._id || p.proposer?.id || p.proposer;
        return String(proposerId) === String(user.id || user._id);
      });
      setMyProposals(proposals);
    } catch (err) {
      console.error("Failed to fetch my proposals:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Please login to see your profile.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">{user.name}'s Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-medium">{user.role}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium">{user.location || "—"}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">Crop Type</p>
          <p className="font-medium">{user.cropType || "—"}</p>
        </div>
      </div>

      {user.role === "provider" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Active Proposals</h2>
            <Link to="/create-proposal" className="text-sm text-green-600 hover:underline">Create New</Link>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : myProposals.length === 0 ? (
            <div className="text-gray-600">You have no active proposals.</div>
          ) : (
            <ul className="space-y-3">
              {myProposals.map((p) => (
                <li key={p._id || p.id} className="border p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm text-gray-600">{p.description}</div>
                    </div>
                    <div className="text-green-700 font-bold">₹{p.price}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
