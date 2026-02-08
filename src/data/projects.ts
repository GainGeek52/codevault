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
  whatYouGet: {
    title: string;
    description: string;
    locked: boolean;
  }[];
}

export const categories = [
  'All',
  'E-commerce',
  'Admin Panels',
  'AI & ML',
  'College Projects',
  'SaaS',
  'Portfolio',
  'Dashboard',
];

export const projects: Project[] = [
  {
    id: 'ecommerce-pro',
    title: 'E-Commerce Pro',
    shortDescription: 'Full-featured online store with cart, checkout, and admin panel.',
    fullDescription: 'A complete e-commerce solution built with modern technologies. Features include product management, inventory tracking, order processing, customer accounts, and a powerful admin dashboard. Perfect for launching your online business.',
    category: 'E-commerce',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Product catalog with filters and search',
      'Customer authentication and profiles',
      'Inventory management system',
      'Email notifications',
      'Mobile-responsive design',
    ],
    useCases: [
      'Online retail stores',
      'Digital product sales',
      'Subscription-based businesses',
      'Multi-vendor marketplaces',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    ],
    whatYouGet: [
      { title: 'Source Code', description: 'Complete, well-documented codebase', locked: true },
      { title: 'Documentation', description: 'Setup guide and API documentation', locked: true },
      { title: 'Setup Support', description: '1-on-1 deployment assistance', locked: true },
    ],
  },
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard Pro',
    shortDescription: 'Modern admin panel with analytics, user management, and reports.',
    fullDescription: 'A comprehensive admin dashboard built for managing applications at scale. Includes beautiful charts, data tables, user management, role-based access control, and real-time notifications.',
    category: 'Admin Panels',
    techStack: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'Firebase'],
    features: [
      'Real-time analytics dashboard',
      'User management with RBAC',
      'Data visualization with charts',
      'Advanced data tables with export',
      'Notification system',
      'Dark/Light theme toggle',
      'Activity logging',
      'Customizable widgets',
    ],
    useCases: [
      'SaaS application backends',
      'Content management systems',
      'Enterprise resource planning',
      'Customer relationship management',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop',
    ],
    whatYouGet: [
      { title: 'Source Code', description: 'Complete, well-documented codebase', locked: true },
      { title: 'Documentation', description: 'Component library documentation', locked: true },
      { title: 'Setup Support', description: 'Integration assistance', locked: true },
    ],
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot Platform',
    shortDescription: 'Intelligent chatbot with NLP, multi-channel support, and analytics.',
    fullDescription: 'An AI-powered chatbot platform that can be integrated into any website or application. Features natural language processing, context-aware conversations, and seamless handoff to human agents.',
    category: 'AI & ML',
    techStack: ['Python', 'FastAPI', 'OpenAI', 'React', 'PostgreSQL'],
    features: [
      'Natural language understanding',
      'Context-aware conversations',
      'Multi-channel deployment',
      'Human agent handoff',
      'Conversation analytics',
      'Custom training capabilities',
      'Webhook integrations',
      'Multilingual support',
    ],
    useCases: [
      'Customer support automation',
      'Lead generation',
      'FAQ automation',
      'E-commerce assistance',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop',
    ],
    whatYouGet: [
      { title: 'Source Code', description: 'Full AI chatbot codebase', locked: true },
      { title: 'Documentation', description: 'Training and deployment guide', locked: true },
      { title: 'Setup Support', description: 'AI model configuration help', locked: true },
    ],
  },
  {
    id: 'college-management',
    title: 'College Management System',
    shortDescription: 'Complete solution for student, faculty, and course management.',
    fullDescription: 'A comprehensive college management system designed for educational institutions. Manage students, faculty, courses, attendance, grades, and generate detailed reports all in one place.',
    category: 'College Projects',
    techStack: ['React', 'Node.js', 'MySQL', 'Express', 'Bootstrap'],
    features: [
      'Student information system',
      'Faculty management',
      'Course and timetable management',
      'Attendance tracking',
      'Grade management',
      'Fee management',
      'Library management',
      'Report generation',
    ],
    useCases: [
      'Universities and colleges',
      'Training institutes',
      'Online learning platforms',
      'Coaching centers',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=800&fit=crop',
    ],
    whatYouGet: [
      { title: 'Source Code', description: 'Complete system codebase', locked: true },
      { title: 'Documentation', description: 'Implementation guide', locked: true },
      { title: 'Setup Support', description: 'Database setup assistance', locked: true },
    ],
  },
  {
    id: 'saas-starter',
    title: 'SaaS Starter Kit',
    shortDescription: 'Production-ready SaaS boilerplate with auth, billing, and multi-tenancy.',
    fullDescription: 'Launch your SaaS product faster with this complete starter kit. Includes authentication, subscription billing, team management, multi-tenancy, and a beautiful landing page.',
    category: 'SaaS',
    techStack: ['Next.js', 'Prisma', 'Stripe', 'NextAuth', 'Tailwind CSS'],
    features: [
      'Authentication with multiple providers',
      'Stripe subscription billing',
      'Multi-tenant architecture',
      'Team and organization management',
      'Role-based permissions',
      'API with rate limiting',
      'Email templates',
      'Landing page components',
    ],
    useCases: [
      'B2B SaaS products',
      'Subscription services',
      'Team collaboration tools',
      'API-based services',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop',
    ],
    whatYouGet: [
      { title: 'Source Code', description: 'Full Next.js codebase', locked: true },
      { title: 'Documentation', description: 'Complete setup documentation', locked: true },
      { title: 'Setup Support', description: 'Stripe and auth configuration', locked: true },
    ],
  },
  {
    id: 'portfolio-developer',
    title: 'Developer Portfolio',
    shortDescription: 'Stunning portfolio website with blog, projects showcase, and contact form.',
    fullDescription: 'A beautiful, minimalist portfolio website perfect for developers and designers. Features a clean design, smooth animations, project showcases, integrated blog, and contact functionality.',
    category: 'Portfolio',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'MDX'],
    features: [
      'Responsive minimalist design',
      'Smooth scroll animations',
      'Project showcase gallery',
      'Integrated MDX blog',
      'Contact form with validation',
      'SEO optimized',
      'Dark mode support',
      'Social media integration',
    ],
    useCases: [
      'Developer portfolios',
      'Designer showcases',
      'Freelancer websites',
      'Personal branding',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop',
    ],
    whatYouGet: [
      { title: 'Source Code', description: 'React portfolio codebase', locked: true },
      { title: 'Documentation', description: 'Customization guide', locked: true },
      { title: 'Setup Support', description: 'Deployment assistance', locked: true },
    ],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    shortDescription: 'Real-time analytics platform with custom charts and data visualization.',
    fullDescription: 'A powerful analytics dashboard for tracking metrics, visualizing data, and generating insights. Features real-time updates, customizable widgets, and export capabilities.',
    category: 'Dashboard',
    techStack: ['React', 'D3.js', 'Socket.io', 'Node.js', 'Redis'],
    features: [
      'Real-time data updates',
      'Custom chart builder',
      'Drag-and-drop widgets',
      'Data export (CSV, PDF)',
      'Scheduled reports',
      'User access controls',
      'API integrations',
      'Mobile responsive',
    ],
    useCases: [
      'Business intelligence',
      'Marketing analytics',
      'Sales performance tracking',
      'Operational monitoring',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    ],
    whatYouGet: [
      { title: 'Source Code', description: 'Complete analytics platform', locked: true },
      { title: 'Documentation', description: 'Integration documentation', locked: true },
      { title: 'Setup Support', description: 'Real-time setup assistance', locked: true },
    ],
  },
  {
    id: 'food-delivery',
    title: 'Food Delivery App',
    shortDescription: 'Complete food ordering platform with restaurant management and delivery tracking.',
    fullDescription: 'A full-featured food delivery platform similar to popular apps. Includes customer ordering, restaurant dashboards, driver management, and real-time order tracking.',
    category: 'E-commerce',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps'],
    features: [
      'Restaurant discovery and search',
      'Menu management',
      'Cart and checkout',
      'Real-time order tracking',
      'Driver assignment',
      'Rating and reviews',
      'Push notifications',
      'Admin dashboard',
    ],
    useCases: [
      'Food delivery startups',
      'Restaurant chains',
      'Cloud kitchens',
      'Grocery delivery',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&h=800&fit=crop',
    ],
    whatYouGet: [
      { title: 'Source Code', description: 'Mobile + Web + Backend', locked: true },
      { title: 'Documentation', description: 'Complete setup guide', locked: true },
      { title: 'Setup Support', description: 'Maps and payments setup', locked: true },
    ],
  },
];
