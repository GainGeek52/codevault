import { useState } from 'react';
import { Lock, X } from 'lucide-react';

interface LockedItemProps {
    title: string;
    description: string;
}

export default function LockedItem({ title, description }: LockedItemProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowModal(true)}
                className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all group"
            >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                    <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                    <h4 className="font-medium text-black">{title}</h4>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                <div className="px-3 py-1 bg-gray-200 rounded-full">
                    <span className="text-xs font-medium text-gray-600">Locked</span>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <Lock className="w-6 h-6 text-gray-600" />
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <h3 className="text-xl font-semibold text-black mb-2">
                            {title} - Locked
                        </h3>
                        <p className="text-gray-600 mb-6">
                            This content is available after purchase. Add this project to
                            your cart and submit your request. Our team will contact you on
                            WhatsApp to proceed.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
