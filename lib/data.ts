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
  email: "nithinkumaru32@outlook.com",
  phone: "+91 8553293346",
  location: "Bangalore, India",
  github: "https://github.com/NithinkumarU",
  linkedin: "https://www.linkedin.com/in/nithinkumaru32",
  instagram: "https://instagram.com/nithinkumaru",
  resume: "/resume.pdf",
  stats: {
    projects: 20,
    experience: 2,
    commits: 500,
    clients: 10,
  },
};

// `description` stays as the short technical blurb used in compact carousel cards.
// `tagline`/`whatItIs`/`whyBuilt`/`whatItDoes`/`howItHelps` are the client-facing
// copy shown on the /projects case-study pages — plain language, no jargon.
export const projects = [
  {
    id: 1,
    slug: "ai-honeypot-system",
    category: "Cybersecurity · AI",
    title: "AI Honeypot System",
    description:
      "An intelligent cybersecurity honeypot powered by LLMs that mimics vulnerable systems, logs attacker behavior, and generates real-time threat intelligence reports.",
    tagline: "A smart decoy system that distracts cyberattackers and studies how they try to break in.",
    whatItIs:
      "A security system that pretends to be a real, hackable computer system. When attackers try to break in, they interact with the decoy instead of anything real — and every move they make gets recorded.",
    whyBuilt:
      "Businesses often don't know how attackers are targeting them until real damage is done. This was built to safely observe attacker behavior before it becomes a real threat.",
    whatItDoes: [
      "Creates a realistic-looking fake system for attackers to target",
      "Automatically responds to attacker actions using AI",
      "Records every step an attacker takes",
      "Generates readable threat reports instead of raw logs",
      "Helps security teams understand attack patterns",
    ],
    howItHelps:
      "Gives businesses early warning about how attackers operate, without putting real systems or data at risk.",
    image: "/projects/honeypot.jpg",
    tech: ["Python", "FastAPI", "LangChain", "OpenAI", "Docker", "Redis"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#6C3EF4",
    featured: true,
  },
  {
    id: 2,
    slug: "teachgrow-platform",
    category: "SaaS · Operations Platform",
    title: "TeachGrow Platform",
    description:
      "Enterprise SaaS platform for employee management, CRM, lead tracking, and AI-powered productivity tools used by HR teams.",
    tagline: "A complete digital platform designed to manage education organization operations in one place.",
    whatItIs:
      "A complete digital platform designed to manage education-organization operations in one place. It connects students, employees, teachers and administrators through a centralized system.",
    whyBuilt:
      "Education organizations often juggle multiple disconnected tools for admin, HR, and communication. This platform was built to bring those operations into one place.",
    whatItDoes: [
      "Student management",
      "Employee management",
      "Attendance tracking",
      "Courses and programs",
      "Communication tools",
      "Payments",
      "Administrative operations",
      "Internal workflows",
    ],
    howItHelps:
      "Instead of managing different processes across multiple tools, organizations can manage their daily operations through one centralized platform.",
    image: "/projects/teachgrow.jpg",
    tech: ["Next.js", "TypeScript", "Supabase", "TailwindCSS", "Node.js"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#00E5FF",
    featured: true,
  },
  {
    id: 3,
    slug: "portfolio-ai-assistant",
    category: "AI Assistant",
    title: "Portfolio AI Assistant",
    description:
      "Intelligent chatbot assistant embedded in portfolio websites using RAG architecture, trained on personal data to answer visitor questions naturally.",
    tagline: "An AI assistant that can be added to a website to answer visitor questions automatically.",
    whatItIs:
      "An AI assistant that can be added to a website to answer questions automatically. It can be trained on a person's or company's own information, so visitors get useful answers without waiting for a human.",
    whyBuilt:
      "To help visitors get instant answers about a person or business, instead of searching through a whole website manually.",
    whatItDoes: [
      "Answers visitor questions in natural language",
      "Understands context from the conversation",
      "Uses specific, pre-loaded information to answer accurately",
      "Can be embedded directly into any website",
      "Available to visitors any time, day or night",
    ],
    howItHelps:
      "Gives visitors instant, relevant answers and reduces the need for someone to be available to respond manually.",
    image: "/projects/ai-assistant.jpg",
    tech: ["Python", "LangChain", "FAISS", "OpenAI", "FastAPI", "React"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#A855F7",
    featured: true,
  },
  {
    id: 4,
    slug: "ai-voice-calling-system",
    category: "AI Communication",
    title: "AI Voice Calling System",
    description:
      "Automated voice calling system using AI for sales and customer support, with real-time speech synthesis, intent detection and CRM integration.",
    tagline: "An AI-powered system that automates voice conversations between a business and its customers.",
    whatItIs:
      "An AI-powered communication system designed to automate voice-based interactions between a business and its customers.",
    whyBuilt:
      "To help businesses handle sales and support calls without needing a person on the line for every single conversation.",
    whatItDoes: [
      "Places and receives automated voice calls",
      "Understands what the caller is asking for",
      "Responds naturally using AI-generated speech",
      "Recognizes customer intent and routes accordingly",
      "Connects with existing CRM systems",
    ],
    howItHelps:
      "Helps businesses automate repetitive phone conversations while still giving customers a natural, conversational experience.",
    image: "/projects/voice.jpg",
    tech: ["Python", "Twilio", "OpenAI", "FastAPI", "PostgreSQL"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#F59E0B",
    featured: false,
  },
  {
    id: 5,
    slug: "heart-disease-prediction",
    category: "Healthcare · Machine Learning",
    title: "Heart Disease Prediction",
    description:
      "ML model achieving 95% accuracy in predicting heart disease risk using ensemble methods and feature engineering on clinical patient data.",
    tagline: "A tool that analyzes patient health data to estimate the risk of heart disease.",
    whatItIs:
      "A machine learning tool that looks at a patient's health information and estimates their risk of heart disease.",
    whyBuilt:
      "Early risk detection can help doctors and patients act sooner. This was built to explore how machine learning can support that process.",
    whatItDoes: [
      "Takes in patient health data",
      "Analyzes patterns linked to heart disease risk",
      "Estimates risk with high accuracy",
      "Presents results through a simple interface",
    ],
    howItHelps:
      "Could support healthcare providers by flagging higher-risk patients earlier, so they can be prioritized for further review.",
    image: "/projects/health.jpg",
    tech: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Streamlit"],
    github: "https://github.com/NithinkumarU",
    live: "#",
    color: "#EF4444",
    featured: false,
  },
  {
    id: 6,
    slug: "llm-chatbot-framework",
    category: "AI Framework",
    title: "LLM Chatbot Framework",
    description:
      "Multi-modal chatbot framework supporting text, voice and image inputs with memory persistence, tool use, and custom knowledge base integration.",
    tagline: "A flexible chatbot foundation that businesses can build on to create their own AI assistants.",
    whatItIs:
      "A flexible framework for building AI chatbots that can understand text, voice, and images — not just plain text conversations.",
    whyBuilt:
      "Most chatbots are limited to text. This was built to give a chatbot a more complete, human-like way of understanding requests.",
    whatItDoes: [
      "Understands text, voice, and image input",
      "Remembers context across a conversation",
      "Can use external tools to complete tasks",
      "Connects to a custom knowledge base",
      "Works in real time",
    ],
    howItHelps:
      "Gives businesses a foundation for building richer AI assistants than a standard text-only chatbot.",
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
