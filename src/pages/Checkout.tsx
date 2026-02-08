import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart } = useCart();
    const { addLead } = useAdmin();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const projectNames = cart.map((p) => p.title).join(', ');

        // Save lead to admin context
        addLead({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            message: formData.message,
            projects: projectNames,
        });

        // Save for success page
        localStorage.setItem('checkoutData', JSON.stringify({ ...formData, projects: projectNames }));
        navigate('/success');
    };

    if (cart.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-black mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <h1 className="text-3xl font-bold text-black mb-2">Request Project Access</h1>
                <p className="text-gray-500 mb-8">Fill in your details and we'll contact you on WhatsApp</p>

                <div className="bg-gray-50 rounded-xl p-4 mb-8 border">
                    <h3 className="font-medium text-black mb-2">Selected Projects ({cart.length})</h3>
                    <div className="flex flex-wrap gap-2">
                        {cart.map((p) => (
                            <span key={p.id} className="px-3 py-1 bg-white border text-sm rounded-full">{p.title}</span>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">Name *</label>
                        <input
                            name="name" value={formData.name} onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-200'
                                }`}
                            placeholder="Your full name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-2">Email *</label>
                        <input
                            name="email" type="email" value={formData.email} onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-200'
                                }`}
                            placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">Phone *</label>
                            <input
                                name="phone" value={formData.phone} onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-200'
                                    }`}
                                placeholder="+91 8432997835"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">WhatsApp *</label>
                            <input
                                name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.whatsapp ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-200'
                                    }`}
                                placeholder="+91 8432997835"
                            />
                            {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-2">Message (Optional)</label>
                        <textarea
                            name="message" value={formData.message} onChange={handleChange} rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                            placeholder="Any specific requirements or questions?"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-black text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        <Send className="w-5 h-5" /> Request Project Access
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        By submitting, you agree to be contacted on WhatsApp regarding your request.
                    </p>
                </form>
            </div>
        </div>
    );
}
