import { usePortfolio } from "../context/PortfolioContext";
import "./styles/Career.css";

const Career = () => {
  const { career } = usePortfolio();

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My <span>Education</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {career.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.title}</h4>
                  <h5>{item.subtitle}</h5>
                </div>
                <h3>{item.date}</h3>
              </div>
              <p style={{ whiteSpace: "pre-line", lineHeight: "1.7", fontSize: "13px" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
