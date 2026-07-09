import { useState } from "react";
import "./styles/WhatIDo.css";
import { usePortfolio } from "../context/PortfolioContext";

const WhatIDo = () => {
  const { experiences } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : experiences.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < experiences.length - 1 ? prev + 1 : 0));
  };

  if (!experiences || !experiences.length) return null;

  return (
    <div className="whatIDO" id="experience">
      <h2
        className="title"
        style={{
          position: "absolute",
          top: "13%", // Shifted slightly below to look cleaner and clear navbar overlay
          left: "67%", // Shifted further right to clear character head
          transform: "translateX(-50%)",
          color: "#fff",
          textTransform: "uppercase",
          fontSize: "calc(1.8vw + 18px)",
          fontWeight: 600,
          letterSpacing: "4px",
          textAlign: "center",
          zIndex: 10,
          margin: 0,
        }}
      >
        E<span className="hat-h2">XPERI</span>ENCE
      </h2>

      {/* 45% Spacing for 3D model */}
      <div className="what-box" style={{ width: "45%" }}></div>

      {/* 55% Spacing for Experience Carousel */}
      <div
        className="what-box"
        style={{
          width: "55%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          className="what-box-in"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "16px",
            marginLeft: "100px", // Pushed further right to prevent overlapping
            width: "600px",
            height: "auto",
          }}
        >
          {experiences.length > 1 && (
            <div
              className="exp-carousel-controls"
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "8px",
                zIndex: 10,
              }}
            >
              <button
                onClick={handlePrev}
                className="carousel-btn"
                aria-label="Previous Experience"
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
                aria-label="Next Experience"
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
                0{currentIndex + 1} / 0{experiences.length}
              </span>
            </div>
          )}

          <div
            className="exp-slider-viewport"
            style={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "16px",
              position: "relative",
            }}
          >
            <div
              className="exp-flex"
              style={{
                display: "flex",
                transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: `translateX(-${currentIndex * 100}%)`,
                width: "100%", // Viewport-sized flex wrapper
              }}
            >
              {experiences.map((exp, index) => (
                <div key={index} className="what-content">
                  <div className="what-content-in">
                    <div>
                      <h3
                        style={{
                          fontSize: "23px", // Increased title size
                          fontWeight: 600,
                          color: "var(--accentColor)",
                          marginBottom: "4px",
                          lineHeight: "1.2",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <h4
                        style={{
                          fontSize: "15px", // Increased company size
                          fontWeight: 450,
                          color: "#fff",
                          opacity: 0.85,
                          marginBottom: "4px",
                          textTransform: "none",
                        }}
                      >
                        {exp.company}
                      </h4>
                      <span
                        style={{
                          fontSize: "12px", // Increased date size
                          opacity: 0.4,
                          display: "block",
                          marginBottom: "12px",
                          fontFamily: "monospace",
                        }}
                      >
                        {exp.date}
                      </span>
                      <div
                        className="exp-desc-container"
                        style={{
                          maxHeight: "190px",
                          overflowY: "auto",
                          paddingRight: "6px",
                        }}
                      >
                        {exp.description.split("\n").map((line, lIdx) => (
                          <p
                            key={lIdx}
                            style={{
                              fontSize: "14px", // Increased bullet points size
                              lineHeight: "20px", // Even spacing
                              margin: "5px 0",
                              fontWeight: 300,
                              color: "#eae5ec"
                            }}
                          >
                            • {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: "16px" }}>
                      <h5
                        style={{
                          fontSize: "11px", // Increased tech label
                          textTransform: "uppercase",
                          opacity: 0.4,
                          margin: "2px 0",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Tech Stack
                      </h5>
                      <div className="what-content-flex">
                        {exp.techStack
                          .split(/[•,]/)
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                          .map((tag, tIdx) => (
                            <div key={tIdx} className="what-tags" style={{ fontSize: "11px" }}>
                              {tag}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
