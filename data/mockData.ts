import { PortfolioData } from '@/types/portfolio.types';

// Mock data for development
// Later, this will be replaced with database queries

export const mockPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'Manobendra Mandal',
    title: 'Blockchain & Full Stack Developer',
    bio: 'Hey! I\'m a Web3 and full-stack developer who loves building things that actually work and scale. I\'ve won 10 hackathons, creating decentralized platforms in fintech, AI, and edtech. My toolbox includes Solidity, Rust, Next.js, and everything MERN, and I\'m currently deep-diving into system design and DevOps to level up from a good dev to a great engineer. I care about clean architecture, real-world impact, and products people actually use. When I\'m not coding, I\'m probably cooking, jamming on my guitar, or sketching the next crazy project idea.',
    avatarUrl: '/avatar.png', 
    age: 21,
    email: 'manovmandal@gmail.com',
    location: 'Kolkata, West Bengal, India',
    locationFlag: '🇮🇳',
  },
  interests: [
    { id: '1', name: 'Gaming', icon: 'gamepad' },
    { id: '2', name: 'Film Making', icon: 'film' },
    { id: '3', name: 'Traveling', icon: 'suitcase' },
  ],
  experience: [
    {
      id: '1',
      company: 'Newscope',
      role: 'Web Developer',
      startDate: 'Oct 2024',
      endDate: 'Jan 2025',
      responsibilities: [
        'Built the full-stack Newscope platform with Next.js, Express, and MongoDB, featuring a secure admin panel for content management.',
        'Developed an author onboarding workflow with Nodemailer.',
        'Managed full-stack deployment, building a responsive UI with Tailwind CSS and securing the backend with REST APIs and JWT.',
      ],
    },
  ],
  skills: [
    // Languages (Programming)
    { id: '1', name: 'Next.js', category: 'language', color: '#3776AB' },
    { id: '2', name: 'C', category: 'language', color: '#A8B9CC' },
    { id: '3', name: 'C++', category: 'language', color: '#00599C' },
    { id: '4', name: 'JavaScript', category: 'language', color: '#F7DF1E' },
    { id: '5', name: 'Rust', category: 'language', color: '#000000' },
    { id: '6', name: 'Java', category: 'language', color: '#ED8B00' },
    { id: '7', name: 'Solidity', category: 'language', color: '#363636' },
    // Frontend
    { id: '8', name: 'React.js', category: 'frontend', icon: 'React', color: '#61DAFB' },
    { id: '9', name: 'Next.js', category: 'frontend', icon: 'Next', color: '#000000' },
    { id: '10', name: 'Tailwind CSS', category: 'frontend', icon: 'Tailwind', color: '#06B6D4' },
    { id: '11', name: 'Bootstrap', category: 'frontend', color: '#7952B3' },
    // Backend
    { id: '12', name: 'Node.js', category: 'backend', icon: 'Node', color: '#339933' },
    { id: '13', name: 'Express', category: 'backend', icon: 'Express', color: '#000000' },
    // Database
    { id: '14', name: 'MongoDB', category: 'database', icon: 'MongoDB', color: '#47A248' },
    { id: '15', name: 'PostgreSQL', category: 'database', icon: 'PostgreSQL', color: '#4169E1' },
    { id: '16', name: 'Supabase', category: 'database', color: '#3ECF8E' },
    // Blockchain/Web3
    { id: '17', name: 'Ethereum', category: 'tools', color: '#627EEA' },
    { id: '18', name: 'Solana', category: 'tools', color: '#9945FF' },
    { id: '19', name: 'Polygon', category: 'tools', color: '#8247E5' },
    { id: '20', name: 'Celo', category: 'tools', color: '#FBCC5C' },
    { id: '21', name: 'ethers.js', category: 'tools', color: '#627EEA' },
    { id: '22', name: 'Wagmi', category: 'tools', color: '#8B5CF6' },
    { id: '23', name: 'IPFS', category: 'tools', color: '#65C2CB' },
    { id: '24', name: 'The Graph', category: 'tools', color: '#000000' },
    // Tools & DevOps
    { id: '25', name: 'Git', category: 'tools', icon: 'Git', color: '#F05032' },
    { id: '26', name: 'Docker', category: 'tools', icon: 'Docker', color: '#2496ED' },
    { id: '27', name: 'Socket.io', category: 'tools', color: '#010101' },
    { id: '28', name: 'Hardhat', category: 'tools', color: '#F9E7A2' },
    { id: '29', name: 'Arcjet', category: 'tools', color: '#000000' },
    { id: '30', name: 'Inngest', category: 'tools', color: '#000000' },
    { id: '31', name: 'Nodemailer', category: 'tools', color: '#339933' },
    // AI/Automation
    { id: '32', name: 'OpenAI API', category: 'tools', color: '#412991' },
    { id: '33', name: 'Gemini AI', category: 'tools', color: '#4285F4' },
    // Languages (spoken)
    { id: '34', name: 'Hindi', category: 'language', icon: '🇮🇳' },
    { id: '35', name: 'English', category: 'language', icon: '🇬🇧' },
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Computer Applications',
      institution: 'Sister Nivedita University',
      location: 'Kolkata, West Bengal',
      startYear: '2022',
      endYear: '2025',
      imageUrl: '/education/snu.png',
    },
    {
      id: '2',
      degree: 'Higher Secondary',
      institution: 'Priyadarshini Public School - CBSE',
      location: 'Kulti, Paschim Bardhaman, West Bengal',
      startYear: '',
      endYear: 'Till 2022',
      imageUrl: '/education/pps.png',
    }
  ],
  projects: [
    {
      id: '1',
      title: 'Mizu Pay',
      description: 'Decentralized checkout platform enabling real-world purchases using Celo stablecoins.',
      longDescription: 'A decentralized checkout platform enabling real-world purchases with Celo stablecoins. Users shop on e-commerce sites and pay with cUSD/CELO while automatically contributing to ReFi climate projects. Built with Next.js, Supabase, and Envio.',
      imageUrl: '/projects/mizu-pay.png',
      technologies: ['Solidity', 'Next.js', 'Supabase', 'Envio', 'Celo', 'Browser Extension'],
      githubUrl: 'https://github.com/manovHacksaw/Mizu-Pay',
      liveUrl: 'https://github.com/manovHacksaw/Mizu-Pay',
      featured: true,
      startDate: 'Oct 2025',
      endDate: null, // Present
    },
    {
      id: '2',
      title: 'Chingu Finance',
      description: 'Full-stack finance tracker with budgeting, AI receipt parsing, and CSV/PDF exports.',
      longDescription: 'A comprehensive finance tracker with budgeting, AI-powered receipt parsing using Gemini AI, and CSV/PDF exports. Features include recurring transactions via Inngest, real-time balance sync across accounts, multi-currency support, and Arcjet bot protection.',
      imageUrl: '/projects/chingu-finance.jpg',
      technologies: ['Next.js', 'PostgreSQL', 'Inngest', 'Gemini AI'],
      githubUrl: '#',
      liveUrl: 'https://chingu.vercel.app',
      featured: true,
      startDate: 'Jul 2024',
      endDate: null, // Present
    },
    {
      id: '3',
      title: 'PolyTix',
      description: 'Decentralized voting dApp supporting token-gated, open, and registration-based campaigns.',
      longDescription: 'A decentralized voting dApp supporting token-gated, open, and registration-based campaigns. Secured voting uses NFT-based access for voters and candidates. Leverages The Graph protocol for efficient indexing and querying, delivering live on-chain results.',
      imageUrl: '/projects/polytix.jpg',
      technologies: ['Solidity', 'NFTs', 'The Graph', 'Polygon', 'ethers.js'],
      githubUrl: '#',
      liveUrl: 'https://polytix.vercel.app',
      featured: true,
      startDate: 'Jan 2025',
      endDate: 'Apr 2025',
    },
    {
      id: '4',
      title: 'Edu Legacy',
      description: 'Decentralized Smart Will system for programmable asset and scholarship inheritance.',
      longDescription: 'A decentralized Smart Will system enabling programmable asset and scholarship inheritance. Features inactivity and milestone-based unlocks with cryptographic signature verification. Won over $10,000 in hackathon bounties and accepted into Open Campus Incubator.',
      imageUrl: '/projects/edu-legacy.jpg',
      technologies: ['Solidity', 'Next.js', 'EDU Chain'],
      githubUrl: '#',
      liveUrl: 'https://edu-legacy.vercel.app',
      featured: true,
      startDate: 'Jan 2025',
      endDate: null, // Present
    },
  ],
  portfolioLinks: [
    { id: '1', platform: 'GitHub', url: 'https://github.com/manovHacksaw', icon: 'github' },
    { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/manobendra-mandal-513ba7214/', icon: 'linkedin' },
    { id: '3', platform: 'Portfolio', url: 'https://maybe-manov.vercel.app/', icon: 'globe' },
    { id: '4', platform: 'Email', url: 'mailto:manovmandal@gmail.com', icon: 'email' },
  ],
};

