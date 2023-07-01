import React from "react";
import '../animations.css'

const Footer = ({ className }) => {
  return (
    <footer className={className}>
        <div className="waves">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            <div className="wave wave4"></div>
        </div>
    </footer>
  );
};

export default Footer;
