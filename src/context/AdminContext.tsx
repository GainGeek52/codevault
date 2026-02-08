import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    message: string;
    projects: string;
    createdAt: string;
    status: 'new' | 'contacted' | 'converted' | 'closed';
}

interface AdminContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    leads: Lead[];
    addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
    updateLeadStatus: (id: string, status: Lead['status']) => void;
    deleteLead: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123'; // In production, use proper auth

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('adminAuth') === 'true';
    });

    const [leads, setLeads] = useState<Lead[]>(() => {
        const saved = localStorage.getItem('codevault_leads');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('codevault_leads', JSON.stringify(leads));
    }, [leads]);

    const login = (password: string) => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
    };

    const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
        const newLead: Lead = {
            ...leadData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'new',
        };
        setLeads((prev) => [newLead, ...prev]);
    };

    const updateLeadStatus = (id: string, status: Lead['status']) => {
        setLeads((prev) =>
            prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
        );
    };

    const deleteLead = (id: string) => {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
    };

    return (
        <AdminContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                leads,
                addLead,
                updateLeadStatus,
                deleteLead,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}

export type { Lead };
