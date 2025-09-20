export const portfolioData = {
  about: {
    name: "Prince Kumar",
    title: "Mechanical Engineering Student & Full-Stack Developer",
    description:
      "Aspiring Mechanical Engineer at NIT Jalandhar with a passion for full-stack development, data analytics, and machine learning. Seeking internship opportunities to apply technical skills in real-world challenges.",
  },
  education: [
    {
      degree: "B.Tech in Mechanical Engineering",
      institution: "National Institute of Technology, Jalandhar",
      duration: "2023–2027",
      cgpa: "7.37",
    },
  ],
  projects: [
    {
      title: "Live Chat App",
      year: "2024",
      tech: ["React.js", "Node.js", "Express.js", "Socket.io", "Tailwind CSS", "DaisyUI"],
      description:
        "Real-time messaging app with responsive UI and scalable backend.",
    },
    {
      title: "RAG-based Medical Chatbot",
      year: "2024",
      tech: ["LangChain", "Pinecone", "Google GenAI", "HuggingFace Embeddings"],
      description:
        "Retrieval-Augmented Generation chatbot for accurate medical query responses.",
    },
  ],
  skills: {
    technical: ["C/C++", "Python", "JavaScript", "ReactJs", "NextJs", "NodeJs", "Express", "MongoDB", "MySQL", "Pinecone"],
    tools: ["VS Code", "Jupyter", "Google Colab"],
    soft: ["Communication", "Collaboration", "Presentation", "Self-learning"],
    interests: ["Data Analytics", "Machine Learning", "Front-end & Back-end Development"],
  },
  achievements: [
    {
      title: "Hackflash – NIT Jalandhar",
      year: "2025",
      description: "Ranked 1st in a 3-hour rapid development challenge.",
    },
    {
      title: "Hackathon – NIT Jalandhar",
      year: "2025",
      description:
        "Selected for national-level 36-hour hackathon. Built end-to-end solution with cross-institutional collaboration.",
    },
  ],
  contact: {
    phone: "+91-9837771886",
    email: "princekumar9837771886@gmail.com",
    collegeEmail: "princek.me.23@nitj.ac.in",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
} as const;
