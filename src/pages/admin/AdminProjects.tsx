import { useState } from 'react';
import { Eye, ExternalLink, Plus, Pencil, Trash2, X } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { categories } from '../../data/projects';

interface ProjectFormData {
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    techStack: string;
    features: string;
    useCases: string;
    thumbnail: string;
    images: string;
}

const emptyForm: ProjectFormData = {
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'E-commerce',
    techStack: '',
    features: '',
    useCases: '',
    thumbnail: '',
    images: '',
};

export default function AdminProjects() {
    const { projects, addProject, updateProject, deleteProject } = useProjects();
    const [viewProject, setViewProject] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const selectedProject = projects.find((p) => p.id === viewProject);

    const handleEdit = (id: string) => {
        const project = projects.find((p) => p.id === id);
        if (project) {
            setFormData({
                title: project.title,
                shortDescription: project.shortDescription,
                fullDescription: project.fullDescription,
                category: project.category,
                techStack: project.techStack.join(', '),
                features: project.features.join('\n'),
                useCases: project.useCases.join('\n'),
                thumbnail: project.thumbnail,
                images: project.images.join('\n'),
            });
            setEditingId(id);
            setShowForm(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const projectData = {
            title: formData.title,
            shortDescription: formData.shortDescription,
            fullDescription: formData.fullDescription,
            category: formData.category,
            techStack: formData.techStack.split(',').map((s) => s.trim()).filter(Boolean),
            features: formData.features.split('\n').map((s) => s.trim()).filter(Boolean),
            useCases: formData.useCases.split('\n').map((s) => s.trim()).filter(Boolean),
            thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            images: formData.images.split('\n').map((s) => s.trim()).filter(Boolean) || [formData.thumbnail],
            whatYouGet: [
                { title: 'Source Code', description: 'Complete, well-documented codebase', locked: true },
                { title: 'Documentation', description: 'Setup guide and documentation', locked: true },
                { title: 'Setup Support', description: '1-on-1 deployment assistance', locked: true },
            ],
        };

        if (editingId) {
            updateProject(editingId, projectData);
        } else {
            addProject(projectData);
        }

        setShowForm(false);
        setEditingId(null);
        setFormData(emptyForm);
    };

    const handleDelete = (id: string) => {
        deleteProject(id);
        setDeleteConfirm(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-black">Projects</h1>
                    <p className="text-gray-500 mt-1">{projects.length} projects in catalog</p>
                </div>
                <div className="flex gap-2">
                    <a href="/projects" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <ExternalLink className="w-4 h-4" /> View Store
                    </a>
                    <button
                        onClick={() => { setShowForm(true); setEditingId(null); setFormData(emptyForm); }}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" /> Add Project
                    </button>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Project</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Tech Stack</th>
                                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={project.thumbnail} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                                            <div>
                                                <p className="font-medium text-black">{project.title}</p>
                                                <p className="text-sm text-gray-500 line-clamp-1 max-w-[250px]">{project.shortDescription}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{project.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.techStack.slice(0, 2).map((tech) => (
                                                <span key={tech} className="px-2 py-0.5 bg-black text-white text-xs rounded">{tech}</span>
                                            ))}
                                            {project.techStack.length > 2 && (
                                                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">+{project.techStack.length - 2}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => setViewProject(project.id)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg" title="View">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleEdit(project.id)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => setDeleteConfirm(project.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto" onClick={() => setShowForm(false)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-black">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                            <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Title *</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="E-Commerce Pro"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Short Description *</label>
                                <input
                                    required
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="A brief one-liner about the project"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Full Description *</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.fullDescription}
                                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="Detailed description of the project..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                >
                                    {categories.filter(c => c !== 'All').map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Tech Stack (comma separated) *</label>
                                <input
                                    required
                                    value={formData.techStack}
                                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="React, Node.js, MongoDB, Tailwind CSS"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Features (one per line) *</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="User authentication&#10;Payment integration&#10;Admin dashboard"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Use Cases (one per line)</label>
                                <textarea
                                    rows={3}
                                    value={formData.useCases}
                                    onChange={(e) => setFormData({ ...formData, useCases: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="Online stores&#10;Digital services&#10;Subscription businesses"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Thumbnail URL</label>
                                <input
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">Gallery Images (URLs, one per line)</label>
                                <textarea
                                    rows={2}
                                    value={formData.images}
                                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 bg-gray-100 text-black font-medium rounded-xl hover:bg-gray-200 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors">
                                    {editingId ? 'Update Project' : 'Add Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setViewProject(null)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full h-48 object-cover" />
                        <div className="p-6 space-y-4">
                            <h2 className="text-2xl font-bold text-black">{selectedProject.title}</h2>
                            <p className="text-gray-600">{selectedProject.fullDescription}</p>
                            <div>
                                <h3 className="font-semibold text-black mb-2">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-black text-white text-sm rounded-lg">{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-black mb-2">Features</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    {selectedProject.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => setViewProject(null)} className="w-full py-3 bg-gray-100 text-black font-medium rounded-xl hover:bg-gray-200 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setDeleteConfirm(null)}>
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-black mb-2">Delete Project?</h3>
                        <p className="text-gray-600 mb-6">This action cannot be undone. The project will be permanently removed.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 bg-gray-100 text-black font-medium rounded-lg hover:bg-gray-200">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
