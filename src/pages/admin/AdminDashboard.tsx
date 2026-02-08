import { Package, Users, TrendingUp, Clock } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { useAdmin } from '../../context/AdminContext';

export default function AdminDashboard() {
    const { projects } = useProjects();
    const { leads } = useAdmin();

    const stats = [
        { name: 'Total Projects', value: projects.length, icon: Package, color: 'bg-black' },
        { name: 'Total Leads', value: leads.length, icon: Users, color: 'bg-gray-700' },
        { name: 'New Leads', value: leads.filter((l) => l.status === 'new').length, icon: TrendingUp, color: 'bg-gray-600' },
        { name: 'Converted', value: leads.filter((l) => l.status === 'converted').length, icon: Clock, color: 'bg-gray-500' },
    ];

    const recentLeads = leads.slice(0, 5);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-black">Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of your CodeVault store</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.name}</p>
                                <p className="text-3xl font-bold text-black mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-black">Recent Leads</h2>
                </div>
                {recentLeads.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No leads yet. They will appear here when users submit requests.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {recentLeads.map((lead) => (
                            <div key={lead.id} className="px-6 py-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-black">{lead.name}</p>
                                    <p className="text-sm text-gray-500">{lead.email}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${lead.status === 'new' ? 'bg-green-100 text-green-700' :
                                        lead.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                                            lead.status === 'converted' ? 'bg-purple-100 text-purple-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {lead.status}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black text-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-2">Manage Projects</h3>
                    <p className="text-gray-400 text-sm mb-4">Add, edit, or remove projects from your catalog</p>
                    <a href="/admin/projects" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                        Go to Projects
                    </a>
                </div>
                <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-black mb-2">View All Leads</h3>
                    <p className="text-gray-500 text-sm mb-4">Review and manage customer inquiries</p>
                    <a href="/admin/leads" className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">
                        Go to Leads
                    </a>
                </div>
            </div>
        </div>
    );
}
