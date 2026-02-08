/**
 * Application Constants
 * 
 * Centralized location for all app-wide constants.
 * Makes it easy to update values across the entire app.
 */

// Contact Info
export const CONTACT = {
    WHATSAPP: '+919999999999',
    EMAIL: 'contact@codevault.com',
} as const;

// Project Categories
export const CATEGORIES = [
    'All',
    'E-commerce',
    'Admin Panels',
    'AI & ML',
    'College Projects',
    'SaaS',
    'Portfolio',
    'Dashboard',
] as const;

// Lead Status Options
export const LEAD_STATUS = {
    NEW: 'new',
    CONTACTED: 'contacted',
    CONVERTED: 'converted',
    CLOSED: 'closed',
} as const;

// Status Colors (for UI)
export const STATUS_COLORS = {
    new: 'bg-green-100 text-green-700',
    contacted: 'bg-blue-100 text-blue-700',
    converted: 'bg-purple-100 text-purple-700',
    closed: 'bg-gray-100 text-gray-700',
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
} as const;

// Navigation Links
export const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
] as const;

// Admin Navigation
export const ADMIN_NAV_LINKS = [
    { name: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
    { name: 'Projects', path: '/admin/projects', icon: 'Package' },
    { name: 'Leads', path: '/admin/leads', icon: 'Users' },
] as const;
