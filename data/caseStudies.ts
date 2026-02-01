
export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  image: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'vertex-fintech',
    client: 'Vertex Financial',
    industry: 'FinTech',
    title: 'Modernizing Legacy Banking Infrastructure',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    challenge: 'Vertex was struggling with a 10-year-old dashboard that was slow, non-responsive, and causing a 40% churn rate among new digitally-native users.',
    solution: 'We architected a completely new frontend using Next.js and Tailwind, connected to their existing secure banking API. We implemented real-time data visualization using D3.js and a modular design system for future scalability.',
    results: [
      { label: 'Load Time Reduced', value: '85%' },
      { label: 'User Retention', value: '+40%' },
      { label: 'Mobile Usage', value: '3x' }
    ],
    testimonial: {
      quote: "The speed and clarity of the new dashboard have completely transformed how our customers interact with their finances. SynthosLab didn't just code; they solved a business crisis.",
      author: "Sarah Jenkings",
      role: "CTO"
    },
    tags: ['React', 'D3.js', 'FinTech', 'UX Design']
  },
  {
    id: 'nebula-saas',
    client: 'Nebula',
    industry: 'SaaS / AI',
    title: 'Scaling AI Operations with Automation',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop',
    challenge: 'Nebula was growing faster than their support team could handle. They were drowning in manual data entry and ticket routing, leading to 48-hour response times.',
    solution: 'We built a custom n8n workflow integrating OpenAI and their CRM. The system now automatically categorizes tickets, drafts responses based on knowledge base articles, and updates customer records instantly.',
    results: [
      { label: 'Manual Work Saved', value: '120hrs/wk' },
      { label: 'Response Time', value: '< 5mins' },
      { label: 'Support Cost', value: '-60%' }
    ],
    testimonial: {
      quote: "It feels like we hired 10 new support agents overnight, but it's just the automation SynthosLab built for us.",
      author: "Marcus Chen",
      role: "Founder"
    },
    tags: ['n8n', 'OpenAI', 'Automation', 'CRM']
  },
  {
    id: 'horizon-ecom',
    client: 'Horizon',
    industry: 'E-Commerce',
    title: 'Headless Commerce for Global Retail',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop',
    challenge: 'Horizon needed to expand into 3 new international markets but their monolithic Shopify theme made localization and currency conversion a nightmare.',
    solution: 'We decoupled the frontend using a Headless Shopify setup with Hydrogen (React). This allowed for instant page transitions and dynamic content localization based on user IP, all managed from a single backend.',
    results: [
      { label: 'Conversion Rate', value: '+115%' },
      { label: 'Intl. Sales', value: '+200%' },
      { label: 'Core Vitals', value: '100/100' }
    ],
    testimonial: {
      quote: "Our expansion would have failed without this architecture. We are now truly a global brand thanks to the engineering rigor of the Synthos team.",
      author: "Elena Rodriguez",
      role: "CMO"
    },
    tags: ['Shopify Plus', 'Hydrogen', 'React', 'Global']
  },
  {
    id: 'vital-health',
    client: 'VitalSync',
    industry: 'Healthcare',
    title: 'Secure Patient Portal & Telehealth',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop',
    challenge: 'VitalSync faced compliance hurdles and poor user adoption with their legacy patient portal. Patients found it difficult to schedule appointments or access records securely.',
    solution: 'We developed a HIPAA-compliant mobile and web application featuring biometric authentication, encrypted video consultations, and an intuitive UI for elderly patients.',
    results: [
      { label: 'Patient Adoption', value: '+75%' },
      { label: 'Missed Appts', value: '-30%' },
      { label: 'Security Score', value: 'A+' }
    ],
    testimonial: {
      quote: "SynthosLab navigated the complex regulatory landscape perfectly while delivering an app that our patients actually love using.",
      author: "Dr. James Wilson",
      role: "Medical Director"
    },
    tags: ['Healthcare', 'Mobile App', 'Security', 'React Native']
  },
  {
    id: 'urban-flow',
    client: 'Metropolis',
    industry: 'Smart City',
    title: 'Real-Time Traffic Analytics Grid',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2940&auto=format&fit=crop',
    challenge: 'City planners needed a way to visualize traffic patterns from thousands of IoT sensors in real-time to optimize traffic light timings and reduce congestion.',
    solution: 'We built a high-performance WebGL visualization dashboard processing millions of data points per minute. The system uses predictive AI to suggest signal adjustments proactively.',
    results: [
      { label: 'Congestion', value: '-25%' },
      { label: 'Data Latency', value: '< 100ms' },
      { label: 'Efficiency', value: '+40%' }
    ],
    testimonial: {
      quote: "The visualization capabilities are stunning. We can now see the heartbeat of the city and make decisions that improve life for millions.",
      author: "Amanda Lee",
      role: "Director of Planning"
    },
    tags: ['WebGL', 'Big Data', 'AI', 'IoT']
  }
];
