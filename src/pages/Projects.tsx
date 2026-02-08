import { useState } from 'react';
import { Search } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Projects() {
    const { projects } = useProjects();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter((project) => {
        const matchesCategory =
            selectedCategory === 'All' || project.category === selectedCategory;
        const matchesSearch =
            searchQuery === '' ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">All Projects</h1>
                    <p className="text-gray-600">Browse our complete collection of production-ready web applications</p>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-all"
                        />
                    </div>
                    <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    Showing <span className="font-medium text-black">{filteredProjects.length}</span> projects
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No projects found</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
