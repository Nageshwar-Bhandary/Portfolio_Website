import { useState, useEffect } from "react";
import { usePortfolio, Project, CareerItem, ExperienceItem } from "../../context/PortfolioContext";
import "../styles/AdminDashboard.css";

type AdminDashboardProps = {
  show: boolean;
  onClose: () => void;
};

const AdminDashboard = ({ show, onClose }: AdminDashboardProps) => {
  const {
    name,
    phone,
    roles,
    aboutMe,
    githubUrl,
    linkedinUrl,
    instagramUrl,
    projects,
    career,
    achievements,
    skills,
    experiences,
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
    messages,
    deleteMessage,
  } = usePortfolio();

  const handleClose = () => {
    logout();
    onClose();
  };

  // Close and lock on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (show) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [show]);

  // Tab State
  const [activeTab, setActiveTab] = useState<"general" | "about" | "experience" | "projects" | "career" | "achievements" | "skills" | "messages">("general");

  // Login credentials state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Edit sub-states
  const [editName, setEditName] = useState(name);
  const [editPhone, setEditPhone] = useState(phone);
  const [editRoles, setEditRoles] = useState(roles.join(", "));
  const [editAbout, setEditAbout] = useState(aboutMe);
  const [editGithub, setEditGithub] = useState(githubUrl);
  const [editLinkedin, setEditLinkedin] = useState(linkedinUrl);
  const [editInstagram, setEditInstagram] = useState(instagramUrl);

  // Project Forms state
  const [editingProjectIdx, setEditingProjectIdx] = useState<number | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTools, setProjectTools] = useState("");
  const [projectVideoUrl, setProjectVideoUrl] = useState("");
  const [projectGithubUrl, setProjectGithubUrl] = useState("");
  const [projectDemoUrl, setProjectDemoUrl] = useState("");

  // Career Forms state
  const [editingCareerIdx, setEditingCareerIdx] = useState<number | null>(null);
  const [isAddingCareer, setIsAddingCareer] = useState(false);
  const [careerTitle, setCareerTitle] = useState("");
  const [careerSubtitle, setCareerSubtitle] = useState("");
  const [careerDate, setCareerDate] = useState("");
  const [careerDescription, setCareerDescription] = useState("");

  // Achievements Form state
  const [editingAchievementIdx, setEditingAchievementIdx] = useState<number | null>(null);
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState("");

  // Skills input state
  const [newSkill, setNewSkill] = useState("");

  // Experience Forms state
  const [editingExperienceIdx, setEditingExperienceIdx] = useState<number | null>(null);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [expCompany, setExpCompany] = useState("");
  const [expRole, setExpRole] = useState("");
  const [expDate, setExpDate] = useState("");
  const [expDescription, setExpDescription] = useState("");
  const [expTechStack, setExpTechStack] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setLoginError("");
      setUsername("");
      setPassword("");
      // Sync local form states
      setEditName(name);
      setEditPhone(phone);
      setEditRoles(roles.join(", "));
      setEditAbout(aboutMe);
      setEditGithub(githubUrl);
      setEditLinkedin(linkedinUrl);
      setEditInstagram(instagramUrl);
    } else {
      setLoginError("Invalid username or password!");
    }
  };

  const handleSaveGeneral = () => {
    const rolesArray = editRoles.split(",").map((r) => r.trim()).filter((r) => r !== "");
    updateGeneralInfo(editName, editPhone, rolesArray);
    updateSocialLinks(editGithub, editLinkedin, editInstagram);
    alert("General settings saved successfully!");
  };

  const handleSaveAbout = () => {
    updateAboutMe(editAbout);
    alert("About settings saved successfully!");
  };

  // Projects CRUD handlers
  const handleStartAddProject = () => {
    setProjectTitle("");
    setProjectCategory("");
    setProjectDescription("");
    setProjectTools("");
    setProjectVideoUrl("");
    setProjectGithubUrl("");
    setProjectDemoUrl("");
    setIsAddingProject(true);
    setEditingProjectIdx(null);
  };

  const handleStartEditProject = (idx: number) => {
    const proj = projects[idx];
    setProjectTitle(proj.title);
    setProjectCategory(proj.category);
    setProjectDescription(proj.description);
    setProjectTools(proj.tools);
    setProjectVideoUrl(proj.videoUrl || "");
    setProjectGithubUrl(proj.githubUrl || "");
    setProjectDemoUrl(proj.demoUrl || "");
    setEditingProjectIdx(idx);
    setIsAddingProject(false);
  };

  const handleSaveProject = () => {
    if (!projectTitle.trim() || !projectCategory.trim() || !projectDescription.trim()) {
      alert("Please fill in all required fields!");
      return;
    }
    const projectData: Project = {
      title: projectTitle,
      category: projectCategory,
      description: projectDescription,
      tools: projectTools,
      videoUrl: projectVideoUrl.trim() || undefined,
      githubUrl: projectGithubUrl.trim() || undefined,
      demoUrl: projectDemoUrl.trim() || undefined,
    };

    if (editingProjectIdx !== null) {
      editProject(editingProjectIdx, projectData);
      setEditingProjectIdx(null);
    } else {
      addProject(projectData);
      setIsAddingProject(false);
    }
  };

  // Career/Education CRUD handlers
  const handleStartAddCareer = () => {
    setCareerTitle("");
    setCareerSubtitle("");
    setCareerDate("");
    setCareerDescription("");
    setIsAddingCareer(true);
    setEditingCareerIdx(null);
  };

  const handleStartEditCareer = (idx: number) => {
    const item = career[idx];
    setCareerTitle(item.title);
    setCareerSubtitle(item.subtitle);
    setCareerDate(item.date);
    setCareerDescription(item.description);
    setEditingCareerIdx(idx);
    setIsAddingCareer(false);
  };

  const handleSaveCareer = () => {
    if (!careerTitle.trim() || !careerSubtitle.trim() || !careerDate.trim()) {
      alert("Please fill in all required fields!");
      return;
    }
    const itemData: CareerItem = {
      title: careerTitle,
      subtitle: careerSubtitle,
      date: careerDate,
      description: careerDescription,
    };

    if (editingCareerIdx !== null) {
      editCareerItem(editingCareerIdx, itemData);
      setEditingCareerIdx(null);
    } else {
      addCareerItem(itemData);
      setIsAddingCareer(false);
    }
  };

  // Achievements CRUD handlers
  const handleStartAddAchievement = () => {
    setAchievementText("");
    setIsAddingAchievement(true);
    setEditingAchievementIdx(null);
  };

  const handleStartEditAchievement = (idx: number) => {
    setAchievementText(achievements[idx]);
    setEditingAchievementIdx(idx);
    setIsAddingAchievement(false);
  };

  const handleSaveAchievement = () => {
    if (!achievementText.trim()) {
      alert("Please enter the achievement text!");
      return;
    }

    if (editingAchievementIdx !== null) {
      editAchievement(editingAchievementIdx, achievementText);
      setEditingAchievementIdx(null);
    } else {
      addAchievement(achievementText);
      setIsAddingAchievement(false);
    }
  };

  // Skills handlers
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      updateSkills(updated);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    updateSkills(updated);
  };

  // Experience CRUD handlers
  const handleStartAddExperience = () => {
    setExpCompany("");
    setExpRole("");
    setExpDate("");
    setExpDescription("");
    setExpTechStack("");
    setIsAddingExperience(true);
    setEditingExperienceIdx(null);
  };

  const handleStartEditExperience = (idx: number) => {
    const exp = experiences[idx];
    setExpCompany(exp.company);
    setExpRole(exp.role);
    setExpDate(exp.date);
    setExpDescription(exp.description);
    setExpTechStack(exp.techStack);
    setEditingExperienceIdx(idx);
    setIsAddingExperience(false);
  };

  const handleSaveExperience = () => {
    if (!expCompany.trim() || !expRole.trim() || !expDate.trim() || !expDescription.trim()) {
      alert("Please fill in all required fields!");
      return;
    }
    const itemData: ExperienceItem = {
      company: expCompany,
      role: expRole,
      date: expDate,
      description: expDescription,
      techStack: expTechStack,
    };

    if (editingExperienceIdx !== null) {
      editExperienceItem(editingExperienceIdx, itemData);
      setEditingExperienceIdx(null);
    } else {
      addExperienceItem(itemData);
      setIsAddingExperience(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className={`admin-modal-overlay ${show ? "show" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="admin-modal-container">
        <div className="admin-modal-header">
          <h2>Portfolio Administration</h2>
          <button className="admin-close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        {!isAdmin ? (
          /* Login Form */
          <form onSubmit={handleLogin} className="admin-login-body">
            <h3>Login to Admin Dashboard</h3>
            <p style={{ opacity: 0.6, fontSize: "13px", marginBottom: "25px" }}>
              Log in to dynamically edit text, add/delete projects, education, and skills.
            </p>
            {loginError && <div className="admin-error-msg">{loginError}</div>}
            <div className="admin-form-group">
              <label>Username</label>
              <input
                type="password"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="admin-btn">
              Authenticate
            </button>
          </form>
        ) : (
          /* Logged In Dashboard Layout */
          <div className="admin-dashboard-layout">
            <div className="admin-sidebar">
              <button
                className={`admin-sidebar-tab ${activeTab === "general" ? "active" : ""}`}
                onClick={() => setActiveTab("general")}
              >
                General Info
              </button>
              <button
                className={`admin-sidebar-tab ${activeTab === "about" ? "active" : ""}`}
                onClick={() => setActiveTab("about")}
              >
                About Me
              </button>
              <button
                className={`admin-sidebar-tab ${activeTab === "experience" ? "active" : ""}`}
                onClick={() => setActiveTab("experience")}
              >
                Experience
              </button>
              <button
                className={`admin-sidebar-tab ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                Work & Projects
              </button>
              <button
                className={`admin-sidebar-tab ${activeTab === "career" ? "active" : ""}`}
                onClick={() => setActiveTab("career")}
              >
                Education
              </button>
              <button
                className={`admin-sidebar-tab ${activeTab === "achievements" ? "active" : ""}`}
                onClick={() => setActiveTab("achievements")}
              >
                Achievements
              </button>
              <button
                className={`admin-sidebar-tab ${activeTab === "skills" ? "active" : ""}`}
                onClick={() => setActiveTab("skills")}
              >
                Tech Skills
              </button>
              <button
                className={`admin-sidebar-tab ${activeTab === "messages" ? "active" : ""}`}
                onClick={() => setActiveTab("messages")}
                style={{ borderLeft: "2px solid var(--accentColor)" }}
              >
                Messages ({messages ? messages.length : 0})
              </button>
              <button
                style={{ marginTop: "auto", color: "#ff5f5f" }}
                className="admin-sidebar-tab"
                onClick={logout}
              >
                Logout Admin
              </button>
            </div>

            <div className="admin-content-area">
              {/* Tab 1: General Settings */}
              {activeTab === "general" && (
                <div>
                  <h3>General Profile Details</h3>
                  <div className="admin-form-group">
                    <label>Full Display Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Contact Phone Number</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Expertise Roles (comma separated)</label>
                    <input
                      type="text"
                      value={editRoles}
                      onChange={(e) => setEditRoles(e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>GitHub URL</label>
                    <input
                      type="text"
                      value={editGithub}
                      onChange={(e) => setEditGithub(e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>LinkedIn URL</label>
                    <input
                      type="text"
                      value={editLinkedin}
                      onChange={(e) => setEditLinkedin(e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Instagram URL</label>
                    <input
                      type="text"
                      value={editInstagram}
                      onChange={(e) => setEditInstagram(e.target.value)}
                    />
                  </div>
                  <button onClick={handleSaveGeneral} className="admin-btn">
                    Save General Settings
                  </button>
                </div>
              )}

              {/* Tab 2: About settings */}
              {activeTab === "about" && (
                <div>
                  <h3>Edit 'About Me' Summary</h3>
                  <div className="admin-form-group">
                    <label>About Paragraph Text</label>
                    <textarea
                      rows={8}
                      value={editAbout}
                      onChange={(e) => setEditAbout(e.target.value)}
                    />
                  </div>
                  <button onClick={handleSaveAbout} className="admin-btn">
                    Save About Info
                  </button>
                </div>
              )}

              {/* Tab 7: Experience settings */}
              {activeTab === "experience" && (
                <div>
                  {isAddingExperience || editingExperienceIdx !== null ? (
                    // Add/Edit Experience Form
                    <div className="admin-form-container">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                        <h3 style={{ margin: 0 }}>
                          {editingExperienceIdx !== null ? "Edit Experience Item" : "Add Experience Item"}
                        </h3>
                        <button
                          onClick={() => {
                            setIsAddingExperience(false);
                            setEditingExperienceIdx(null);
                          }}
                          className="admin-btn-secondary"
                          style={{ padding: "6px 12px", fontSize: "13px" }}
                        >
                          ← Go Back
                        </button>
                      </div>
                      <div className="admin-form-group">
                        <label>Company / Organization</label>
                        <input
                          type="text"
                          value={expCompany}
                          onChange={(e) => setExpCompany(e.target.value)}
                          placeholder="e.g. Zephyr Technologies"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Job Role / Title</label>
                        <input
                          type="text"
                          value={expRole}
                          onChange={(e) => setExpRole(e.target.value)}
                          placeholder="e.g. Full Stack Web Developer Intern"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Dates / Duration</label>
                        <input
                          type="text"
                          value={expDate}
                          onChange={(e) => setExpDate(e.target.value)}
                          placeholder="e.g. 29 June 2026 – 29 July 2026"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Role Details (bullet points separated by newlines)</label>
                        <textarea
                          rows={6}
                          value={expDescription}
                          onChange={(e) => setExpDescription(e.target.value)}
                          placeholder="Developed responsive web applications...&#10;Built multiple PHP applications..."
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Tech Stack Used (comma-separated or list)</label>
                        <input
                          type="text"
                          value={expTechStack}
                          onChange={(e) => setExpTechStack(e.target.value)}
                          placeholder="React, Node.js, PHP"
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={handleSaveExperience} className="admin-btn">
                          Confirm Save
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingExperience(false);
                            setEditingExperienceIdx(null);
                          }}
                          className="admin-btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Experience List View
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>Manage Work Experience</h3>
                        <button
                          onClick={handleStartAddExperience}
                          className="admin-btn"
                          style={{ padding: "8px 16px" }}
                        >
                          + Add Experience
                        </button>
                      </div>
                      {experiences.map((exp, idx) => (
                        <div className="admin-item-row" key={idx}>
                          <div className="admin-item-title">
                            <h5>{exp.role}</h5>
                            <p>
                              {exp.company} | <span style={{ opacity: 0.6 }}>{exp.date}</span>
                            </p>
                          </div>
                          <div className="admin-action-btns">
                            <button
                              onClick={() => handleStartEditExperience(idx)}
                              className="admin-mini-btn edit"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteExperienceItem(idx)}
                              className="admin-mini-btn delete"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Projects settings */}
              {activeTab === "projects" && (
                <div>
                  {isAddingProject || editingProjectIdx !== null ? (
                    // Add/Edit Project Form
                    <div className="admin-form-container">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                        <h3 style={{ margin: 0 }}>{editingProjectIdx !== null ? "Edit Project Details" : "Add New Project"}</h3>
                        <button
                          onClick={() => {
                            setIsAddingProject(false);
                            setEditingProjectIdx(null);
                          }}
                          className="admin-btn-secondary"
                          style={{ padding: "6px 12px", fontSize: "13px" }}
                        >
                          ← Go Back
                        </button>
                      </div>
                      <div className="admin-form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          value={projectTitle}
                          onChange={(e) => setProjectTitle(e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Category Label</label>
                        <input
                          type="text"
                          placeholder="e.g. Frontend Development"
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Project Description</label>
                        <textarea
                          rows={4}
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Tools & Tech Stack Used</label>
                        <input
                          type="text"
                          placeholder="e.g. Python, Scikit-learn, React"
                          value={projectTools}
                          onChange={(e) => setProjectTools(e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Project Video Path or URL (Place MP4s in /public/videos/ first)</label>
                        <input
                          type="text"
                          placeholder="e.g. /videos/my-video.mp4"
                          value={projectVideoUrl}
                          onChange={(e) => setProjectVideoUrl(e.target.value)}
                        />
                        <span style={{ fontSize: "11px", opacity: 0.5, marginTop: "4px", display: "block" }}>
                          Place your video files inside the <code>public/videos/</code> folder of your project, then enter the path above (e.g. <code>/videos/netsentinel.mp4</code>).
                        </span>
                      </div>
                      <div className="admin-form-group">
                        <label>GitHub Repository URL</label>
                        <input
                          type="text"
                          placeholder="e.g. https://github.com/username/project"
                          value={projectGithubUrl}
                          onChange={(e) => setProjectGithubUrl(e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Live Demo / Deployment URL</label>
                        <input
                          type="text"
                          placeholder="e.g. https://my-project-demo.com"
                          value={projectDemoUrl}
                          onChange={(e) => setProjectDemoUrl(e.target.value)}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={handleSaveProject} className="admin-btn">
                          Confirm Save
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingProject(false);
                            setEditingProjectIdx(null);
                          }}
                          className="admin-btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Projects List View
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>Manage Work Projects</h3>
                        <button onClick={handleStartAddProject} className="admin-btn" style={{ padding: "8px 16px" }}>
                          + Add Project
                        </button>
                      </div>
                      {projects.map((proj, idx) => (
                        <div className="admin-item-row" key={idx}>
                          <div className="admin-item-title">
                            <h5>{proj.title}</h5>
                            <p>{proj.category}</p>
                          </div>
                          <div className="admin-action-btns">
                            <button onClick={() => handleStartEditProject(idx)} className="admin-mini-btn edit">
                              Edit
                            </button>
                            <button onClick={() => deleteProject(idx)} className="admin-mini-btn delete">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Career settings */}
              {activeTab === "career" && (
                <div>
                  {isAddingCareer || editingCareerIdx !== null ? (
                    // Add/Edit Career Form
                    <div className="admin-form-container">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                        <h3 style={{ margin: 0 }}>{editingCareerIdx !== null ? "Edit Education Entry" : "Add Education Entry"}</h3>
                        <button
                          onClick={() => {
                            setIsAddingCareer(false);
                            setEditingCareerIdx(null);
                          }}
                          className="admin-btn-secondary"
                          style={{ padding: "6px 12px", fontSize: "13px" }}
                        >
                          ← Go Back
                        </button>
                      </div>
                      <div className="admin-form-group">
                        <label>Degree / Title</label>
                        <input
                          type="text"
                          value={careerTitle}
                          onChange={(e) => setCareerTitle(e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>School / Institution</label>
                        <input
                          type="text"
                          value={careerSubtitle}
                          onChange={(e) => setCareerSubtitle(e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Date Range / Completion Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2020 - 2024"
                          value={careerDate}
                          onChange={(e) => setCareerDate(e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Academic Description / GPA Info</label>
                        <textarea
                          rows={4}
                          value={careerDescription}
                          onChange={(e) => setCareerDescription(e.target.value)}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={handleSaveCareer} className="admin-btn">
                          Confirm Save
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingCareer(false);
                            setEditingCareerIdx(null);
                          }}
                          className="admin-btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Career List View
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>Education Settings</h3>
                        <button onClick={handleStartAddCareer} className="admin-btn" style={{ padding: "8px 16px" }}>
                          + Add Education
                        </button>
                      </div>
                      {career.map((item, idx) => (
                        <div className="admin-item-row" key={idx}>
                          <div className="admin-item-title">
                            <h5>{item.title}</h5>
                            <p>{item.subtitle} | {item.date}</p>
                          </div>
                          <div className="admin-action-btns">
                            <button onClick={() => handleStartEditCareer(idx)} className="admin-mini-btn edit">
                              Edit
                            </button>
                            <button onClick={() => deleteCareerItem(idx)} className="admin-mini-btn delete">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 5: Achievements settings */}
              {activeTab === "achievements" && (
                <div>
                  {isAddingAchievement || editingAchievementIdx !== null ? (
                    // Add/Edit Achievement Form
                    <div className="admin-form-container">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                        <h3 style={{ margin: 0 }}>{editingAchievementIdx !== null ? "Edit Key Achievement" : "Add Achievement Item"}</h3>
                        <button
                          onClick={() => {
                            setIsAddingAchievement(false);
                            setEditingAchievementIdx(null);
                          }}
                          className="admin-btn-secondary"
                          style={{ padding: "6px 12px", fontSize: "13px" }}
                        >
                          ← Go Back
                        </button>
                      </div>
                      <div className="admin-form-group">
                        <label>Achievement Description</label>
                        <textarea
                          rows={4}
                          value={achievementText}
                          onChange={(e) => setAchievementText(e.target.value)}
                          placeholder="e.g. Secured 3rd Place in Cybersiege 2026..."
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={handleSaveAchievement} className="admin-btn">
                          Confirm Save
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingAchievement(false);
                            setEditingAchievementIdx(null);
                          }}
                          className="admin-btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Achievements List View
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>Key Achievements</h3>
                        <button onClick={handleStartAddAchievement} className="admin-btn" style={{ padding: "8px 16px" }}>
                          + Add Achievement
                        </button>
                      </div>
                      {achievements.map((item, idx) => (
                        <div className="admin-item-row" key={idx}>
                          <div className="admin-item-title" style={{ maxWidth: "75%" }}>
                            <p style={{ color: "#fff", fontSize: "14px", lineHeight: "1.5" }}>{item}</p>
                          </div>
                          <div className="admin-action-btns">
                            <button onClick={() => handleStartEditAchievement(idx)} className="admin-mini-btn edit">
                              Edit
                            </button>
                            <button onClick={() => deleteAchievement(idx)} className="admin-mini-btn delete">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 6: Skills settings */}
              {activeTab === "skills" && (
                <div>
                  <h3>Interactive Skills Balls</h3>
                  <p style={{ opacity: 0.6, fontSize: "13px", marginBottom: "20px" }}>
                    Add or remove skills. The 3D bouncing balls in the viewport will dynamically sync with these values in real-time.
                  </p>
                  <div className="admin-skills-edit-container">
                    {skills.map((skill, idx) => (
                      <div className="admin-skill-pill-editable" key={idx}>
                        <span>{skill}</span>
                        <button className="admin-remove-skill-btn" onClick={() => handleRemoveSkill(skill)}>
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddSkill} className="admin-add-skill-form">
                    <input
                      type="text"
                      placeholder="Add a skill name..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button type="submit" className="admin-btn" style={{ padding: "8px 16px" }}>
                      Add
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 8: Messages settings */}
              {activeTab === "messages" && (
                <div>
                  <h3>Messages Received ({messages ? messages.length : 0})</h3>
                  <p style={{ opacity: 0.6, fontSize: "13px", marginBottom: "20px" }}>
                    Queries submitted by visitors through the contact form.
                  </p>

                  {!messages || messages.length === 0 ? (
                    <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.5, border: "1px dashed rgba(255, 255, 255, 0.15)", borderRadius: "12px" }}>
                      No messages received yet.
                    </div>
                  ) : (
                    <div className="admin-messages-list" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {messages.map((msg, idx) => (
                        <div className="admin-message-card" key={idx} style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(194, 164, 255, 0.12)", borderRadius: "12px", padding: "18px" }}>
                          <div className="admin-message-header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "10px", marginBottom: "12px" }}>
                            <div>
                              <strong style={{ color: "#fff", fontSize: "15px" }}>{msg.name}</strong>
                              <span style={{ margin: "0 8px", opacity: 0.4 }}>|</span>
                              <a href={`mailto:${msg.email}`} style={{ color: "var(--accentColor)", textDecoration: "none", fontSize: "14px" }}>
                                {msg.email}
                              </a>
                            </div>
                            <span style={{ opacity: 0.5, fontSize: "12px" }}>{msg.timestamp}</span>
                          </div>
                          <p style={{ color: "#eae5ec", fontSize: "14px", lineHeight: "1.6", margin: 0, whiteSpace: "pre-wrap" }}>
                            {msg.query}
                          </p>
                          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                            <button
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this message?")) {
                                  deleteMessage(idx);
                                }
                              }}
                              className="admin-mini-btn delete"
                              style={{ padding: "6px 12px", fontSize: "12px" }}
                            >
                              Delete Message
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
