import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projects as initialProjects, Project } from '../data/projects';

interface ProjectContextType {
    projects: Project[];
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem('codevault_projects');
        return saved ? JSON.parse(saved) : initialProjects;
    });

    useEffect(() => {
        localStorage.setItem('codevault_projects', JSON.stringify(projects));
    }, [projects]);

    const addProject = (projectData: Omit<Project, 'id'>) => {
        const newProject: Project = {
            ...projectData,
            id: Date.now().toString(),
        };
        setProjects((prev) => [newProject, ...prev]);
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects((prev) =>
            prev.map((project) =>
                project.id === id ? { ...project, ...updates } : project
            )
        );
    };

    const deleteProject = (id: string) => {
        setProjects((prev) => prev.filter((project) => project.id !== id));
    };

    const getProject = (id: string) => {
        return projects.find((project) => project.id === id);
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                addProject,
                updateProject,
                deleteProject,
                getProject,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
}
