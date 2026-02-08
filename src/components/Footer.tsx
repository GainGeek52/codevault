import { Link } from 'react-router-dom';
import { Code2, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-black" />
                            </div>
                            <span className="text-xl font-bold">CodeVault</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Production-ready web application projects. Built with modern
                            technologies and best practices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link
                                to="/"
                                className="block text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Home
                            </Link>
                            <Link
                                to="/projects"
                                className="block text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Browse Projects
                            </Link>
                            <Link
                                to="/cart"
                                className="block text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Cart
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <a
                                href="mailto:unitbuckspro@gmail.com"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <Mail className="w-4 h-4" />
                                unitbuckspro@gmail.com
                            </a>
                            <a
                                href="https://wa.me/918432997835"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp Support
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} CodeVault. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-xs text-center sm:text-right">
                            This is not an automated purchase. Our team will contact you on
                            WhatsApp after you submit your request.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
