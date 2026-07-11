import { useState, useEffect } from "react";
import { TbDownload, TbX, TbArrowLeft } from "react-icons/tb";
import "./styles/Resume.css";

const resumes = [
  {
    id: "1Page",
    title: "One Page Resume",
    description: "Professional one-page resume for recruiters.",
    fileUrl: "/Nageshwar_Resume_1Page.pdf",
    fileName: "Nageshwar_Resume_1Page.pdf",
  },
  {
    id: "2Page",
    title: "Two Page Resume",
    description: "Detailed resume with projects, internships, achievements, and technical skills.",
    fileUrl: "/Nageshwar_Resume_2Page.pdf",
    fileName: "Nageshwar_Resume_2Page.pdf",
  }
];

const Resume = () => {
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedResume(null);
      }
    };
    if (selectedResume) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedResume]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedResume(null);
    }
  };

  const activeResumeData = resumes.find(r => r.id === selectedResume);

  return (
    <div className="resume-section" id="resume">
      <div className="resume-container section-container">
        <h2>
          My <span>Resume</span>
        </h2>
        
        <div className="resume-grid">
          {resumes.map((resume) => (
            <div 
              className="resume-card" 
              key={resume.id}
            >
              <div className="resume-image-wrapper" style={{ overflow: 'hidden', position: 'relative' }}>
                <iframe 
                  src={`${resume.fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  style={{
                    position: "absolute",
                    top: "-50px", // hide toolbar if it shows up
                    left: 0,
                    width: "100%", 
                    height: "200%", // stretch to avoid scrollbars
                    border: "none", 
                    pointerEvents: "none",
                    userSelect: "none"
                  }}
                  scrolling="no"
                  title={`${resume.title} preview`}
                  tabIndex={-1}
                />
                <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'transparent' }} />
              </div>
              <div className="resume-info">
                <h4 className="resume-title">
                  {resume.title}
                </h4>
                <p className="resume-desc">
                  {resume.description}
                </p>
                <div className="resume-btn-group">
                  <a 
                    className="resume-btn" 
                    href={resume.fileUrl} 
                    download={resume.fileName}
                  >
                    <TbDownload size={16} />
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup Viewer */}
      {selectedResume && activeResumeData && (
        <div 
          className="resume-modal-overlay" 
          onClick={handleOverlayClick}
          data-cursor="disable"
        >
          <div className="resume-modal-content">
            <div className="resume-modal-header">
              <h3>{activeResumeData.title}</h3>
              <div className="resume-modal-controls">
                <button 
                  className="resume-modal-back" 
                  onClick={() => setSelectedResume(null)}
                  title="Go Back"
                  style={{ width: 'auto', padding: '0 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}
                >
                  <TbArrowLeft size={18} style={{ marginRight: '6px' }} />
                  Go Back
                </button>
                <button 
                  className="resume-modal-close" 
                  onClick={() => setSelectedResume(null)}
                  title="Close"
                >
                  <TbX size={20} />
                </button>
              </div>
            </div>
            
            <div className="resume-modal-body" style={{ position: "relative" }}>
              {/* Overlay to block mouse wheel scrolling, leaving only the scrollbar on the right exposed */}
              <div 
                style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  width: "calc(100% - 22px)", 
                  height: "100%", 
                  zIndex: 5,
                  background: "transparent",
                  cursor: "default"
                }} 
                onWheel={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              />
              <iframe 
                src={`${activeResumeData.fileUrl}#toolbar=0`} 
                className="resume-iframe"
                title={activeResumeData.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
