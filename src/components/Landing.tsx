import { PropsWithChildren } from "react";
import { TbFileDescription } from "react-icons/tb";
import { usePortfolio } from "../context/PortfolioContext";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { name } = usePortfolio();

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {name}
            </h1>
          </div>
          <div className="landing-info" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ textTransform: "uppercase", fontSize: "24px", letterSpacing: "2px", fontWeight: 500, margin: 0 }}>
              Cybersecurity Enthusiast
            </h3>
            <div className="landing-h2-info" style={{ display: "none" }}></div>
            <div className="landing-info-h2" style={{ display: "none" }}></div>
            
            <a 
              href={`${import.meta.env.BASE_URL || "/"}resume.pdf`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-download-btn"
              data-cursor="pointer"
              style={{
                marginTop: "30px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                background: "rgba(194, 164, 255, 0.05)",
                border: "1px solid rgba(194, 164, 255, 0.3)",
                color: "#eae5ec",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <TbFileDescription size={18} />
              Resume
            </a>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
