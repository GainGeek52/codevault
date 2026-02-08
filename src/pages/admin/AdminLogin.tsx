import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Code2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/admin');
        } else {
            setError('Invalid password');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Code2 className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-black">Admin Login</h1>
                        <p className="text-gray-500 mt-2">Enter password to access admin panel</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all"
                                    placeholder="Enter admin password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            Login to Admin
                        </button>
                    </form>

                    <p className="text-xs text-gray-400 text-center mt-6">
                        Default password: admin123
                    </p>
                </div>
            </div>
        </div>
    );
}
