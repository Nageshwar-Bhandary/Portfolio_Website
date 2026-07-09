import { createContext, useContext, useState, ReactNode } from "react";

export type Project = {
  title: string;
  category: string;
  description: string;
  tools: string;
  image?: string;
  videoUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
};

export type CareerItem = {
  title: string;
  subtitle: string;
  date: string;
  description: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  date: string;
  description: string;
  techStack: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  query: string;
  timestamp: string;
};

type PortfolioContextType = {
  name: string;
  roles: string[];
  aboutMe: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  projects: Project[];
  career: CareerItem[];
  achievements: string[];
  skills: string[];
  experiences: ExperienceItem[];
  messages: ContactMessage[];
  isAdmin: boolean;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
  updateGeneralInfo: (name: string, phone: string, roles: string[]) => void;
  updateSocialLinks: (github: string, linkedin: string, instagram: string) => void;
  updateAboutMe: (text: string) => void;
  addProject: (project: Project) => void;
  editProject: (index: number, project: Project) => void;
  deleteProject: (index: number) => void;
  addCareerItem: (item: CareerItem) => void;
  editCareerItem: (index: number, item: CareerItem) => void;
  deleteCareerItem: (index: number) => void;
  addAchievement: (text: string) => void;
  editAchievement: (index: number, text: string) => void;
  deleteAchievement: (index: number) => void;
  updateSkills: (skills: string[]) => void;
  addExperienceItem: (item: ExperienceItem) => void;
  editExperienceItem: (index: number, item: ExperienceItem) => void;
  deleteExperienceItem: (index: number) => void;
  addMessage: (msg: ContactMessage) => void;
  deleteMessage: (index: number) => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>(() => localStorage.getItem("portfolio_name") || "NAGESHWAR");
  const [phone, setPhone] = useState<string>(() => localStorage.getItem("portfolio_phone") || "6366046936");
  const [roles, setRoles] = useState<string[]>(() => {
    const saved = localStorage.getItem("portfolio_roles");
    return saved ? JSON.parse(saved) : ["Cybersecurity", "Developer"];
  });
  const [aboutMe, setAboutMe] = useState<string>(() => localStorage.getItem("portfolio_about") ||
    "Cybersecurity student with hands-on exposure to both offensive and defensive security, including digital forensics and secure system design. Interested in vulnerability assessment, threat detection, and applying security principles like OWASP Top 10 to real-world scenarios."
  );

  const [githubUrl, setGithubUrl] = useState<string>(() => {
    const saved = localStorage.getItem("portfolio_github");
    if (saved === "https://github.com" || !saved) {
      localStorage.setItem("portfolio_github", "https://github.com/Nageshwar-Bhandary");
      return "https://github.com/Nageshwar-Bhandary";
    }
    return saved;
  });
  const [linkedinUrl, setLinkedinUrl] = useState<string>(() => {
    const saved = localStorage.getItem("portfolio_linkedin");
    if (saved === "https://linkedin.com" || !saved) {
      localStorage.setItem("portfolio_linkedin", "https://www.linkedin.com/in/nageshwar-bhandary-7b86b6332");
      return "https://www.linkedin.com/in/nageshwar-bhandary-7b86b6332";
    }
    return saved;
  });
  const [instagramUrl, setInstagramUrl] = useState<string>(() => {
    const saved = localStorage.getItem("portfolio_instagram");
    if (saved === "https://instagram.com" || !saved) {
      localStorage.setItem("portfolio_instagram", "https://www.instagram.com/nagi_.27._");
      return "https://www.instagram.com/nagi_.27._";
    }
    return saved;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("portfolio_projects");
    const defaultProj = [
      {
        title: "NetSentinel: Automatic Real-Time Network Monitoring System",
        category: "Machine Learning & NLP",
        description: "Built an intelligent issue classification system using Machine Learning and NLP to automatically categorize technical support tickets based on issue descriptions. Developed predictive models for issue prioritization and workflow optimization, improving response efficiency and reducing manual intervention.",
        tools: "Python, Scikit-learn, Pandas, NumPy, NLP, Machine Learning",
        videoUrl: "/videos/project_1.mp4",
        githubUrl: "https://github.com/Nageshwar-Bhandary",
        demoUrl: "https://net-sentinel-26gc4item-nageshwar.vercel.app/"
      },
      {
        title: "CipherX - Auto Decryption System using Classical Cryptography",
        category: "Cybersecurity & Cryptography",
        description: "Developed a Python-based automated decryption system capable of detecting and decrypting encrypted text using classical cryptographic algorithms such as Caesar, Vigenère, and Substitution ciphers. Implemented pattern recognition and frequency analysis techniques to identify cipher types and improve decryption accuracy and efficiency.",
        tools: "Python, Classical Cryptography, Frequency Analysis, Pattern Matching",
        videoUrl: "/videos/project_2.mp4",
        githubUrl: "https://github.com/Nageshwar-Bhandary",
        demoUrl: "https://cipher-x-auto-decryption.vercel.app/"
      },
      {
        title: "NotesApp: Cloud-Based Real-Time Note Management System",
        category: "Full-Stack Web Development",
        description: "Engineered a responsive, full-stack application using React and Vite, integrating Firebase for secure user authentication, cloud storage, and real-time database synchronization.\nImplemented an advanced fuzzy search engine and dynamic tagging system with custom debouncing hooks, optimizing database read operations and accelerating data retrieval speeds.",
        tools: "React, JavaScript, Tailwind CSS, Firebase (Auth, Firestore), Fuse.js, Vite, Vitest",
        videoUrl: "/videos/project_3.mp4",
        githubUrl: "https://github.com/Nageshwar-Bhandary",
        demoUrl: "https://notes-app27.vercel.app/"
      }
    ];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean up: if the Microsoft project was added to parsed in localStorage, remove it
        let filtered = parsed.filter((p: any) => p.title !== "Microsoft AINNOVATION 2025 Learning Challenges");
        
        // Ensure NotesApp is added if missing
        const hasNotesApp = filtered.some((p: any) => p.title.startsWith("NotesApp") || p.title.includes("NotesApp"));
        if (!hasNotesApp) {
          filtered.push(defaultProj[2]);
        }

        // Migrate second project name if needed
        let updatedStorage = false;
        filtered = filtered.map((p: any) => {
          if (p.title === "Auto Decryption System using Classical Cryptography") {
            updatedStorage = true;
            return {
              ...p,
              title: "CipherX - Auto Decryption System using Classical Cryptography"
            };
          }
          return p;
        });

        // Ensure videoUrl, githubUrl, and demoUrl properties are migrated for default projects
        let updatedVideoUrls = false;
        filtered = filtered.map((p: any) => {
          const tLower = (p.title || "").toLowerCase();
          if (tLower.includes("sentinel") && (!p.videoUrl || !p.githubUrl || !p.demoUrl || p.demoUrl === "#")) {
            updatedVideoUrls = true;
            return { 
              ...p, 
              videoUrl: p.videoUrl || "/videos/project_1.mp4", 
              githubUrl: p.githubUrl || "https://github.com/Nageshwar-Bhandary", 
              demoUrl: "https://net-sentinel-26gc4item-nageshwar.vercel.app/" 
            };
          }
          if ((tLower.includes("cipher") || tLower.includes("decryption")) && (!p.videoUrl || !p.githubUrl || !p.demoUrl || p.demoUrl === "#")) {
            updatedVideoUrls = true;
            return { 
              ...p, 
              videoUrl: p.videoUrl || "/videos/project_2.mp4", 
              githubUrl: p.githubUrl || "https://github.com/Nageshwar-Bhandary", 
              demoUrl: "https://cipher-x-auto-decryption.vercel.app/" 
            };
          }
          if ((tLower.includes("notes") || tLower.includes("note")) && (!p.videoUrl || !p.githubUrl || !p.demoUrl || p.demoUrl === "#")) {
            updatedVideoUrls = true;
            return { 
              ...p, 
              videoUrl: p.videoUrl || "/videos/project_3.mp4", 
              githubUrl: p.githubUrl || "https://github.com/Nageshwar-Bhandary", 
              demoUrl: "https://notes-app27.vercel.app/" 
            };
          }
          return p;
        });

        if (filtered.length !== parsed.length || !hasNotesApp || updatedStorage || updatedVideoUrls) {
          localStorage.setItem("portfolio_projects", JSON.stringify(filtered));
          return filtered;
        }

        if (parsed.length === 1 && parsed[0].title === "Personal Portfolio Website") {
          localStorage.setItem("portfolio_projects", JSON.stringify(defaultProj));
          return defaultProj;
        }
        return filtered;
      } catch (e) {
        // Fallback
      }
    }
    localStorage.setItem("portfolio_projects", JSON.stringify(defaultProj));
    return defaultProj;
  });

  const [career, setCareer] = useState<CareerItem[]>(() => {
    const saved = localStorage.getItem("portfolio_career");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[0] && parsed[0].description.includes("CGPA of 7.5.")) {
          parsed[0].description = parsed[0].description.replace("CGPA of 7.5.", "CGPA of 7.78.");
          localStorage.setItem("portfolio_career", JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        title: "B.Tech in Computer Science (Cybersecurity)",
        subtitle: "NMAMIT | Nitte University",
        date: "PURSUING",
        description: "Pursuing a Bachelor of Technology degree focusing on offensive and defensive security, secure system design, and digital forensics. Currently maintaining a CGPA of 7.78."
      },
      {
        title: "Pre University",
        subtitle: "Janatha Independent PU College",
        date: "2023",
        description: "Completed Pre-University course under the Karnataka Board, achieving an outstanding CGPA of 9.54."
      }
    ];
  });

  const [achievements, setAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem("portfolio_achievements");
    return saved ? JSON.parse(saved) : [
      "Secured 3rd Place (2nd Runner-Up) in Cybersiege 2026, a 24-hour Capture The Flag (CTF) cybersecurity competition conducted by Alva's Institute of Engineering & Technology.",
      "Completed NPTEL certification course on Internet Crimes and Cyber Security, gaining foundational knowledge in cyber threats, online crime investigation, network security, and cybersecurity best practices.",
      "Completed NPTEL certification course on Systems and Usable Security, gaining foundational knowledge in system security principles and user-centric security design.",
      "Completed AINNOVATION 2025: Microsoft Azure Learning Challenge, gaining practical knowledge in Cloud Computing (Azure) and Artificial Intelligence (AI) through Microsoft's learning initiatives."
    ];
  });

  const [skills, setSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem("portfolio_skills");
    return saved ? JSON.parse(saved) : [
      "Python",
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "API",
      "Problem-Solving",
      "Communication & Team Collaboration",
      "OWASP Top 10 (basic)",
      "SQL Injection",
      "XSS",
      "Fundamentals",
      "CTF-based Problem Solving"
    ];
  });

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem("portfolio_experiences");
    return saved ? JSON.parse(saved) : [
      {
        company: "Mangalore Refinery and Petrochemicals Limited (MRPL)",
        role: "Web Development Intern",
        date: "2 July 2026 - 31 july 2026",
        description: "Collaborated with a student team to design and develop web applications during the internship.\nContributed to frontend development, UI implementation, and website functionality.\nWorked in an agile, team-based environment to deliver project milestones.\nStrengthened practical experience in web development and collaborative software development.",
        techStack: "HTML • CSS • JavaScript • React"
      },
      {
        company: "Zephyr Technologies & Solutions Pvt Ltd (Hybrid)",
        role: "Full Stack Web Developer Intern",
        date: "29 June 2026 – 29July 2026",
        description: "Developed responsive web applications using modern full-stack technologies.\nBuilt multiple projects, including personal portfolio websites, PHP applications, and MERN stack applications.\nCollaborated with mentors and team members in a hybrid development environment.\nImproved frontend responsiveness and backend integration through practical project work.",
        techStack: "React • Node.js • Express.js • MongoDB • PHP • JavaScript • HTML • CSS"
      }
    ];
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("portfolio_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem("portfolio_is_admin") === "true";
  });

  const login = (username: string, pass: string): boolean => {
    const trimmedUser = (username || "").trim().toLowerCase();
    const trimmedPass = (pass || "").trim();
    if (trimmedUser === "admin" && trimmedPass === "Admin@172723") {
      setIsAdmin(true);
      sessionStorage.setItem("portfolio_is_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("portfolio_is_admin");
  };

  const updateGeneralInfo = (newName: string, newPhone: string, newRoles: string[]) => {
    setName(newName);
    setPhone(newPhone);
    setRoles(newRoles);
    localStorage.setItem("portfolio_name", newName);
    localStorage.setItem("portfolio_phone", newPhone);
    localStorage.setItem("portfolio_roles", JSON.stringify(newRoles));
  };

  const updateSocialLinks = (newGithub: string, newLinkedin: string, newInstagram: string) => {
    setGithubUrl(newGithub);
    setLinkedinUrl(newLinkedin);
    setInstagramUrl(newInstagram);
    localStorage.setItem("portfolio_github", newGithub);
    localStorage.setItem("portfolio_linkedin", newLinkedin);
    localStorage.setItem("portfolio_instagram", newInstagram);
  };

  const updateAboutMe = (text: string) => {
    setAboutMe(text);
    localStorage.setItem("portfolio_about", text);
  };

  const addProject = (project: Project) => {
    const updated = [...projects, project];
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  const editProject = (index: number, project: Project) => {
    const updated = [...projects];
    updated[index] = project;
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  const deleteProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  const addCareerItem = (item: CareerItem) => {
    const updated = [...career, item];
    setCareer(updated);
    localStorage.setItem("portfolio_career", JSON.stringify(updated));
  };

  const editCareerItem = (index: number, item: CareerItem) => {
    const updated = [...career];
    updated[index] = item;
    setCareer(updated);
    localStorage.setItem("portfolio_career", JSON.stringify(updated));
  };

  const deleteCareerItem = (index: number) => {
    const updated = career.filter((_, i) => i !== index);
    setCareer(updated);
    localStorage.setItem("portfolio_career", JSON.stringify(updated));
  };

  const addAchievement = (text: string) => {
    const updated = [...achievements, text];
    setAchievements(updated);
    localStorage.setItem("portfolio_achievements", JSON.stringify(updated));
  };

  const editAchievement = (index: number, text: string) => {
    const updated = [...achievements];
    updated[index] = text;
    setAchievements(updated);
    localStorage.setItem("portfolio_achievements", JSON.stringify(updated));
  };

  const deleteAchievement = (index: number) => {
    const updated = achievements.filter((_, i) => i !== index);
    setAchievements(updated);
    localStorage.setItem("portfolio_achievements", JSON.stringify(updated));
  };

  const updateSkills = (updatedSkills: string[]) => {
    setSkills(updatedSkills);
    localStorage.setItem("portfolio_skills", JSON.stringify(updatedSkills));
  };

  const addExperienceItem = (item: ExperienceItem) => {
    const updated = [...experiences, item];
    setExperiences(updated);
    localStorage.setItem("portfolio_experiences", JSON.stringify(updated));
  };

  const editExperienceItem = (index: number, item: ExperienceItem) => {
    const updated = [...experiences];
    updated[index] = item;
    setExperiences(updated);
    localStorage.setItem("portfolio_experiences", JSON.stringify(updated));
  };

  const deleteExperienceItem = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    localStorage.setItem("portfolio_experiences", JSON.stringify(updated));
  };

  const addMessage = (msg: ContactMessage) => {
    const updated = [msg, ...messages];
    setMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
  };

  const deleteMessage = (index: number) => {
    const updated = messages.filter((_, i) => i !== index);
    setMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
  };

  return (
    <PortfolioContext.Provider
      value={{
        name,
        roles,
        aboutMe,
        phone,
        githubUrl,
        linkedinUrl,
        instagramUrl,
        projects,
        career,
        achievements,
        skills,
        experiences,
        messages,
        isAdmin,
        login,
        logout,
        updateGeneralInfo,
        updateSocialLinks,
        updateAboutMe,
        addProject,
        editProject,
        deleteProject,
        addCareerItem,
        editCareerItem,
        deleteCareerItem,
        addAchievement,
        editAchievement,
        deleteAchievement,
        updateSkills,
        addExperienceItem,
        editExperienceItem,
        deleteExperienceItem,
        addMessage,
        deleteMessage,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
