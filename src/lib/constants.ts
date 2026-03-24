import type { Project, ExperienceItem, SkillCategory, NavLink } from '@/types'

export const COLORS = {
  void: '#000000',
  obsidian: '#242424',
  ivory: '#FBFAEE',
  purple: '#933DC9',
  deepPurple: '#53118F',
} as const

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const PROJECTS: Project[] = [
  {
    title: 'Krishibid Group Website',
    description:
      'Full-stack React corporate website with multilingual support (EN/BN), custom-built encrypted CMS dashboard, and role-based content management across subsidiaries.',
    url: 'https://krishibidgroup.com/',
    tags: ['React', 'Node.js', 'RBAC', 'CMS', 'Multilingual', 'Serverless'],
    featured: true,
  },
  {
    title: 'Karikr',
    description:
      'Full-stack MERN-inspired inventory and booking app with polished interactive UI/UX, smooth animations, Firebase auth, and end-to-end CRUD flows.',
    url: 'https://sunny-marigold-ba8b37.netlify.app/',
    tags: ['MERN', 'Firebase', 'Animations', 'Inventory'],
  },
  {
    title: 'Thwip!',
    description:
      'Immersive blog platform with curated content management, personalized wish lists, and Firebase-backed data handling delivering seamless interactive experience.',
    url: 'https://jovial-dieffenbachia-572021.netlify.app/',
    tags: ['React', 'Firebase', 'Blog', 'Full-stack'],
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Krishibid Group',
    role: 'DevOps Engineer (Full Stack)',
    period: 'July 2025 – Present',
    location: 'Kazipara, Mirpur, Dhaka-1216',
    bullets: [
      'Architected containerized development ecosystem on Ubuntu server — Dockerized services, PostgreSQL, Gitea, Hopscotch, pgAdmin — enabling multi-user collaboration.',
      'Configured OpenSSH access and container network port mappings for secure multi-user infrastructure.',
      'Developed GraphQL API using Express, PostgreSQL, and Socket.io powering web and Flutter apps from a single backend.',
      'Supervised new developer onboarding and guided a WhatsApp-like internal chat + task management application.',
      'Resolved critical container networking, database connectivity, and SSH port mapping conflicts.',
    ],
  },
  {
    company: 'Krishibid Group',
    role: 'Junior Software Engineer (Full Stack)',
    period: 'June 2024 – June 2025',
    location: 'Kazipara, Mirpur, Dhaka-1216',
    bullets: [
      'Achieved 10,000+ monthly organic visits through SEO strategies, keyword optimization, and metadata implementation.',
      'Drove 1,000+ monthly WhatsApp interactions by designing intuitive CTAs and optimized user journeys.',
      'Revamped corporate website using React delivering a minimalistic, high-performance interface aligned with "Green Bangladesh" brand vision.',
      'Deployed serverless Node.js backend with MVC microservices supporting CMS, newsletter automation, image uploads, and contact flows.',
      'Engineered RBAC admin dashboard for content management across subsidiaries.',
    ],
  },
]

export const SKILLS: SkillCategory[] = [
  {
    label: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS'],
  },
  {
    label: 'Frontend',
    items: ['ReactJS', 'Next.js', 'Tailwind CSS', 'Three.js', 'Three Fiber', 'Framer Motion', 'GSAP'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'Socket.io', 'MVC'],
  },
  {
    label: 'Databases & ORMs',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Drizzle'],
  },
  {
    label: 'DevOps & Tools',
    items: ['Docker', 'Linux', 'Shell Scripting', 'Vercel', 'Git/GitHub', 'Gitea', 'OpenSSH', 'CI/CD'],
  },
  {
    label: 'Security & Auth',
    items: ['Firebase', 'JWT', 'OAuth 2.0', 'SSH Keys', 'pgcrypto', 'RBAC', 'Better-Auth'],
  },
]

export const FRAME_COUNT = 6
export const FRAMES_BASE_PATH = '/frames/frame'
export const FRAMES_EXT = '.png'
