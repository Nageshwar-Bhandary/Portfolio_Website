import { useState, useEffect } from "react";
import { certificates, Certificate } from "../data/certificates";
import "./styles/Achievements.css";

const Achievements = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeCertImgIdx, setActiveCertImgIdx] = useState<number>(0);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedCert(null);
    }
  };

  const renderImageOrPlaceholder = (cert: Certificate, className: string, isModal = false) => {
    if (cert.imageUrl) {
      return (
        <img
          src={cert.imageUrl}
          alt={cert.title}
          className={className}
          loading="lazy"
        />
      );
    }

    return (
      <div className={`${className} certificate-placeholder`}>
        <div className="placeholder-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="placeholder-icon"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M7 11.5V14a5 5 0 0 0 10 0v-2.5" />
            <path d="M12 16v6" />
            <path d="M8 22h8" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10H8a15.3 15.3 0 0 1 4-10z" />
          </svg>
          {!isModal && <span className="placeholder-text">Preview Available</span>}
          {isModal && <span className="placeholder-text large">Certificate Image Blank</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="achievements-section" id="achievements">
      <div className="achievements-container section-container">
        <h2>
          Achievement and <span>Certificate</span>
        </h2>
        
        <div className="achievements-grid">
          {certificates.map((cert, index) => (
            <div 
              className="certificate-card" 
              key={index}
              onClick={() => {
                setSelectedCert(cert);
                setActiveCertImgIdx(0);
              }}
              data-cursor="disable"
            >
              <div className="certificate-image-wrapper">
                {renderImageOrPlaceholder(cert, "certificate-image")}
                <div className="view-details-overlay">
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>
              <div className="certificate-info">
                <h4 className="certificate-title" title={cert.title}>
                  {cert.title}
                </h4>
                <div className="certificate-meta">
                  <span className="certificate-org" title={cert.organization}>
                    {cert.organization}
                  </span>
                  <span className="certificate-year">{cert.issueYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup Viewer */}
      {selectedCert && (
        <div 
          className="certificate-modal-overlay" 
          onClick={handleOverlayClick}
          data-cursor="disable"
        >
          <div className="certificate-modal-content">
            <button 
              className="certificate-modal-close" 
              onClick={() => setSelectedCert(null)}
              aria-label="Close modal"
            >
              &times;
            </button>
            
            <div className="certificate-modal-body">
              {/* Left Side: Large Certificate Image */}
              <div className="certificate-modal-left">
                {selectedCert.images && selectedCert.images.length > 0 ? (
                  <img
                    src={selectedCert.images[activeCertImgIdx]}
                    alt={`${selectedCert.title} preview`}
                    className="certificate-modal-img"
                    loading="lazy"
                  />
                ) : (
                  renderImageOrPlaceholder(selectedCert, "certificate-modal-img", true)
                )}

                {/* Thumbnails below the active certificate image inside the modal */}
                {selectedCert.images && selectedCert.images.length > 1 && (
                  <div className="modal-cert-thumbnails">
                    {selectedCert.images.map((img, idx) => (
                      <div 
                        key={idx}
                        className={`modal-cert-thumbnail-item ${idx === activeCertImgIdx ? "active" : ""}`}
                        onClick={() => setActiveCertImgIdx(idx)}
                        data-cursor="disable"
                      >
                        <img src={img} alt={`Certificate thumbnail ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side: Complete Details */}
              <div className="certificate-modal-right">
                <div className="modal-header-info">
                  <h3>{selectedCert.title}</h3>
                  <p className="modal-org">{selectedCert.organization}</p>
                </div>

                <div className="modal-metadata-grid">
                  <div className="meta-item">
                    <span className="meta-label">Issue Date</span>
                    <span className="meta-val">{selectedCert.issueDate}</span>
                  </div>
                  {selectedCert.credentialId && (
                    <div className="meta-item">
                      <span className="meta-label">Credential ID</span>
                      <span className="meta-val code">{selectedCert.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="modal-details-scroll">
                  <div className="modal-detail-section">
                    <h4>Description</h4>
                    <p className="modal-description">{selectedCert.description}</p>
                  </div>

                  <div className="modal-detail-section">
                    <h4>Skills Learned</h4>
                    <ul className="modal-skills-list">
                      {selectedCert.skillsLearned.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-detail-section">
                    <h4>Technologies Covered</h4>
                    <div className="modal-tech-tags">
                      {selectedCert.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedCert.credentialUrl && (
                  <div className="modal-actions">
                    <a 
                      href={selectedCert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="verify-credential-btn"
                    >
                      View Credential
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{ marginLeft: "6px" }}
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
