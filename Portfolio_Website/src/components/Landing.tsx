import { PropsWithChildren } from "react";

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

          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
