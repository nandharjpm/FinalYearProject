import React, { useState } from "react";
import "../styles/components/Footer.scss";

const Footer = () => {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <footer>
      {/* Button to toggle iframe visibility */}
      <button onClick={() => setShowIframe(!showIframe)}
      style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        margin: '10px 10px 10px 10px',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
        outline: 'none',
      }}>
        {showIframe ? "Hide Chat Bot" : "Show Chat Bot"}
      </button>
      <div className="webpage-info">
      {showIframe && (
        <iframe
          title="External Content"
          src="https://poe.com/chat/262p9em5ni2k2symts4"
          width="600"
          height="400"
          frameborder="0"
          allowfullscreen
        ></iframe>
      )}
        <h6 className="brand-name">Jewel Ease</h6>
        
        <div className="creator">
          <p></p>
          <div className="creator-links">
            <a
              className="link"
              rel="noreferrer"
              href="https://github.com/rreiso"
              target="_blank"
            >
            </a>
          </div>
        </div>
      </div>
      {/* Render iframe based on showIframe state */}
    </footer>
  );
};

export default Footer;
