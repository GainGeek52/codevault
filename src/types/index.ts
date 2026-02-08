// Project Types
export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    techStack: string[];
    features: string[];
    useCases: string[];
    thumbnail: string;
    images: string[];
    whatYouGet: WhatYouGetItem[];
}

export interface WhatYouGetItem {
    title: string;
    description: string;
    locked: boolean;
}

// Lead Types
export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    message: string;
    projects: string;
    createdAt: string;
    status: LeadStatus;
}

export type LeadStatus = 'new' | 'contacted' | 'converted' | 'closed';

// Form Types
export interface CheckoutFormData {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    message: string;
}

// Component Props Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}
