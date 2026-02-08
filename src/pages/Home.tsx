import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Code2,
    Layers,
    Rocket,
    Shield,
    Sparkles,
} from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProjects =
        selectedCategory === 'All'
            ? projects.slice(0, 6)
            : projects.filter((p) => p.category === selectedCategory).slice(0, 6);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03)_0%,transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.03)_0%,transparent_50%)]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 animate-fade-in">
                            <Sparkles className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Production-Ready Solutions
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight animate-fade-in-up">
                            Ready-to-use
                            <br />
                            <span className="text-gray-500">Web App Projects</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
                            High-quality, production-ready web applications built with modern
                            technologies. Request access and launch your project faster.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-200">
                            <Link
                                to="/projects"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Browse Projects
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-black font-medium rounded-xl hover:bg-gray-200 transition-all"
                            >
                                How It Works
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Code2,
                                title: 'Clean Code',
                                description:
                                    'Well-structured, documented, and maintainable codebase',
                            },
                            {
                                icon: Layers,
                                title: 'Modern Stack',
                                description:
                                    'Built with React, Node.js, TypeScript, and more',
                            },
                            {
                                icon: Shield,
                                title: 'Best Practices',
                                description:
                                    'Security, performance, and scalability considered',
                            },
                            {
                                icon: Rocket,
                                title: 'Quick Deploy',
                                description:
                                    'Ready to deploy with setup documentation included',
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-black mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black mb-4">How It Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A simple process to get your production-ready project
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                step: '01',
                                title: 'Browse & Select',
                                description:
                                    'Explore our catalog and add projects to your cart',
                            },
                            {
                                step: '02',
                                title: 'Submit Request',
                                description:
                                    'Fill out the form with your details and requirements',
                            },
                            {
                                step: '03',
                                title: 'Get Connected',
                                description:
                                    'We contact you on WhatsApp to discuss and deliver',
                            },
                        ].map((item, index) => (
                            <div key={item.step} className="relative text-center">
                                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-black mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200 max-w-2xl mx-auto">
                        <p className="text-center text-gray-600 text-sm">
                            <strong>Note:</strong> This is not an automated purchase. Our team
                            will personally contact you on WhatsApp after you submit your
                            request to discuss pricing and delivery.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-2">
                                Featured Projects
                            </h2>
                            <p className="text-gray-600">
                                Explore our collection of production-ready applications
                            </p>
                        </div>
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 text-black font-medium hover:gap-3 transition-all"
                        >
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="mb-8">
                        <CategoryFilter
                            selected={selectedCategory}
                            onSelect={setSelectedCategory}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">
                                No projects found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                            Ready to Launch Your Project?
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Browse our catalog, select your projects, and get connected with
                            our team to get started.
                        </p>
                        <Link
                            to="/projects"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-all"
                        >
                            Explore All Projects
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
