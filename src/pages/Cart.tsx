import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cart, removeFromCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-black mb-2">Your cart is empty</h1>
                    <p className="text-gray-500 mb-6">Browse our projects and add some to your cart</p>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Browse Projects <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black mb-8">Your Cart</h1>

                <div className="space-y-4 mb-8">
                    {cart.map((project) => (
                        <div key={project.id} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl">
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-black">{project.title}</h3>
                                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{project.shortDescription}</p>
                                <div className="flex flex-wrap gap-1">
                                    {project.techStack.slice(0, 3).map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                                <p className="text-sm font-medium text-gray-500">Contact for quote</p>
                                <button
                                    onClick={() => removeFromCart(project.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Total Projects</span>
                        <span className="font-semibold text-black">{cart.length}</span>
                    </div>
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                        <span className="text-gray-600">Price</span>
                        <span className="font-semibold text-black">Contact for quote</span>
                    </div>
                    <Link
                        to="/checkout"
                        className="w-full py-4 bg-black text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        Proceed to Checkout <ArrowRight className="w-5 h-5" />
                    </Link>
                    <p className="text-xs text-gray-500 text-center mt-4">
                        Our team will contact you on WhatsApp after submission
                    </p>
                </div>
            </div>
        </div>
    );
}
