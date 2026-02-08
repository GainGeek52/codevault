import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Code2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-black hidden sm:block">
                            CodeVault
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors relative ${isActive(link.path)
                                        ? 'text-black'
                                        : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Cart & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/cart"
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5 text-black" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-medium">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {isOpen ? (
                                <X className="w-5 h-5 text-black" />
                            ) : (
                                <Menu className="w-5 h-5 text-black" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${isOpen
                        ? 'max-h-64 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="px-4 py-4 bg-white border-t border-gray-100 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                                    ? 'bg-black text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
