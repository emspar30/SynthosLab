import { Palette, Layout, Rocket, Figma, Bot, Code } from 'lucide-react';
import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'creative-visuals',
    title: 'Creative & Visuals',
    description: 'High-converting social media graphics and brand identities that stand out.',
    longDescription: 'In a saturated digital landscape, visual impact is the only currency that matters. Our Creative & Visuals team doesn\'t just make things look pretty; we engineer visual systems that command attention and communicate your brand value instantly. From kinetic typography to 3D motion graphics, we push pixels to their limit.',
    icon: Palette,
    gradient: 'from-pink-500/20 to-rose-500/20',
    videoUrl: 'https://videos.pexels.com/video-files/3048545/3048545-uhd_3840_2160_24fps.mp4', // Ink Swirls
    features: ['Brand Identity Systems', 'Social Media Assets', 'Motion Graphics', 'Marketing Collateral', '3D Asset Creation'],
    techStack: ['Adobe Photoshop', 'Adobe Illustrator', 'After Effects', 'Cinema 4D', 'Canva', 'Figma']
  },
  {
    id: 'template-architecture',
    title: 'Template Architecture',
    description: 'Custom-built templates for Portfolios and SaaS products, designed for easy scaling.',
    longDescription: 'Scalability shouldn\'t come at the cost of creativity. We build robust, modular template architectures for platforms like Webflow, Framer, and Shopify. These aren\'t cookie-cutter themes; they are flexible design systems that allow your team to publish content rapidly while maintaining perfect brand consistency.',
    icon: Layout,
    gradient: 'from-orange-500/20 to-amber-500/20',
    videoUrl: 'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4', // Digital Geometry
    features: ['Framer & Webflow Templates', 'CMS Architecture', 'Component Libraries', 'Documentation & Training', 'Design Tokens'],
    techStack: ['Webflow', 'Framer', 'Shopify Liquid', 'HTML5/CSS3', 'JavaScript', 'Relume']
  },
  {
    id: 'landing-page-engine',
    title: 'Landing Page Engine',
    description: 'High-performance landing pages designed specifically for sales and conversion.',
    longDescription: 'A landing page has one job: conversion. We combine behavioral psychology, persuasive copywriting, and blazing-fast code to build landing pages that turn visitors into revenue. We treat every fold as a conversion opportunity, optimizing load times and user flow for maximum ROI.',
    icon: Rocket,
    gradient: 'from-green-500/20 to-emerald-500/20',
    videoUrl: 'https://videos.pexels.com/video-files/852421/852421-hd_1920_1080_30fps.mp4', // Fast City/Speed
    features: ['A/B Testing', 'Conversion Copywriting', 'Speed Optimization', 'Analytics Setup', 'Heatmap Tracking'],
    techStack: ['Next.js', 'Tailwind CSS', 'Vercel', 'Optimizely', 'Hotjar', 'Google Analytics']
  },
  {
    id: 'prototyping-lab',
    title: 'Prototyping Lab',
    description: 'Interactive Figma & Framer prototypes perfect for investor pitches and user testing.',
    longDescription: 'Validate before you build. Our Prototyping Lab delivers high-fidelity, interactive experiences that feel like the real thing. Perfect for securing Series A funding or conducting rigorous user testing, our prototypes bridge the gap between imagination and execution without the cost of full development.',
    icon: Figma,
    gradient: 'from-purple-500/20 to-violet-500/20',
    videoUrl: 'https://videos.pexels.com/video-files/2882787/2882787-uhd_2560_1440_24fps.mp4', // Abstract Fluid
    features: ['User Flow Mapping', 'High-Fidelity Mockups', 'Clickable Prototypes', 'User Testing Support', 'Investor Pitch Decks'],
    techStack: ['Figma', 'Framer', 'ProtoPie', 'Principle', 'Maze', 'UserTesting']
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description: 'Workflow automation using n8n and Zapier to streamline your internal operations.',
    longDescription: 'Stop wasting human potential on robotic tasks. We architect intelligent automation agents that handle your data entry, lead qualification, and content distribution. Using tools like n8n, LangChain, and Zapier, we build invisible workforces that operate 24/7.',
    icon: Bot,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    videoUrl: 'https://videos.pexels.com/video-files/8353805/8353805-uhd_2560_1440_25fps.mp4', // Network/Data
    features: ['Custom n8n Workflows', 'Zapier Integrations', 'Chatbot Configuration', 'Data Pipeline Automation', 'LLM Integration'],
    featured: true,
    techStack: ['n8n', 'Zapier', 'Python', 'OpenAI API', 'LangChain', 'Pinecone']
  },
  {
    id: 'full-stack-dev',
    title: 'Full-Stack Development',
    description: 'Complete functional websites using React & Node with robust backend architecture.',
    longDescription: 'We build enterprise-grade applications using the MERN stack and Next.js. Security, scalability, and performance are baked in from line one. Whether you need a complex SaaS platform or a high-traffic e-commerce site, our engineering standards are world-class.',
    icon: Code,
    gradient: 'from-indigo-500/20 to-blue-500/20',
    videoUrl: 'https://videos.pexels.com/video-files/5473806/5473806-uhd_2560_1440_24fps.mp4', // Coding
    features: ['React & Next.js', 'Node.js Backend', 'Database Design', 'API Development', 'Cloud Infrastructure'],
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  }
];