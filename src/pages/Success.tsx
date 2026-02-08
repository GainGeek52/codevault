import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutData {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    message: string;
    projects: string;
}

export default function Success() {
    const { clearCart } = useCart();
    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const data = localStorage.getItem('checkoutData');
        if (data) {
            setCheckoutData(JSON.parse(data));
            clearCart();
        }
    }, [clearCart]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const generateWhatsAppLink = () => {
        if (!checkoutData) return 'https://wa.me/919999999999';
        const message = `Hi! I'm ${checkoutData.name}.

I'm interested in the following projects:
${checkoutData.projects}

${checkoutData.message ? `Additional notes: ${checkoutData.message}` : ''}

Please let me know the pricing and next steps.

Contact: ${checkoutData.phone}
Email: ${checkoutData.email}`;
        return `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="max-w-lg mx-auto px-4 text-center">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-black mb-4">Request Submitted!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your interest! Click below to connect with us on WhatsApp and we'll assist you further.
                </p>

                {checkoutData && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left border">
                        <h3 className="font-medium text-black mb-2">Your Request</h3>
                        <p className="text-sm text-gray-600 mb-1"><strong>Name:</strong> {checkoutData.name}</p>
                        <p className="text-sm text-gray-600 mb-1"><strong>Projects:</strong> {checkoutData.projects}</p>
                    </div>
                )}

                <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-black text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mb-4"
                >
                    <MessageCircle className="w-5 h-5" />
                    Connect on WhatsApp
                    {countdown > 0 && <span className="text-gray-400">({countdown})</span>}
                </a>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                >
                    <Home className="w-4 h-4" /> Back to Home
                </Link>

                <p className="text-xs text-gray-500 mt-8">
                    Our team typically responds within 1-2 hours during business hours.
                </p>
            </div>
        </div>
    );
}
