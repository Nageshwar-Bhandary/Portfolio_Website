import { usePortfolio } from "../context/PortfolioContext";
import "./styles/About.css";

const About = () => {
  const { aboutMe } = usePortfolio();

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          {aboutMe}
        </p>
      </div>
    </div>
  );
};

export default About;
