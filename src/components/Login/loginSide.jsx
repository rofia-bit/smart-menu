import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { UserRoundCheck, ShoppingBag, ChevronDown, ChevronUp, Phone } from "lucide-react";
import LoginForm from "./loginForm";
import Questions from "./questions";
import "./Login.css";
import "./questions.css";

const sections = [
  { title: "Account Info", icon: <UserRoundCheck />, items: ["Profile", "Coins & rewards", "Delete Account"] },
  { title: "My Orders", icon: <ShoppingBag />, items: ["Order History", "Upcoming Orders"] },
  { title: "Support", icon: <Phone />, items: ["+213 ---------", "FAQs"] },
];

export default function LoginSidebar({ isOpen, onClose, user, onLogin, onLogout }) {
  const [openSections, setOpenSections] = useState([0, 1]);
  const [promptShown, setPromptShown] = useState(false);
  const [showQuestionPrompt, setShowQuestionPrompt] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    // when user becomes logged-in and we haven't shown prompt this session, show it
    if (user && !promptShown) {
      setShowQuestionPrompt(true);
      setPromptShown(true);
    }
  }, [user, promptShown]);

  useEffect(() => {
    if (!user) {
      // reset prompt state on logout
      setPromptShown(false);
      setShowQuestionPrompt(false);
      setShowQuestions(false);
    }
  }, [user]);

  const handleLoginLocal = (creds) => {
    // forward to parent App handler
    if (onLogin) onLogin(creds);
    // keep prompt logic in this component (App keeps sidebar open)
  };

  const handleLogoutLocal = () => {
    if (onLogout) onLogout();
    // local reset handled by effect
  };

  const toggleSection = (idx) => {
    setOpenSections((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>{user ? `Hi, ${user}` : "Welcome"}</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {user && <button className="logout-btn" onClick={handleLogoutLocal}>Sign out</button>}
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="sidebar-content">
        {!user ? (
          <div className="auth-panel">
            <p className="auth-intro">Log in to view your account, orders and rewards.</p>
            <LoginForm onLogin={handleLoginLocal} />
          </div>
        ) : showQuestions ? (
          <Questions onClose={() => setShowQuestions(false)} />
        ) : (
          sections.map((section, idx) => (
            <div key={section.title} className="sidebar-section">
              <div
                className="section-title"
                onClick={() => toggleSection(idx)}
                style={{ cursor: section.items.length ? "pointer" : "default" }}
              >
                <span className="section-icon">{section.icon}</span>
                {section.title}
                {section.items.length > 0 && (
                  <span className="arrow">
                    {openSections.includes(idx) ? (
                      <ChevronUp size={18} color="#f97316" />
                    ) : (
                      <ChevronDown size={18} color="#f97316" />
                    )}
                  </span>
                )}
              </div>

              <div className={`section-panel ${openSections.includes(idx) ? "open" : ""}`}>
                {section.items.length > 0 && (
                  <ul className="section-list">
                    {section.items.map((item, i) => (
                      <li key={item} style={{ ["--delay"]: `${i * 45}ms` }}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="sidebar-language">
        <label htmlFor="language-select">Language:</label>
        <select id="language-select" defaultValue="en" style={{ padding: "6px 10px", borderRadius: 6 }}>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">Arabic</option>
        </select>
      </div>

      {/* Questionnaire prompt modal - rendered with a portal to document.body so it centers on the page */}
      {showQuestionPrompt &&
        createPortal(
          <div className="question-modal-backdrop" onMouseDown={() => setShowQuestionPrompt(false)}>
            <div className="question-modal" onMouseDown={(e) => e.stopPropagation()}>
              <h3>We'd like to know more about you</h3>
              <p className="muted">Would you like to do a short questionnaire?</p>
              <div className="question-actions">
                <button
                  className="primary-btn"
                  onClick={() => {
                    setShowQuestionPrompt(false);
                    setShowQuestions(true);
                  }}
                >
                  Yes
                </button>
                <button className="secondary-btn" onClick={() => setShowQuestionPrompt(false)}>
                  Remind me later
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
