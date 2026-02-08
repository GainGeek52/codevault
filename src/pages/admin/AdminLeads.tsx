import { useState } from 'react';
import { Trash2, Eye, MessageCircle, X } from 'lucide-react';
import { useAdmin, Lead } from '../../context/AdminContext';

export default function AdminLeads() {
    const { leads, updateLeadStatus, deleteLead } = useAdmin();
    const [viewLead, setViewLead] = useState<Lead | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredLeads = statusFilter === 'all' ? leads : leads.filter((l) => l.status === statusFilter);

    const statusColors = {
        new: 'bg-green-100 text-green-700',
        contacted: 'bg-blue-100 text-blue-700',
        converted: 'bg-purple-100 text-purple-700',
        closed: 'bg-gray-100 text-gray-700',
    };

    const generateWhatsAppLink = (lead: Lead) => {
        const message = `Hi ${lead.name}! This is regarding your inquiry about: ${lead.projects}. How can we help you today?`;
        return `https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-black">Leads</h1>
                    <p className="text-gray-500 mt-1">{leads.length} total inquiries</p>
                </div>
                <div className="flex gap-2">
                    {['all', 'new', 'contacted', 'converted', 'closed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${statusFilter === status ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {filteredLeads.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">No leads found</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Projects</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-black">{lead.name}</p>
                                            <p className="text-sm text-gray-500">{lead.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-700 line-clamp-1 max-w-[200px]">{lead.projects}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                                                className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${statusColors[lead.status]}`}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="converted">Converted</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setViewLead(lead)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <a href={generateWhatsAppLink(lead)} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                                                    <MessageCircle className="w-4 h-4" />
                                                </a>
                                                <button onClick={() => deleteLead(lead.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {viewLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setViewLead(null)}>
                    <div className="bg-white rounded-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-black">Lead Details</h2>
                            <button onClick={() => setViewLead(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{viewLead.name}</p></div>
                                <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{viewLead.email}</p></div>
                                <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{viewLead.phone}</p></div>
                                <div><p className="text-sm text-gray-500">WhatsApp</p><p className="font-medium">{viewLead.whatsapp}</p></div>
                            </div>
                            <div><p className="text-sm text-gray-500">Projects</p><p className="font-medium">{viewLead.projects}</p></div>
                            {viewLead.message && <div><p className="text-sm text-gray-500">Message</p><p className="text-gray-700">{viewLead.message}</p></div>}
                            <a href={generateWhatsAppLink(viewLead)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors">
                                <MessageCircle className="w-5 h-5" /> Contact on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
