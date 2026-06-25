export const personalInfo = {
  name: "Nithin Kumar U",
  roles: [
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "Prompt Engineer",
    "Tech Entrepreneur",
  ],
  tagline: "I build intelligent products powered by AI.",
  about:
    "Passionate AI Engineer with experience in Machine Learning, Full Stack Development, Computer Vision and LLMs. I love building products that solve real problems and push the boundaries of what's possible.",
  email: "nithinkumaru@gmail.com",
  phone: "+91 98765 43210",
  location: "Bangalore, India",
  github: "https://github.com/NithinkumarU",
  linkedin: "https://linkedin.com/in/nithinkumaru",
  instagram: "https://instagram.com/nithinkumaru",
  resume: "/resume.pdf",
  stats: {
    projects: 20,
    experience: 2,
    commits: 500,
    clients: 10,
  },
};

export const projects = [
  {
    id: 1,
    title: "AI Honeypot System",
    description:
      "An intelligent cybersecurity honeypot powered by LLMs that mimics vulnerable systems, logs attacker behavior, and generates real-time threat intelligence reports.",
    image: "/projects/honeypot.jpg",
    tech: ["Python", "FastAPI", "LangChain", "OpenAI", "Docker", "Redis"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#6C3EF4",
    featured: true,
  },
  {
    id: 2,
    title: "TeachGrow Platform",
    description:
      "Enterprise SaaS platform for employee management, CRM, lead tracking, and AI-powered productivity tools used by HR teams.",
    image: "/projects/teachgrow.jpg",
    tech: ["Next.js", "TypeScript", "Supabase", "TailwindCSS", "Node.js"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#00E5FF",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio AI Assistant",
    description:
      "Intelligent chatbot assistant embedded in portfolio websites using RAG architecture, trained on personal data to answer visitor questions naturally.",
    image: "/projects/ai-assistant.jpg",
    tech: ["Python", "LangChain", "FAISS", "OpenAI", "FastAPI", "React"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#A855F7",
    featured: true,
  },
  {
    id: 4,
    title: "AI Voice Calling System",
    description:
      "Automated voice calling system using AI for sales and customer support, with real-time speech synthesis, intent detection and CRM integration.",
    image: "/projects/voice.jpg",
    tech: ["Python", "Twilio", "OpenAI", "FastAPI", "PostgreSQL"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#F59E0B",
    featured: false,
  },
  {
    id: 5,
    title: "Heart Disease Prediction",
    description:
      "ML model achieving 95% accuracy in predicting heart disease risk using ensemble methods and feature engineering on clinical patient data.",
    image: "/projects/health.jpg",
    tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Streamlit"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#EF4444",
    featured: false,
  },
  {
    id: 6,
    title: "LLM Chatbot Framework",
    description:
      "Multi-modal chatbot framework supporting text, voice and image inputs with memory persistence, tool use, and custom knowledge base integration.",
    image: "/projects/chatbot.jpg",
    tech: ["Python", "LangChain", "OpenAI", "MongoDB", "React", "Socket.io"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#10B981",
    featured: false,
  },
];

export const skills = {
  Languages: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"],
  Frontend: ["React", "Next.js", "TailwindCSS", "Framer Motion", "GSAP"],
  Backend: ["Node.js", "FastAPI", "Flask", "Express", "REST APIs", "GraphQL"],
  "AI & ML": ["TensorFlow", "PyTorch", "Scikit-learn", "LangChain", "FAISS", "OpenAI", "Hugging Face", "Computer Vision"],
  Databases: ["Supabase", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Pinecone"],
  "DevOps & Cloud": ["Docker", "AWS", "Git", "GitHub Actions", "Nginx", "Linux"],
};

export const experience = [
  {
    id: 1,
    role: "AI & Full Stack Developer",
    company: "TeachGrow",
    type: "Full-time",
    period: "2024 – Present",
    description:
      "Building enterprise SaaS products for HR and employee management. Developed AI-powered features including voice calling, CRM modules, and smart analytics dashboards.",
    highlights: [
      "Built LLM-powered AI voice calling system reducing manual outreach by 60%",
      "Architected Lead Management CRM from scratch, adopted by 15+ companies",
      "Led full redesign to enterprise UI/UX, improving user retention by 40%",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "OpenAI", "FastAPI"],
    color: "#6C3EF4",
  },
  {
    id: 2,
    role: "Machine Learning Intern",
    company: "Startup (Confidential)",
    type: "Internship",
    period: "2023 – 2024",
    description:
      "Developed and deployed computer vision models for real-time object detection and classification in industrial quality control systems.",
    highlights: [
      "Trained YOLOv8 model achieving 97% accuracy on defect detection",
      "Reduced manual QC time by 70% through automation pipeline",
      "Deployed model on edge devices using TensorFlow Lite",
    ],
    tech: ["Python", "PyTorch", "OpenCV", "TensorFlow", "Docker"],
    color: "#00E5FF",
  },
  {
    id: 3,
    role: "Freelance Full Stack Developer",
    company: "Self-Employed",
    type: "Freelance",
    period: "2022 – 2023",
    description:
      "Built web applications and AI integrations for clients across India and abroad, focusing on clean UX and production-grade code.",
    highlights: [
      "Delivered 10+ client projects across fintech, healthcare, and edtech",
      "Integrated GPT-4 into 3 client platforms for intelligent automation",
      "Maintained 5-star ratings across all freelance platforms",
    ],
    tech: ["React", "Node.js", "Python", "MongoDB", "AWS"],
    color: "#A855F7",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "[Your University Name]",
    period: "2020 – 2024",
    grade: "CGPA: 8.5 / 10",
    highlights: ["Specialization in AI & Machine Learning", "Final year project on LLM-based code generation"],
  },
];

export const achievements = [
  { icon: "🏆", title: "Hackathon Winner", desc: "1st place at National AI Hackathon 2024" },
  { icon: "⭐", title: "Open Source", desc: "500+ GitHub commits, multiple starred repos" },
  { icon: "🎓", title: "Certified", desc: "AWS, Google Cloud, TensorFlow certifications" },
  { icon: "🚀", title: "20+ Projects", desc: "Shipped to production across multiple domains" },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechVentures",
    avatar: "/avatars/sarah.jpg",
    text: "Nithin delivered exceptional work. The AI integration he built for us reduced our processing time by 70%. Highly recommend.",
    rating: 5,
  },
  {
    name: "Raj Patel",
    role: "Founder at StartupXYZ",
    avatar: "/avatars/raj.jpg",
    text: "Working with Nithin was a pleasure. He understood our vision immediately and built a product that exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Product Manager at DataCorp",
    avatar: "/avatars/emily.jpg",
    text: "The ML model Nithin built for us achieved 95%+ accuracy. He has a rare combination of deep technical skills and product thinking.",
    rating: 5,
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
