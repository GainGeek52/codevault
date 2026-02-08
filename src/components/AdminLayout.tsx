import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, LogOut, Code2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Package },
    { name: 'Leads', path: '/admin/leads', icon: Users },
];

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout, isAuthenticated } = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/admin/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black text-white transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-6 flex items-center justify-between">
                        <Link to="/admin" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <span className="font-bold text-lg">CodeVault</span>
                                <p className="text-xs text-gray-400">Admin Panel</p>
                            </div>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Menu className="w-6 h-6 text-black" />
                    </button>
                    <span className="font-semibold text-black">Admin Panel</span>
                    <div className="w-10" />
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
