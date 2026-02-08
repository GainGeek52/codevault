import { useState } from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

export default function AdminProjects() {
    const [viewProject, setViewProject] = useState<string | null>(null);
    const selectedProject = projects.find((p) => p.id === viewProject);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-black">Projects</h1>
                    <p className="text-gray-500 mt-1">Manage your project catalog</p>
                </div>
                <a href="/projects" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    <ExternalLink className="w-4 h-4" /> View Store
                </a>
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
                                                <p className="text-sm text-gray-500 line-clamp-1">{project.shortDescription}</p>
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
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setViewProject(project.id)}
                                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-sm text-gray-500 text-center">
                Projects are defined in <code className="bg-gray-100 px-2 py-1 rounded">src/data/projects.ts</code>. Edit that file to add/modify projects.
            </p>

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
                            <button onClick={() => setViewProject(null)} className="w-full py-3 bg-gray-100 text-black font-medium rounded-xl hover:bg-gray-200 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
