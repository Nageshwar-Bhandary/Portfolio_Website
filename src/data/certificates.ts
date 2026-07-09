export type Certificate = {
  title: string;
  organization: string;
  issueYear: string;
  issueDate: string;
  credentialId?: string;
  skillsLearned: string[];
  description: string;
  technologies: string[];
  imageUrl: string;
  images?: string[];
  credentialUrl?: string;
};

export const certificates: Certificate[] = [
  {
    title: "3rd Place (2nd Runner-Up) - Cybersiege 2026",
    organization: "Alva's Institute of Engineering & Technology",
    issueYear: "2026",
    issueDate: "30–31 March 2026",
    credentialId: "",
    skillsLearned: [
      "Capture The Flag (CTF) Problem Solving",
      "Vulnerability Identification & Exploitation",
      "Network Protocol Forensics",
      "Collaborative Attack & Defense Strategy"
    ],
    description: "Secured 3rd Place (2nd Runner-Up) in Cybersiege 2026, an intense 24-hour Capture The Flag (CTF) cybersecurity competition organized by the CYNEX – The ICB Forum under the Dept. of CSE (IoT, CyberSecurity including Blockchain). Competed against numerous academic teams, solving complex challenges across domains including cryptography, reverse engineering, web exploitation, and digital forensics. Demonstrated quick analytical reasoning, threat modeling, and team collaboration under high pressure.",
    technologies: ["Cryptography", "Web Exploitation", "Reverse Engineering", "Wireshark", "Linux Forensics"],
    imageUrl: "/certificates/cert1-cybersiege.jpg",
    credentialUrl: ""
  },
  {
    title: "Internet Crimes and Cyber Security",
    organization: "NPTEL | IIT Madras",
    issueYear: "2026",
    issueDate: "Feb–Apr 2026 (8 week course)",
    credentialId: "NPTEL26LW01S160500218",
    skillsLearned: [
      "Cyber Threat Analysis",
      "Online Crime & Fraud Investigation",
      "Network Infrastructure Security",
      "Cyber Laws & Legal Frameworks"
    ],
    description: "Achieved Elite certification with a consolidated score of 90% (Online Assignments: 25/25, Proctored Exam: 64.5/75). Completed the comprehensive NPTEL certification course focusing on Internet Crimes and Cyber Security from Indian Institute of Technology Madras. Obtained deep foundational knowledge of modern cyber threats, mechanisms of online scams, network-level security architectures, and legal mitigation procedures. Among 2608 certified candidates. Recommended 3 credits.",
    technologies: ["Network Security", "Cyber Law", "IDS/IPS", "Incident Response", "Information Security"],
    imageUrl: "/certificates/cert2-nptel-internet-crimes.png",
    credentialUrl: ""
  },
  {
    title: "Systems and Usable Security",
    organization: "NPTEL | IIT Indore",
    issueYear: "2025",
    issueDate: "Jan–Feb 2025 (4 week course)",
    credentialId: "NPTEL25CS68S337200099",
    skillsLearned: [
      "System Security Principles",
      "User-Centric Security Interface Design",
      "Access Control & Authentication Mechanisms",
      "Threat Modeling & Secure System Architecture"
    ],
    description: "Achieved Elite certification with a consolidated score of 64% (Online Assignments: 23.08/25, Proctored Exam: 41.25/75). Successfully certified in the NPTEL Systems and Usable Security curriculum from Indian Institute of Technology Indore. Gained thorough understanding of the critical intersection between system security enforcement and user usability. Among 794 certified candidates. Recommended 1–2 credits.",
    technologies: ["System Security", "Identity & Access Management", "Threat Modeling", "Usability Engineering"],
    imageUrl: "/certificates/cert3-nptel-systems-security.png",
    credentialUrl: ""
  },
  {
    title: "AINNOVATION 2025: Microsoft Learning Challenges",
    organization: "Microsoft",
    issueYear: "2025",
    issueDate: "January - August 2025",
    credentialId: "MS-AINNOV-2025-48",
    skillsLearned: [
      "Cloud Infrastructure Administration",
      "Azure Cognitive Services Integration",
      "Artificial Intelligence Resource Deployment",
      "Cloud Security & Compliance Fundamentals"
    ],
    description: "Successfully completed three major learning challenges under Microsoft's AINNOVATION 2025 initiative, including the Microsoft AI Learning Challenge, Applied AI Learning Challenge, and Microsoft Azure Learning Challenge. Gained comprehensive knowledge and hands-on experience in cloud infrastructure administration, Azure Cognitive Services, OpenAI integrations, and cloud security compliance.",
    technologies: ["Microsoft Azure", "Azure OpenAI", "Cloud Computing", "AI Services", "Cloud Security"],
    imageUrl: "/certificates/cert_microsoft_ai.png",
    images: [
      "/certificates/cert_microsoft_ai.png",
      "/certificates/cert_microsoft_applied_ai.png",
      "/certificates/cert_microsoft_azure.png"
    ],
    credentialUrl: ""
  },
  {
    title: "Hackfest 26' - CTF Participation",
    organization: "NMAM Institute of Technology | NITTE University",
    issueYear: "2026",
    issueDate: "18–19 April 2026",
    credentialId: "",
    skillsLearned: [
      "Critical Thinking & Problem Solving",
      "Team Collaboration Under Pressure",
      "Creative Technical Solutions",
      "Capture The Flag (CTF) Challenges"
    ],
    description: "Participated in the 10-hour Capture The Flag Event during Hackfest 26' organized by NMAM Institute of Technology (NITTE University). Showcased the ability to think critically, work effectively in a team, and come up with creative and technical solutions within a limited timeframe. Coordinated by Dr. Shashank Shetty, Dr. Puneeth R P, and Dr. Niranjan N. Chiplunkar (Principal).",
    technologies: ["CTF Challenges", "Cybersecurity", "Team Collaboration", "Problem Solving", "Linux"],
    imageUrl: "/certificates/cert5-hackfest-ctf.jpg",
    credentialUrl: ""
  },
  {
    title: "Hashgraph Developer Course",
    organization: "The Hashgraph Association | Hedera",
    issueYear: "2025",
    issueDate: "14 October 2025",
    credentialId: "",
    skillsLearned: [
      "Distributed Ledger Technology (DLT)",
      "Hedera Network Architecture & Consensus",
      "Smart Contract Development on Hedera",
      "Decentralized Application (dApp) Development"
    ],
    description: "Completed the Hashgraph Developer Course by The Hashgraph Association, built on Hedera. Gained hands-on knowledge in developing decentralized applications using the Hedera Hashgraph distributed ledger platform. Studied the unique DAG-based consensus mechanism, token services, smart contracts, and practical dApp deployment workflows on the Hedera network.",
    technologies: ["Hedera Hashgraph", "DLT", "Smart Contracts", "Blockchain", "dApp Development"],
    imageUrl: "/certificates/cert6-hashgraph-developer.png",
    credentialUrl: ""
  }
];
