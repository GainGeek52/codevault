import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart, CheckCircle } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useCart } from '../context/CartContext';
import ImageCarousel from '../components/ImageCarousel';
import LockedItem from '../components/LockedItem';

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const { projects } = useProjects();
    const { addToCart, isInCart } = useCart();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-black mb-4">Project not found</h1>
                    <Link to="/projects" className="text-gray-600 hover:text-black">
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    const inCart = isInCart(project.id);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/projects" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ImageCarousel images={project.images} title={project.title} />

                    <div className="space-y-6">
                        <div>
                            <span className="px-3 py-1 bg-gray-100 text-sm font-medium rounded-full">{project.category}</span>
                            <h1 className="text-3xl font-bold text-black mt-4 mb-3">{project.title}</h1>
                            <p className="text-gray-600">{project.fullDescription}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-black mb-3">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 bg-black text-white text-sm rounded-lg">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border">
                            <p className="text-sm text-gray-600 mb-1">Price</p>
                            <p className="text-xl font-semibold text-black">Contact for Quote</p>
                        </div>

                        <button
                            onClick={() => addToCart(project)}
                            disabled={inCart}
                            className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${inCart ? 'bg-gray-100 text-gray-500' : 'bg-black text-white hover:bg-gray-800'
                                }`}
                        >
                            {inCart ? <><CheckCircle className="w-5 h-5" /> Added to Cart</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
                        </button>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-black mb-4">Features</h3>
                        <ul className="space-y-3">
                            {project.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-black mb-4">Use Cases</h3>
                        <ul className="space-y-3">
                            {project.useCases.map((useCase) => (
                                <li key={useCase} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">{useCase}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16">
                    <h3 className="text-xl font-semibold text-black mb-4">What You Get</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.whatYouGet.map((item) => (
                            <LockedItem key={item.title} title={item.title} description={item.description} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
