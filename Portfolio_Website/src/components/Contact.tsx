import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import "./styles/Contact.css";

const Contact = () => {
  const { githubUrl, linkedinUrl, instagramUrl, name, addMessage } = usePortfolio();
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.query.trim()) return;

    // Save message to state/localStorage via context
    addMessage({
      name: formData.name,
      email: formData.email,
      query: formData.query,
      timestamp: new Date().toLocaleString(),
    });

    setSubmitted(true);
    setFormData({ name: "", email: "", query: "" });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="contact-section" id="contact">
      <div className="contact-container">
        <h3>
          Contact <span>Me</span>
        </h3>
        <p className="contact-subtitle">
          Feel free to reach out to me through my social channels or send me a direct message.
        </p>

        {/* Contact Main Layout: Socials Side-by-Side with Form */}
        <div className="contact-main-layout">
          {/* 3 Contact Icons */}
          <div className="contact-grid">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-link github"
              data-cursor="disable"
            >
              <div className="contact-icon-box">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <span className="contact-label">GITHUB</span>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-link linkedin"
              data-cursor="disable"
            >
              <div className="contact-icon-box">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <span className="contact-label">LINKEDIN</span>
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-link instagram"
              data-cursor="disable"
            >
              <div className="contact-icon-box">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <span className="contact-label">INSTAGRAM</span>
            </a>
          </div>

          {/* Message Form Inline Below Social Icons */}
          <div className="contact-form-container-inline">
            <div className="contact-inline-card">
              <h4 className="contact-form-title">
                Send me a <span>Message</span>
              </h4>

              {submitted ? (
                <div className="contact-success-inline">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accentColor)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Thank you! Your message has been received.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-inline">
                  <div className="form-group-inline">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group-inline">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group-inline">
                    <label htmlFor="contact-query">Your Message</label>
                    <textarea
                      id="contact-query"
                      placeholder="Write your message here..."
                      rows={4}
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="contact-submit-btn-inline" data-cursor="disable">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <h2>
            Designed & Developed by <span>{name}</span>
          </h2>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
