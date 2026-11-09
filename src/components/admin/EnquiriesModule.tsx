import React, { useState } from 'react';
import { ContactEnquiry } from '../../types';
import { ConfirmModal } from './ConfirmModal';
import {
  Inbox,
  Mail,
  Building,
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  AlertCircle,
  X,
  MessageCircle
} from 'lucide-react';

interface EnquiriesModuleProps {
  enquiries: ContactEnquiry[];
  token: string;
  onRefresh: () => void;
}

export const EnquiriesModule: React.FC<EnquiriesModuleProps> = ({ enquiries, token, onRefresh }) => {
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateStatus = async (id: string, newStatus: 'new' | 'read' | 'completed') => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
        onRefresh();
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to update enquiry status.' });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/admin/enquiries/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Enquiry deleted successfully.' });
        if (selectedEnquiry && selectedEnquiry.id === deleteId) {
          setSelectedEnquiry(null);
        }
        setDeleteId(null);
        onRefresh();
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to delete enquiry.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold font-display text-white">Contact Enquiries &amp; Leads</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Review client requests, project briefs, and manage resolution statuses.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Total Enquiries: <span className="text-white font-bold">{enquiries.length}</span>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Selected Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="rounded-2xl p-6 bg-space-900 border border-electric-cyan/40 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-electric-cyan">
                Enquiry Details
              </span>
              <h4 className="text-lg font-bold text-white">{selectedEnquiry.fullName}</h4>
            </div>
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="p-1.5 rounded-lg bg-space-850 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-space-850">
              <span className="text-slate-400 block mb-1">Email Address:</span>
              <a href={`mailto:${selectedEnquiry.email}`} className="text-electric-cyan hover:underline truncate block">
                {selectedEnquiry.email}
              </a>
            </div>

            <div className="p-3 rounded-xl bg-space-850">
              <span className="text-slate-400 block mb-1">Organization:</span>
              <span className="text-white">{selectedEnquiry.organization || 'Not provided'}</span>
            </div>

            <div className="p-3 rounded-xl bg-space-850">
              <span className="text-slate-400 block mb-1">Target Website:</span>
              <span className="text-white">{selectedEnquiry.websiteType}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-space-850/70 border border-white/5 space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400 block">Client Project Description:</span>
            <p className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
              {selectedEnquiry.description}
            </p>
          </div>

          {/* Status buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Change Status:</span>
              <button
                onClick={() => handleUpdateStatus(selectedEnquiry.id, 'new')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedEnquiry.status === 'new' ? 'bg-amber-500 text-space-950 font-bold' : 'bg-space-850 text-slate-300'
                }`}
              >
                New
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedEnquiry.id, 'read')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedEnquiry.status === 'read' ? 'bg-blue-500 text-white font-bold' : 'bg-space-850 text-slate-300'
                }`}
              >
                In Review
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedEnquiry.id, 'completed')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedEnquiry.status === 'completed' ? 'bg-emerald-500 text-space-950 font-bold' : 'bg-space-850 text-slate-300'
                }`}
              >
                Completed
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re:%20Enquiry%20regarding%20${encodeURIComponent(selectedEnquiry.websiteType)}`}
                className="px-4 py-2 rounded-xl bg-electric-cyan text-space-950 font-bold text-xs uppercase font-mono flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>
              <button
                onClick={() => setDeleteId(selectedEnquiry.id)}
                className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enquiries List Table */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-space-900/60 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-space-950/80 text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Client / Sender</th>
                <th className="px-4 py-3">Website Type</th>
                <th className="px-4 py-3">Message Snippet</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 font-mono">
                    No client enquiries currently in record.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      {enq.status === 'new' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-500/30 text-[10px] font-mono">
                          New
                        </span>
                      )}
                      {enq.status === 'read' && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-500/30 text-[10px] font-mono">
                          Read
                        </span>
                      )}
                      {enq.status === 'completed' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-white">{enq.fullName}</div>
                      <div className="text-[11px] text-slate-400">{enq.email}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-electric-cyan">
                      {enq.websiteType}
                    </td>
                    <td className="px-4 py-3 text-slate-300 max-w-xs truncate">
                      {enq.description}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400 whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 rounded-lg bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(enq.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Enquiry"
        message="Are you sure you want to delete this enquiry record? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

