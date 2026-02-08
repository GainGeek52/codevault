import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-black rounded-full">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-black group-hover:text-gray-700 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {project.shortDescription}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                            +{project.techStack.length - 3}
                        </span>
                    )}
                </div>

                {/* CTA */}
                <Link
                    to={`/project/${project.id}`}
                    className="flex items-center justify-between pt-2 group/link"
                >
                    <span className="text-sm font-medium text-black">View Details</span>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover/link:bg-gray-800 transition-colors">
                        <ArrowRight className="w-4 h-4 text-white group-hover/link:translate-x-0.5 transition-transform" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
