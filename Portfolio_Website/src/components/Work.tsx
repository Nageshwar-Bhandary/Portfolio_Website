import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { TbBrandGithub, TbExternalLink } from "react-icons/tb";
import "./styles/Work.css";

// Sub-component to load a video via Blob URL to bypass range request issues in Vite dev server
const ProjectVideo = ({ src }: { src: string }) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let url: string | null = null;

    setLoading(true);
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load video");
        return res.blob();
      })
      .then((blob) => {
        if (active) {
          url = URL.createObjectURL(blob);
          setBlobUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading video blob:", err);
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [src]);

  if (loading) {
    return (
      <div className="work-video-placeholder">
        <div className="work-video-placeholder-scanline"></div>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "var(--accentColor)", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", opacity: 0.8, textTransform: "uppercase" }}>
          Loading Demo Video...
        </div>
      </div>
    );
  }

  if (!blobUrl) {
    return (
      <div className="work-video-placeholder">
        <div className="work-video-placeholder-scanline"></div>
      </div>
    );
  }

  return (
    <video
      src={blobUrl}
      className="work-video-element"
      autoPlay
      loop
      muted
      playsInline
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "16px",
        border: "1px solid rgba(194, 164, 255, 0.12)",
        background: "#08060a",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
      }}
    />
  );
};

const Work = () => {
  const { projects } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxVideoUrl, setLightboxVideoUrl] = useState<string | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxVideoUrl(null);
      }
    };
    if (lightboxVideoUrl) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxVideoUrl]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  if (!projects || !projects.length) return null;

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header-controls">
          <h2>
            My <span>Projects</span>
          </h2>
        </div>

        <div className="work-slider-viewport">
          <div
            className="work-flex"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div className="work-box" key={index}>
                {/* Left: Video Player or Placeholder */}
                <div className="work-video-wrapper">
                  {(() => {
                    const titleLower = (project.title || "").toLowerCase();
                    let videoUrl = project.videoUrl;

                    // Apply robust default fallbacks for the 3 core projects
                    if (titleLower.includes("netsentinel")) {
                      videoUrl = "/videos/project_1.mp4";
                    } else if (titleLower.includes("cipherx") || titleLower.includes("decryption")) {
                      videoUrl = "/videos/project_2.mp4";
                    } else if (titleLower.includes("notesapp") || titleLower.includes("note")) {
                      videoUrl = "/videos/project_3.mp4";
                    }

                    return videoUrl ? (
                      <div
                        className="work-video-click-wrapper"
                        onClick={() => setLightboxVideoUrl(videoUrl)}
                        title="Click to expand & play with controls"
                        data-cursor="pointer"
                      >
                        <ProjectVideo src={videoUrl} />
                        <div className="work-video-hover-overlay">
                          <span className="work-video-hover-text">
                            🔍 Click to Expand & Scrub
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="work-video-placeholder">
                        <div className="work-video-placeholder-scanline"></div>
                      </div>
                    );
                  })()}
                </div>

                {/* Right: Project Info */}
                <div className="work-info">
                  {projects.length > 1 && (
                    <div
                      className="work-carousel-controls"
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "16px",
                        zIndex: 10,
                      }}
                    >
                      <button
                        onClick={handlePrev}
                        className="carousel-btn"
                        aria-label="Previous Project"
                        data-cursor="disable"
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="carousel-btn"
                        aria-label="Next Project"
                        data-cursor="disable"
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                      <span
                        style={{
                          color: "rgba(255, 255, 255, 0.5)",
                          fontSize: "13px",
                          alignSelf: "center",
                          marginLeft: "10px",
                          fontFamily: "monospace",
                        }}
                      >
                        0{currentIndex + 1} / 0{projects.length}
                      </span>
                    </div>
                  )}

                  <div className="work-title">
                    <h3>0{index + 1}</h3>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4 style={{ fontSize: "14px", opacity: 0.6 }}>Description</h4>
                  <p style={{ fontSize: "13px", lineHeight: "1.6", marginBottom: "15px" }}>{project.description}</p>
                   <h4 style={{ fontSize: "14px", opacity: 0.6 }}>Tools Used</h4>
                  <p style={{ fontSize: "13px", color: "var(--accentColor)", marginBottom: "0" }}>{project.tools}</p>

                  {/* Project Links (GitHub & Live Demo / Watch Demo) */}
                  <div className="work-links-container">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-btn github-btn"
                        data-cursor="disable"
                      >
                        <TbBrandGithub size={16} style={{ marginRight: "6px" }} />
                        GitHub
                      </a>
                    )}
                    {(() => {
                      const demoUrl = project.demoUrl || "#";
                      return (
                        <a
                          href={demoUrl === "#" ? undefined : demoUrl}
                          onClick={demoUrl === "#" ? (e) => {
                            e.preventDefault();
                            const titleLower = (project.title || "").toLowerCase();
                            let vUrl = project.videoUrl;
                            if (titleLower.includes("netsentinel")) vUrl = "/videos/project_1.mp4";
                            else if (titleLower.includes("cipherx") || titleLower.includes("decryption")) vUrl = "/videos/project_2.mp4";
                            else if (titleLower.includes("notesapp") || titleLower.includes("note")) vUrl = "/videos/project_3.mp4";
                            if (vUrl) setLightboxVideoUrl(vUrl);
                          } : undefined}
                          target={demoUrl === "#" ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="work-btn demo-btn"
                          data-cursor="disable"
                        >
                          <TbExternalLink size={16} style={{ marginRight: "6px" }} />
                          Live Demo
                        </a>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxVideoUrl && (
        <div
          className="work-lightbox-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightboxVideoUrl(null);
            }
          }}
        >
          <button className="work-lightbox-close" onClick={() => setLightboxVideoUrl(null)}>
            &times;
          </button>
          <div className="work-lightbox-container">
            <video
              src={lightboxVideoUrl}
              autoPlay
              controls
              loop
              playsInline
              className="work-lightbox-video"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;
